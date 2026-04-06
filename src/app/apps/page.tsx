import { AppsPage } from "@/components/pages/apps/apps-page";
import { getApps } from "@/lib/services/apps";

export default async function Apps() {
  const appsData = await getApps();
  return <AppsPage appsData={appsData as any} />;
}
