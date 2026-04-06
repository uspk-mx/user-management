import { PageHeader } from "@/components/custom-components/page-header";
import { AppsTable, AppsTableProps } from "./apps-table";
import { CreateAppModal } from "./create-app-modal";

export function AppsPage(props: AppsTableProps) {
  return (
    <>
      <PageHeader
        title="Aplicaciones"
        actions={<CreateAppModal triggerLabel="Agregar Aplicacion" />}
      />
      <AppsTable {...props} />
    </>
  );
}



