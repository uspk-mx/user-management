"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldControl, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toastManager } from "@/components/ui/toast";
import {
  CreateAppDocument,
  CreateAppMutation,
  CreateAppMutationVariables,
} from "@/graphql/gql/graphql";
import { uploadFileToR2 } from "@/lib/services/upload";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "urql";

export function CreateAppModal({ triggerLabel }: { triggerLabel: string }) {
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, createAppMutation] = useMutation<
    CreateAppMutation,
    CreateAppMutationVariables
  >(CreateAppDocument);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    setUploadedUrl(null);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await uploadFileToR2(formData, "iconFile");

      if (result.success && result.url) {
        setUploadedUrl(result.url);
        console.log("File uploaded successfully:", result.url);
        return result.url;
      } else {
        setError(result.error || "Upload failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const url = formData.get("url") as string;
    const iconUrl = formData.get("iconUrl") as string;
    const isActive = formData.get("isActive") === "on";

    let uploadedIconUrl = iconUrl;

    if (formData.get("iconFile")) {
      const uploadResult = await handleFileUpload(e);
      if (uploadResult) {
        uploadedIconUrl = uploadResult;
      }
    }

    const variables: CreateAppMutationVariables = {
      input: {
        name,
        description,
        url,
        icon: uploadedIconUrl,
        isActive,
      },
    };

    setIsLoading(true);
    const response = await createAppMutation(variables);

    if (response.data?.createApp) {
      setIsLoading(false);
    }
    if (response.error) {
      setError(response.error.message);
      return;
    }

    setIsOpen(false);
    toastManager.add({
      title: "App creada correctamente",
      description: `La app ${response.data?.createApp.name} fue creada correctamente.`,
      type: "success",
    });
    router.refresh();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger render={<Button type="button" />}>
        {triggerLabel}
      </SheetTrigger>
      <SheetPopup>
        <Form className="flex-1" onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Agregar Aplicacion</SheetTitle>
            <SheetDescription>
              Agrega los datos de la app que deseas agregar. Por favor,
              asegúrate de proporcionar toda la información necesaria.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 px-4">
            <Field>
              <FieldLabel>Nombre</FieldLabel>
              <FieldControl
                type="text"
                name="name"
                placeholder="eg. Creador de certificados"
              />
            </Field>
            <Field>
              <FieldLabel>Descripcion</FieldLabel>
              <Textarea
                name="description"
                placeholder="Escribe una descripcion de tu app..."
              />
            </Field>
            <Field>
              <FieldLabel>Url de la app</FieldLabel>
              <FieldControl
                type="url"
                name="url"
                placeholder="eg. https://creator.uspk.com.mx"
              />
            </Field>
            <Field>
              <FieldLabel>Icono</FieldLabel>
              <FieldControl type="file" name="iconFile" aria-label="Icono" />
            </Field>

            <Field>
              <FieldLabel>Estatus</FieldLabel>
              <Switch name="isActive" />
            </Field>
          </div>
          <SheetFooter>
            <SheetClose render={<Button variant="ghost" />}>
              Cancelar
            </SheetClose>
            <Button type="submit">Guardar</Button>
          </SheetFooter>
        </Form>
      </SheetPopup>
    </Sheet>
  );
}
