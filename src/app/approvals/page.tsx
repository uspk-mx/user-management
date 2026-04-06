import { ApprovalsTable } from "@/components/approvals-table";
import { PageHeader } from "@/components/custom-components/page-header";
import { getPendingApprovals } from "@/lib/services/users";

export default async function ApprovalsPage() {
  const approvalsData = await getPendingApprovals();
  return (
    <>
      <PageHeader title="Solicitudes de acceso" />
      <ApprovalsTable approvalsData={approvalsData} />
    </>
  );
}
