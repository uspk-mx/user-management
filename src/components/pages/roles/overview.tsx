"use client";
import { PageHeader } from "@/components/custom-components/page-header";
import { RolesTable } from "@/components/roles-table";
import { Button } from "@/components/ui/button";
import {
  CreateRoleDocument,
  CreateRoleInput,
  CreateRoleMutation,
  CreateRoleMutationVariables,
  ListRolesQuery,
} from "@/graphql/gql/graphql";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { IconLoader } from "@tabler/icons-react";
import { useState } from "react";
import { useMutation } from "urql";
import { toastManager } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { GraphQLError } from "graphql";

export function RolesOverview({
  rolesData,
}: {
  rolesData: ListRolesQuery["listRoles"];
}) {
  return (
    <>
      <PageHeader title="Roles" actions={<CreateRoleModal />} />
      <RolesTable rolesData={rolesData} />
    </>
  );
}

export function CreateRoleModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<GraphQLError[]>([]);
  const router = useRouter();

  const [, createRoleMutation] = useMutation<
    CreateRoleMutation,
    CreateRoleMutationVariables
  >(CreateRoleDocument);

  console.log("errors: ", errors);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setIsLoading(true);
    const input = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    };
    const response = await createRoleMutation({ input });

    if (
      response.error?.graphQLErrors &&
      response.error?.graphQLErrors.length > 0
    ) {
      toastManager.add({
        title: "Error creando el rol",
        description: "Por favor, inténtalo de nuevo más tarde",
        type: "error",
      });
      setIsLoading(false);
      setErrors(response.error.graphQLErrors);
    } else if (response.data?.createRole) {
      toastManager.add({
        title: "Rol creado",
        description: "El rol se ha creado correctamente",
        type: "success",
      });
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Crear nuevo rol</DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <Form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Crea un nuevo rol</DialogTitle>
            <DialogDescription>
              Rellena todos los campos para crear un nuevo rol. Asegúrate de
              proporcionar un nombre descriptivo y una descripción clara del
              rol.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Nombre</FieldLabel>
              <FieldControl type="text" name="name" />
              <FieldError>
                {errors.length > 0
                  ? errors[0].originalError?.message.replace(
                      "failed to create role: ",
                      "",
                    ) || "Por favor ingresa un nombre válido."
                  : "Por"}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel>Descripción</FieldLabel>
              <FieldControl
                name="description"
                render={(props) => (
                  <Textarea placeholder="Descripción del rol..." {...props} />
                )}
              />
              <FieldError>
                {errors.length > 0
                  ? errors[0].originalError?.message ||
                    "Por favor ingresa una descripción válida"
                  : ""}
              </FieldError>
            </Field>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>
              Cancelar
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <IconLoader />
                  Creando...
                </>
              ) : (
                "Guardar cambios"
              )}
            </Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
