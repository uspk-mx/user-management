import { getActiveSessionsByUserId, getUserById } from "@/lib/services/users";
import { AppAccess } from "@/components/pages/users/access/app-access";
import { UserSessions } from "@/components/pages/users/sessions/user-sessions";

export default async function UserSessionsPage({
  params,
}: PageProps<"/users/[id]/access">) {
  // const listRoles = await getRoles();
  const pageParams = await params;
  const sessions = await getActiveSessionsByUserId(pageParams.id);

  return <UserSessions sessions={sessions} />;
}
