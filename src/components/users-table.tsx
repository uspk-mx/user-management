"use client";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GetUsersQuery,
  ListRolesQuery,
  UpdateUserDocument,
  UpdateUserMutationVariables,
  User,
} from "@/graphql/gql/graphql";
import { cn } from "@/lib/utils";
import { IconDots, IconEdit } from "@tabler/icons-react";
import { TrashIcon } from "lucide-react";
import { TablePagination } from "./table-pagination";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { Form } from "./ui/form";
import { Field, FieldControl, FieldDescription, FieldLabel } from "./ui/field";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useMutation } from "urql";
import { toastManager } from "./ui/toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export interface UsersTableProps {
  userData: GetUsersQuery["getUsers"];
  rolesData: ListRolesQuery["listRoles"];
}

export function UsersTable({ userData, rolesData }: UsersTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [, updateUserMutation] = useMutation(UpdateUserDocument);
  const router = useRouter();

  const translatedRole = {
    employee: "Empleado",
    admin: "Administrador",
    moderator: "Moderador",
  };

  const PAGE_SIZE = 6;
  const hasNextPage = (userData?.length ?? 0) > PAGE_SIZE;
  const displayUsers = (userData ?? []).slice(0, PAGE_SIZE);

  const handleUpdateUser = async (variables: UpdateUserMutationVariables) => {
    const response = await updateUserMutation(variables);
    if (response.error?.graphQLErrors.length) {
      toastManager.add({
        title: "Uh oh! Algo salio mal.",
        description:
          "Hubo un problema al actualizar el usuario. Intentalo de nuevo.",
        type: "error",
      });
      return;
    }

    if (response.data?.updateUser) {
      toastManager.add({
        title: "Usuario actualizado!",
        description: "Los cambios al usuario se han guardado correctamente.",
        type: "success",
      });
      setDialogOpen(false);
      router.refresh();
    }
  };

  return (
    <>
      <Table>
        <TableCaption>Usuarios registrados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Estatus</TableHead>
            <TableHead>Correo electronico</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayUsers?.map((user) => (
            <TableRow key={user?.id}>
              <TableCell className="font-medium">{user?.fullName}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  <span
                    className={cn("size-1.5 rounded-full", {
                      "bg-emerald-500": user?.isActive,
                      "bg-muted-foreground/64": !user?.isActive,
                    })}
                    aria-hidden="true"
                  />
                  {user?.isActive ? "Activo" : "Desactivado"}
                </Badge>
              </TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>
                {
                  translatedRole[
                    (user?.role?.name ?? "employee") as keyof typeof translatedRole
                  ]
                }
              </TableCell>
              <TableCell className="text-right">
                <Menu>
                  <MenuTrigger
                    render={<Button variant="outline" size="icon-sm" />}
                  >
                    <IconDots />
                  </MenuTrigger>
                  <MenuPopup>
                    <MenuItem
                      disabled={user?.role?.name === "admin"}
                      render={<Link href={`/users/${user?.id}`} />}
                    >
                      <IconEdit />
                      Editar
                      <MenuShortcut>⌘E</MenuShortcut>
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem
                      variant="destructive"
                      disabled={user?.role?.name === "admin"}
                    >
                      <TrashIcon />
                      Delete
                      <MenuShortcut>⌘⌫</MenuShortcut>
                    </MenuItem>
                  </MenuPopup>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {userData?.length && userData.length > 6 && (
        <TablePagination
          totalCount={displayUsers.length}
          hasNextPage={hasNextPage}
        />
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogPopup className="sm:max-w-sm">
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              handleUpdateUser({
                updateUserId: selectedUser?.id ?? "",
                input: { role: formData.get("role")?.toString() },
              });
            }}
          >
            <DialogHeader>
              <DialogTitle>Modificar usuario</DialogTitle>
              <DialogDescription>
                Haz los cambios necesarios en la informacion del usuario.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Field>
                <FieldLabel>Nombre completo</FieldLabel>
                <FieldControl
                  type="text"
                  defaultValue={selectedUser?.fullName}
                  name="fullName"
                  readOnly
                  disabled
                />
              </Field>
              <Field>
                <FieldLabel>Correo electronico</FieldLabel>
                <FieldControl
                  type="email"
                  defaultValue={selectedUser?.email}
                  name="email"
                  readOnly
                  disabled
                />
              </Field>
              <Field>
                <FieldLabel>Rol</FieldLabel>
                <Select
                  name="role"
                  items={
                    rolesData
                      ? [
                          { label: "Select a role", value: "" },
                          ...rolesData.map((item) => ({
                            label:
                              translatedRole[
                                item?.name as keyof typeof translatedRole
                              ],
                            value: item?.name ?? "",
                          })),
                        ]
                      : undefined
                  }
                  defaultValue={selectedUser?.role?.name ?? ""}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectPopup>
                    {rolesData?.map((roleData) => (
                      <SelectItem
                        value={roleData?.name ?? ""}
                        key={roleData?.id}
                      >
                        {
                          translatedRole[
                            roleData?.name as keyof typeof translatedRole
                          ]
                        }
                      </SelectItem>
                    ))}
                  </SelectPopup>
                </Select>
                <FieldDescription>This is an optional field</FieldDescription>
              </Field>
              <Field>
                <div className="flex items-start gap-2">
                  <Switch
                    id="isActive"
                    defaultChecked={selectedUser?.isActive || false}
                    name="isActive"
                  />
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="isActive">Estatus</Label>
                    <p className="text-xs text-muted-foreground">
                      Este es el estatus del usuario. Activalo para permitir el
                      acceso.
                    </p>
                  </div>
                </div>
              </Field>
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="ghost" />}>
                Cancel
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </Form>
        </DialogPopup>
      </Dialog>
    </>
  );
}
