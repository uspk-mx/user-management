import { PageHeader } from "@/components/custom-components/page-header";
import { EmptyBlock } from "@/components/empty-block";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActiveSessionsQuery } from "@/graphql/gql/graphql";

interface UserSessionsProps {
  sessions?: ActiveSessionsQuery["activeSessions"];
}

export const UserSessions = ({ sessions }: UserSessionsProps) => {
  return (
    <>
      <PageHeader
        title="Sessiones activas del usuario"
        //   actions={<CreateUserModal triggerLabel="Modificar usuario" />}
        hasBackButton={true}
        backButtonHref="/users"
      />

    {sessions?.length ?  <Table>
        <TableCaption>Lista de las sesiones activas del usuario.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Direccion IP</TableHead>
            <TableHead>Agente de Usuario</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions?.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">{session.id}</TableCell>
              <TableCell className="font-mono">{session.ipAddress}</TableCell>
              <TableCell>{session.userAgent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> : <EmptyBlock title="Sin sesiones activas aun." />}
    </>
  );
};
