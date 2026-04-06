"use client";
import { ReactNode } from "react";
import ThemeToggle from "./theme-toggle";
import { Card, CardContent } from "./ui/card";
import { NavLink, Sidebar } from "./sidebar";
import { UserMenu, UserMenuProps } from "./user-menu";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useMutation } from "urql";
import { LogoutDocument } from "@/graphql/gql/graphql";

export const PageLayout = ({
  children,
  userData,
}: {
  children: ReactNode;
  userData: Omit<UserMenuProps, "onLogout">;
}) => {
  const pathname = usePathname();
  const params = useParams();
  const [, mutateLogout] = useMutation(LogoutDocument);
  const router = useRouter();

  const handleLogout = async () => {
    const result = await mutateLogout({});
    if (result.data?.logout) {
      router.refresh();
    }
  };

  const sidebarRoutes: NavLink[] =
    pathname === `/users/${params.id}`
      ? [
          {
            id: "overview",
            label: "Overview",
            href: `/users/${params.id}`,
            isActive: pathname === `/users/${params.id}`,
          },
          {
            id: "access",
            label: "Acceso",
            href: `/users/${params.id}/access`,
            isActive: pathname === `/users/${params.id}/access`,
          },
          {
            id: "sessions",
            label: "Sesiones",
            href: `/users/${params.id}/sessions`,
            isActive: pathname === `/users/${params.id}/sessions`,
          },
        ]
      : [
          {
            id: "overview",
            label: "Overview",
            href: "/",
            isActive: pathname === "/",
          },
          {
            id: "users",
            label: "Usuarios",
            href: "/users",
            isActive: pathname === "/users",
          },
          {
            id: "roles",
            label: "Roles",
            href: "/roles",
            isActive: pathname === "/roles",
          },
          {
            id: "approvals",
            label: "Solicitudes de acceso",
            href: "/approvals",
            isActive: pathname === "/approvals",
          },
        ];

  if (pathname === "/login") return children;
  return (
    <div className="px-6 py-20 min-h-svh flex flex-col justify-center bg-zinc-100 dark:bg-zinc-950">
      <div className="fixed top-4 right-4">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu {...userData} onLogout={handleLogout} />
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 min-h-122 max-h-full">
          {/* Chart area */}
          <div className="flex-1 @container">
            <Card className="shadow-2xl rounded-3xl border-transparent h-full dark:border-border/64">
              <CardContent className="h-full">{children}</CardContent>
            </Card>
          </div>
          <Sidebar routesTree={sidebarRoutes} />
        </div>
      </div>
    </div>
  );
};
