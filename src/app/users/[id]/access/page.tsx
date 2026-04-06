import { getUserById } from "@/lib/services/users";
import { AppAccess} from "@/components/pages/users/access/app-access";

export default async function AppsAccessPage({ params }: PageProps<"/users/[id]/access">)  {
      // const listRoles = await getRoles();
  const pageParams = await params;
  const user = await getUserById(pageParams.id);

  return <AppAccess />

}

