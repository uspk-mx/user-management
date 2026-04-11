import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function PageHeader({
  title,
  hasSeparator = true,
  actions,
  hasBackButton = false,
  backButtonHref,
}: {
  title: string;
  actions?: React.ReactNode;
  hasSeparator?: boolean;
  hasBackButton?: boolean;
  backButtonHref?: string;
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row md:items-center gap-3 mb-6!">
        {hasBackButton && (
          <Button
            variant="ghost"
            size="icon"
            render={<Link href={backButtonHref ?? ""} />}
          >
            <IconArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div className="flex-1 flex gap-3">
          <h1 className="text-2xl/8! font-semibold text-zinc-950 sm:text-xl/8! dark:text-white">
            {title}
          </h1>
        </div>
        {actions && (
          <div className="flex items-center justify-between gap-2">
            {actions}
          </div>
        )}
      </div>
      {hasSeparator && (
        <hr
          role="presentation"
          className="mt-6 w-full border-t border-zinc-950/10 dark:border-white/10"
        />
      )}
    </>
  );
}
