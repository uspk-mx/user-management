import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { OverviewCard } from "./overview-card";

export default function OverviewCardList() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
      <OverviewCard
        title="140"
        description="Usuarios"
        badgeIcon={<IconTrendingUp />}
        details={{
          title: "Growth Rate",
          description: "20%",
        }}
      />
      <OverviewCard
        title="28"
        description="Roles"
        badgeIcon={<IconTrendingUp />}
        details={{
          title: "Growth Rate",
          description: "15%",
        }}
      />
      <OverviewCard
        title="24"
        description="Apps"
        badgeIcon={<IconTrendingDown />}
        details={{
          title: "Growth Rate",
          description: "-5%",
        }}
      />
    </div>
  );
}
