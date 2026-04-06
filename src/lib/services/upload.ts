"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

// Validate environment variables
function validateEnvVars() {
  const required = {
    R2_ENDPOINT: process.env.R2_ENDPOINT,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
    R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
  };

  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }

  return required as Record<keyof typeof required, string>;
}

const env = validateEnvVars();

// Initialize R2 client
const r2Client = new S3Client({
  region: "auto",
  endpoint: env.R2_ENDPOINT,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

export async function uploadFileToR2(formData: FormData, fileName?: string) {
  try {
    const file = formData.get(fileName ?? "") as File;

    if (!file) {
      return { success: false, error: "No file provided" };
    }

    // Validate file
    const maxSize = 10 * 1024 * 1024; // 10MB - adjust as needed
    if (file.size > maxSize) {
      return { success: false, error: "File too large (max 10MB)" };
    }

    // Generate unique filename
    const fileExtension = file.name.split(".").pop();
    const uniqueFilename = `${randomUUID()}.${fileExtension}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: uniqueFilename,
      Body: buffer,
      ContentType: file.type,
      Metadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    });

    const response = await r2Client.send(command);
    console.log("✅ Upload successful:", response);

    // Construct public URL
    const fileUrl = `${env.R2_PUBLIC_URL}/${uniqueFilename}`;

    return {
      success: true,
      url: fileUrl,
      filename: uniqueFilename,
      originalName: file.name,
      size: file.size,
      contentType: file.type,
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ Error uploading to R2:", {
      error,
      message: error?.message,
      code: error?.Code || error?.code,
      statusCode: error?.$metadata?.httpStatusCode,
      requestId: error?.$metadata?.requestId,
    });

    // Provide more specific error messages
    let errorMessage = "Upload failed";

    if (error?.Code === "NoSuchBucket" || error?.code === "NoSuchBucket") {
      errorMessage = `Bucket "${env.R2_BUCKET_NAME}" does not exist. Please check your R2_BUCKET_NAME.`;
    } else if (
      error?.Code === "InvalidAccessKeyId" ||
      error?.message?.includes("credentials")
    ) {
      errorMessage =
        "Invalid credentials. Please check your R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY.";
    } else if (error?.Code === "SignatureDoesNotMatch") {
      errorMessage =
        "Invalid secret key. Please check your R2_SECRET_ACCESS_KEY.";
    } else if (error?.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
