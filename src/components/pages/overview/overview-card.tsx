import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OverviewCardProps {
  title: string;
  description: string;
  badgeLabel?: string;
  badgeIcon?: React.ReactNode;
  details?: {
    title: string;
    description: string;
  };
}

export function OverviewCard({
  title,
  description,
  badgeLabel,
  badgeIcon,
  details,
}: OverviewCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {title}
        </CardTitle>
        {badgeLabel && (
          <CardAction>
            <Badge variant="outline">
              {badgeIcon ? badgeIcon : null}
              {badgeLabel}
            </Badge>
          </CardAction>
        )}
      </CardHeader>
      {details ? (
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {details.title}
          </div>
          <div className="text-muted-foreground">{details.description}</div>
        </CardFooter>
      ) : null}
    </Card>
  );
}
