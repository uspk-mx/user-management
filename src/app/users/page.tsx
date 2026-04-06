import { UsersPage } from "@/components/pages/users/users-page";
import { getRoles, getUsers } from "@/lib/services/users";

export default async function UsersMainPage() {
  const userData = await getUsers();
  const listRoles = await getRoles();

  return <UsersPage userData={userData} rolesData={listRoles} />;
}
