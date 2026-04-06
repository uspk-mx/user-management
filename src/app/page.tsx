import { PageHeader } from "@/components/custom-components/page-header";
import OverviewCardList from "@/components/pages/overview/overview-card-list";
import { getApps } from "@/lib/services/apps";
import { getRoles, getUsers } from "@/lib/services/users";

export default async function Home() {
  const [apps, users, roles] = await Promise.all([getApps(), getUsers(), getRoles()]);

  const data = [
    { title: String(apps?.totalCount ?? 0), description: "Apps", details: { title: "", description: "Cantidad de apps registradas en el sistema" } },
    { title: String(users?.length ?? 0), description: "Usuarios", details: { title: "", description: "Cantidad de usuarios registrados en el sistema" } },
    { title: String(roles?.length ?? 0), description: "Roles", details: { title: "", description: "Cantidad de roles definidos en el sistema" } },
  ];

  return (
    <>
      <PageHeader title="Overview" />
      <OverviewCardList data={data} />
    </>
  );
}
