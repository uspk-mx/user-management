import { OverviewCard } from "./overview-card";

interface OverviewCardItem {
  title: string;
  description: string;
  badgeIcon?: React.ReactNode;
  details?: {
    title?: string;
    description?: string;
  };
}

interface OverviewCardListProps {
  data: OverviewCardItem[];
}

export default function OverviewCardList({ data }: OverviewCardListProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
      {data.map((cardData, index) => (
        <OverviewCard
          key={index}
          title={cardData.title}
          description={cardData.description}
          badgeIcon={cardData.badgeIcon}
          details={cardData.details}
        />
      ))}
    </div>
  );
}
