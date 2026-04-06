import { PageHeader } from "@/components/custom-components/page-header";
import OverviewCardList from "@/components/pages/overview/overview-card-list";

export default async function Home() {
  return (
    <>
      <PageHeader title="Overview" />
      <OverviewCardList />
    </>
  );
}
