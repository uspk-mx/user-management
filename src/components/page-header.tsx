import React, { ReactNode } from "react";

export const PageHeader = ({
  title,
  actions,
}: {
  title: string;
  actions?: ReactNode;
}) => {
  return (
    <div className="flex flex-col @md:flex-row @md:items-center gap-3 mb-6">
      <div className="flex-1 flex gap-3">
        <span className="text-xl font-semibold">{title}</span>
      </div>
      {actions && (
        <div className="flex items-center justify-between gap-2">{actions}</div>
      )}
    </div>
  );
};
