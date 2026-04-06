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
  AccountType,
  ApprovalStatus,
  PendingApprovalsQuery,
} from "@/graphql/gql/graphql";
import { IconDots, IconEdit } from "@tabler/icons-react";
import { TrashIcon } from "lucide-react";
import { TablePagination } from "./table-pagination";
import { Button } from "./ui/button";
import { EmptyBlock } from "./empty-block";

interface ApprovalsTableProps {
  approvalsData: PendingApprovalsQuery["pendingApprovals"] | undefined;
}

export function ApprovalsTable({ approvalsData }: ApprovalsTableProps) {
  const PAGE_SIZE = 6;
  const hasNextPage = (approvalsData?.length ?? 0) > PAGE_SIZE;
  const displayApprovals = (approvalsData ?? []).slice(0, PAGE_SIZE);
  const formatDate = (value: Date) =>
    new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(value);

  const accountType: Record<AccountType, string> = {
    CORPORATE: "Corporativa",
    EXTERNAL: "Externa",
  };

  const approvalStatus: Record<ApprovalStatus, string> = {
    PENDING: "Pendiente",
    APPROVED: "Aprobada",
    REJECTED: "Rechazada",
  };

  return (
    <>
      {approvalsData?.length ? (
        <Table>
          <TableCaption>Solicitudes de accesso</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Correo electronico</TableHead>
              <TableHead>Tipo de cuenta</TableHead>
              <TableHead>Estatus</TableHead>
              <TableHead>Requerido el</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayApprovals?.map((approval) => (
              <TableRow key={approval?.id}>
                <TableCell className="font-medium">
                  {approval?.fullName}
                </TableCell>
                <TableCell>{approval?.email}</TableCell>
                <TableCell>
                  {accountType[approval?.accountType as AccountType]}
                </TableCell>
                <TableCell>
                  {approvalStatus[approval?.approval?.status as ApprovalStatus]}
                </TableCell>
                <TableCell>
                  {formatDate(new Date(approval?.approval?.requestedAt ?? ""))}
                </TableCell>
                <TableCell></TableCell>
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
                      <MenuItem variant="destructive">
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
      ) : (
        <EmptyBlock title="No hay solicitudes de acceso pendientes." />
      )}
      .{" "}
      {approvalsData?.length && approvalsData.length > 6 ? (
        <TablePagination
          totalCount={displayApprovals.length}
          hasNextPage={hasNextPage}
        />
      ) : null}
    </>
  );
}
