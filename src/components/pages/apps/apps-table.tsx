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
  App,
  AppsQuery,
  DeleteAppDocument,
  DeleteAppMutation,
  DeleteAppMutationVariables,
  DestroyAppDocument,
  DestroyAppMutation,
  DestroyAppMutationVariables,
  EnableAppDocument,
  EnableAppMutation,
  EnableAppMutationVariables,
  GetUsersQuery,
  ListRolesQuery,
  UpdateAppDocument,
  UpdateAppMutation,
  UpdateAppMutationVariables,
  UpdateUserDocument,
  UpdateUserMutationVariables,
  User,
} from "@/graphql/gql/graphql";
import { cn, getInitials } from "@/lib/utils";
import {
  IconDots,
  IconEdit,
  IconSquareToggle,
  IconSwitch,
  IconSwitch2,
  IconSwitch3,
  IconToggleLeft,
  IconToggleRight,
} from "@tabler/icons-react";
import { TrashIcon } from "lucide-react";
import { TablePagination } from "../../table-pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "urql";
import { toastManager } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UpdateAppSheet } from "./update-app-sheet";

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export interface AppsTableProps {
  appsData: AppsQuery["apps"];
}

export function AppsTable({ appsData }: AppsTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Omit<
    App,
    "roleAccess" | "userAccess" | "authorizedUsers"
  > | null>(null);
  const [, updateAppMutation] = useMutation<
    UpdateAppMutation,
    UpdateAppMutationVariables
  >(UpdateAppDocument);
  const router = useRouter();
  const [, deleteAppMutation] = useMutation<
    DeleteAppMutation,
    DeleteAppMutationVariables
  >(DeleteAppDocument);

  const [, destroyAppMutation] = useMutation<
    DestroyAppMutation,
    DestroyAppMutationVariables
  >(DestroyAppDocument);

  const [, enableAppMutation] = useMutation<
    EnableAppMutation,
    EnableAppMutationVariables
  >(EnableAppDocument);
  

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [disableDialogOpen, setDisableDialogOpen] = useState(false);
  const [destroyDialogOpen, setDestroyDialogOpen] = useState(false);

  const [enableAppDialogOpen, setEnableAppDialogOpen] = useState(false);

  const PAGE_SIZE = 6;
  const hasNextPage = appsData?.pageInfo.hasNextPage;
  const displayApps = (appsData.edges ?? []).slice(0, PAGE_SIZE);

  const handleUpdateUser = async (variables: UpdateAppMutationVariables) => {
    const response = await updateAppMutation(variables);
    if (response.error?.graphQLErrors.length) {
      toastManager.add({
        title: "Uh oh! Algo salio mal.",
        description:
          "Hubo un problema al actualizar la app. Intentalo de nuevo.",
        type: "error",
      });
      return;
    }

    if (response.data?.updateApp) {
      toastManager.add({
        title: "Aplicacion actualizado!",
        description: "Los cambios a la app se han guardado correctamente.",
        type: "success",
      });
      setDialogOpen(false);
      router.refresh();
    }
  };

  return (
    <>
      <Table>
        <TableCaption>Apps Creadas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Icono</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripcion</TableHead>
            <TableHead>Usuarios</TableHead>
            <TableHead>Estatus</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayApps?.map((user) => (
            <TableRow key={user?.node.id}>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage
                    alt={user.node.name}
                    src={user.node.icon || ""}
                  />
                  <AvatarFallback>{getInitials(user.node.name)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user?.node.name}</TableCell>
              <TableCell>{user?.node.description}</TableCell>
              <TableCell>
                {user?.node.authorizedUsers.length ?? "N/A"}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  <span
                    className={cn("size-1.5 rounded-full", {
                      "bg-emerald-500": user?.node.isActive,
                      "bg-muted-foreground/64": !user?.node.isActive,
                    })}
                    aria-hidden="true"
                  />
                  {user?.node.isActive ? "Activo" : "Desactivado"}
                </Badge>
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
                      onClick={() => {
                        setSelectedApp(user?.node);
                        setDialogOpen(true);
                      }}
                    >
                      <IconEdit />
                      Editar
                      <MenuShortcut>⌘E</MenuShortcut>
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem
                      onClick={() => {
                        setSelectedApp(user?.node);
                        console.log("user?.node.isActive", user?.node.isActive);
                        if (user?.node.isActive) {
                               setDeleteDialogOpen(true);
                        } else {
                               setEnableAppDialogOpen(true);
                        }
                      }}
                    >
                      {user?.node.isActive ? (
                        <IconToggleLeft />
                      ) : (
                        <IconToggleRight />
                      )}
                      {user?.node.isActive ? "Desactivar" : "Activar"}
                      <MenuShortcut>⌘A</MenuShortcut>
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem
                      variant="destructive"
                      onClick={() => {
                        setDestroyDialogOpen(true);
                        setSelectedApp(user?.node);
                      }}
                    >
                      <TrashIcon />
                      Borrar
                      <MenuShortcut>⌘⌫</MenuShortcut>
                    </MenuItem>
                  </MenuPopup>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {appsData?.edges.length && appsData?.totalCount > 6 && (
        <TablePagination
          totalCount={appsData?.totalCount}
          hasNextPage={hasNextPage}
        />
      )}

      <UpdateAppSheet
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        appData={selectedApp}
      />

      <AlertDialog open={destroyDialogOpen} onOpenChange={setDestroyDialogOpen}>
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>Esta accion no es irreversible.</AlertDialogTitle>
            <AlertDialogDescription>
              Despues de borrar una app, no podras recuperarla. Asegurate de que
              realmente deseas eliminar esta app.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="ghost" />}>
              Cancelar
            </AlertDialogClose>
            <AlertDialogClose
              render={
                <Button
                  variant="destructive"
                  onClick={async () => {
                    const response = await destroyAppMutation({
                      id: selectedApp?.id ?? "",
                    });
                    if (response.error?.graphQLErrors.length) {
                      toastManager.add({
                        title: "Uh oh! Algo salio mal.",
                        description:
                          "Hubo un problema al eliminar la app. Intentalo de nuevo.",
                        type: "error",
                      });
                      return;
                    }

                    if (response.data?.destroyApp) {
                      toastManager.add({
                        title: "Aplicacion eliminada!",
                        description: "La app ha sido eliminada correctamente.",
                        type: "success",
                      });
                      router.refresh();
                    }
                  }}
                />
              }
            >
              Borrar Aplicacion
            </AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>

      <AlertDialog
        open={enableAppDialogOpen}
        onOpenChange={setEnableAppDialogOpen}
      >
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>Activar Aplicacion.</AlertDialogTitle>
            <AlertDialogDescription>
              Despues de activar una app, los usuarios podran acceder a ella
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="ghost" />}>
              Cancelar
            </AlertDialogClose>
            <AlertDialogClose
              render={
                <Button
                  variant="default"
                  onClick={async () => {
                    const response = await enableAppMutation({
                      id: selectedApp?.id ?? "",
                    });
                    if (response.error?.graphQLErrors.length) {
                      toastManager.add({
                        title: "Uh oh! Algo salio mal.",
                        description:
                          "Hubo un problema al activar la app. Intentalo de nuevo.",
                        type: "error",
                      });
                      return;
                    }

                    if (response.data?.enableApp) {
                      toastManager.add({
                        title: "Aplicacion activada!",
                        description: "La app ha sido activada correctamente.",
                        type: "success",
                      });
                      router.refresh();
                    }
                  }}
                />
              }
            >
              Activar Aplicacion
            </AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>


         <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>Desactivar Aplicacion.</AlertDialogTitle>
            <AlertDialogDescription>
              Despues de desactivar una app, los usuarios no podran acceder a ella.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="ghost" />}>
              Cancelar
            </AlertDialogClose>
            <AlertDialogClose
              render={
                <Button
                  variant="default"
                  onClick={async () => {
                    const response = await deleteAppMutation({
                      id: selectedApp?.id ?? "",
                    });
                    if (response.error?.graphQLErrors.length) {
                      toastManager.add({
                        title: "Uh oh! Algo salio mal.",
                        description:
                          "Hubo un problema al desactivar la app. Intentalo de nuevo.",
                        type: "error",
                      });
                      return;
                    }

                    if (response.data?.deleteApp) {
                      toastManager.add({
                        title: "Aplicacion desactivada!",
                        description: "La app ha sido desactivada correctamente.",
                        type: "success",
                      });
                      router.refresh();
                    }
                  }}
                />
              }
            >
              Desactivar Aplicacion
            </AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </>
  );
}
