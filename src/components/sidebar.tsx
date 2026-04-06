import { cn } from "@/lib/utils";
import { IconCircleFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export interface NavLink {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
  icon?: React.ReactNode;
}

export function Sidebar({ routesTree }: { routesTree: NavLink[] }) {
  return (
    <aside className="md:-order-1 dark md:w-60 rounded-3xl shadow-2xl bg-sidebar text-foreground p-5 flex flex-col gap-4 border border-transparent dark:border-border/64">
      <div className="mb-4">
        <Link href="/">
          <span className="sr-only">Logo</span>
          <Image
            src="https://res.cloudinary.com/uspk/image/upload/v1642566273/logos/svg/uspk-u-mark.svg"
            alt="logo uspk"
            width={31}
            height={31}
          />
        </Link>
      </div>

      <div className="flex-1">
        <div className="uppercase font-medium text-xs text-muted-foreground/64 mb-2">
          User Management
        </div>
        <nav>
          <ul className="text-[13px] font-semibold divide-y divide-border/64">
            {routesTree.map((link) => (
              <li key={link.id}>
                <Link className="flex items-center gap-2 py-2" href={link.href}>
                  <IconCircleFilled
                    size={10}
                    className={cn("flex", { hidden: !link.isActive })}
                  />
                  <span
                    className={link.isActive ? "font-semibold" : "font-medium"}
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div>
        <div className="uppercase font-medium text-xs text-muted-foreground/64 mb-4">
          Market sentiment
        </div>
        <div className="flex items-center text-[13px] font-semibold gap-2 mb-2">
          <div className="text-emerald-500">27%</div>
          <div
            className="h-1.5 flex items-center gap-1 flex-1"
            aria-hidden="true"
          >
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: "27%" }}
            ></div>
            <div
              className="h-full bg-rose-500 rounded-full"
              style={{ width: "73%" }}
            ></div>
          </div>
          <div className="text-rose-500">73%</div>
        </div>
        <div className="text-[13px] flex justify-between text-muted-foreground/64">
          <div>Bullish</div>
          <div>Bearish</div>
        </div>
      </div>
    </aside>
  );
}
