import { AppDetails } from "@/components/app-selector";
import { AppsQuery } from "@/graphql/gql/graphql";
import { globalConfig } from "@/lib/config";
import { getInitialAppByName } from "@/lib/utils";
import { useMemo } from "react";

export function useGetApps({
  appsData,
}: {
  appsData: AppsQuery["apps"]["edges"] | undefined;
}): { apps: AppDetails[]; defaultApp: AppDetails } {
  const data = useMemo(
    () =>
      getInitialAppByName({
        apps: appsData,
        initialAppName: globalConfig.appName,
      }),
    [appsData],
  );

  return {
    apps:
      appsData?.map((edge) => ({
        label: edge.node.name,
        value: edge.node.id,
        logo: edge.node.icon ?? "",
        url: edge.node.url ?? "",
      })) || [],
    defaultApp: {
      label: data?.name || "Select an app",
      value: data?.id || "",
      logo: data?.icon || "",
      url: data?.url || "",
    },
  };
}
