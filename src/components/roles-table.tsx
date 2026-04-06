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
  DeleteRoleDocument,
  DeleteRoleMutation,
  DeleteRoleMutationVariables,
  ListRolesQuery,
  Roles,
} from "@/graphql/gql/graphql";
import { IconDots, IconEdit } from "@tabler/icons-react";
import { TrashIcon } from "lucide-react";
import { TablePagination } from "./table-pagination";
import { Button } from "./ui/button";
import { useMutation } from "urql";
import { use, useState } from "react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toastManager } from "./ui/toast";
import { useRouter } from "next/navigation";

interface RolesTableProps {
  rolesData: ListRolesQuery["listRoles"];
}

export function RolesTable({ rolesData }: RolesTableProps) {
  const PAGE_SIZE = 6;
  const hasNextPage = (rolesData?.length ?? 0) > PAGE_SIZE;
  const displayRoles = (rolesData ?? []).slice(0, PAGE_SIZE);
  const formatDate = (value: Date) =>
    new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(value);
  const [selectedRole, setSelectedRole] = useState<Roles | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const [, deleteRoleMutation] = useMutation<
    DeleteRoleMutation,
    DeleteRoleMutationVariables
  >(DeleteRoleDocument);

  const handleOpenDelete = (role: Roles) => {
    setSelectedRole(role);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteRole = async () => {
    if (!selectedRole) return;
    setIsDeleting(true);
    const response = await deleteRoleMutation({
      deleteRoleId: selectedRole.id,
    });

    if (response.data?.deleteRole) {
      setIsDeleting(false);
      setIsDeleteAlertOpen(false);
      toastManager.add({
        title: "Rol eliminado",
        description: `El rol ${selectedRole.name} ha sido eliminado correctamente.`,
        type: "success",
      });
      router.refresh();
    } else if (
      response.error?.graphQLErrors &&
      response.error?.graphQLErrors.length > 0
    ) {
      setIsDeleting(false);
      setIsDeleteAlertOpen(false);
      toastManager.add({
        title: "Error al eliminar rol",
        description: `No se pudo eliminar el rol ${selectedRole.name}.`,
        type: "error",
      });
    }
  };

  return (
    <>
      <Table>
        <TableCaption>Roles de usuario</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripcion</TableHead>
            <TableHead>Creado el</TableHead>
            <TableHead>Actualizado el</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayRoles?.map((role) => (
            <TableRow key={role?.id}>
              <TableCell className="font-medium">{role?.name}</TableCell>
              <TableCell>{role?.description}</TableCell>
              <TableCell>
                {formatDate(new Date(role?.createdAt ?? ""))}
              </TableCell>
              <TableCell>
                {formatDate(new Date(role?.updatedAt ?? ""))}
              </TableCell>
              <TableCell className="text-right">
                <Menu>
                  <MenuTrigger
                    render={<Button variant="outline" size="icon-sm" />}
                  >
                    <IconDots />
                  </MenuTrigger>
                  <MenuPopup>
                    <MenuItem>
                      <IconEdit />
                      Editar
                      <MenuShortcut>⌘E</MenuShortcut>
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem
                      variant="destructive"
                      onClick={() => handleOpenDelete(role)}
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
      {rolesData?.length && rolesData.length > 6 && (
        <TablePagination
          totalCount={displayRoles.length}
          hasNextPage={hasNextPage}
        />
      )}

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="ghost" type="button" />}>
              Cancel
            </AlertDialogClose>
            <AlertDialogClose
              render={
                <Button
                  variant="destructive"
                  onClick={handleDeleteRole}
                  disabled={isDeleting}
                />
              }
            >
              {isDeleting ? "Eliminando..." : "Eliminar role"}
            </AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </>
  );
}
