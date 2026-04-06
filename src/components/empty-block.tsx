import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconMoodEmpty } from "@tabler/icons-react";

export function EmptyBlock({
  title,
  description,
  renderActions,
}: {
  title: string;
  description?: string;
  renderActions?: React.ReactNode;
}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconMoodEmpty />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {renderActions && (
        <EmptyContent>
          <div className="flex gap-2">{renderActions}</div>
        </EmptyContent>
      )}
    </Empty>
  );
}
