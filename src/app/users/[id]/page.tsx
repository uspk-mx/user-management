import { UserDetails } from "@/components/pages/users/user-details";
import { getUserById } from "@/lib/services/users";

export default async function UsersPage({ params }: PageProps<"/users/[id]">) {
  // const listRoles = await getRoles();
  const pageParams = await params;
  const user = await getUserById(pageParams.id);

  return <UserDetails userData={user} />;
}
