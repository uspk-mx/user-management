// test-r2-connection.ts
// Run this to verify your R2 setup: npx tsx test-r2-connection.ts
// Or with ts-node: npx ts-node test-r2-connection.ts

import { S3Client, ListBucketsCommand, HeadBucketCommand } from '@aws-sdk/client-s3'
// import * as dotenv from 'dotenv'

// Load environment variables
// dotenv.config({ path: '.env.local' })

async function testR2Connection() {
  console.log('🔍 Testing R2 Configuration...\n')

  // Check environment variables
  console.log('📋 Environment Variables:')
  const envVars = {
    R2_ENDPOINT: process.env.R2_ENDPOINT,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY ? '***' + process.env.R2_SECRET_ACCESS_KEY.slice(-4) : undefined,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
    R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
  }
  
  console.log(JSON.stringify(envVars, null, 2))
  console.log()

  // Check for missing variables
  const missing = Object.entries(envVars)
    .filter(([key, value]) => !value && key !== 'R2_SECRET_ACCESS_KEY')
    .map(([key]) => key)

  if (missing.length > 0) {
    console.error('❌ Missing environment variables:', missing.join(', '))
    console.error('Please check your .env.local file')
    return
  }

  // Initialize R2 client
  const r2Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true,
  })

  // Test 1: List buckets
  console.log('🧪 Test 1: Listing buckets...')
  try {
    const listResponse = await r2Client.send(new ListBucketsCommand({}))
    console.log('✅ Connection successful!')
    console.log('Available buckets:', listResponse.Buckets?.map(b => b.Name).join(', ') || 'None')
    console.log()
  } catch (error: any) {
    console.error('❌ Failed to list buckets')
    console.error('Error:', error.message)
    console.error('Code:', error.Code || error.code)
    console.error('\nPossible issues:')
    console.error('- Invalid R2_ENDPOINT')
    console.error('- Invalid R2_ACCESS_KEY_ID or R2_SECRET_ACCESS_KEY')
    console.error('- API token lacks permissions')
    return
  }

  // Test 2: Check specific bucket
  console.log('🧪 Test 2: Checking bucket access...')
  try {
    await r2Client.send(new HeadBucketCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
    }))
    console.log(`✅ Bucket "${process.env.R2_BUCKET_NAME}" exists and is accessible!`)
    console.log()
  } catch (error: any) {
    console.error(`❌ Cannot access bucket "${process.env.R2_BUCKET_NAME}"`)
    console.error('Error:', error.message)
    console.error('Code:', error.Code || error.code)
    
    if (error.Code === 'NoSuchBucket' || error.code === 'NoSuchBucket') {
      console.error('\n🔧 Solution: The bucket does not exist.')
      console.error(`   Create a bucket named "${process.env.R2_BUCKET_NAME}" in your Cloudflare R2 dashboard`)
      console.error('   OR update R2_BUCKET_NAME in your .env.local to match an existing bucket')
    } else if (error.Code === 'Forbidden' || error.code === 'Forbidden') {
      console.error('\n🔧 Solution: Your API token lacks permissions.')
      console.error('   Create a new R2 API token with Read & Write permissions')
    }
    return
  }

  console.log('✨ All tests passed! Your R2 configuration is correct.\n')
}

testR2Connection().catch(console.error)