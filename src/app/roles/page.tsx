import { RolesOverview } from "@/components/pages/roles/overview";
import { getRoles } from "@/lib/services/users";
import { PageHeader } from "@/components/custom-components/page-header";

export default async function RolesPage() {
  const rolesData = await getRoles();
  return <RolesOverview rolesData={rolesData} />;
}
