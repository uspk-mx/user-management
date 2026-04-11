"use client";
import { AppsQuery, LogoutDocument } from "@/graphql/gql/graphql";
import { useGetApps } from "@/hooks/use-get-apps";
import { cn } from "@/lib/utils";
import {
  IconAppsFilled,
  IconBoxMultipleFilled,
  IconChecks,
  IconHomeFilled,
  IconKeyFilled,
  IconLayoutGridFilled,
  IconLogout,
  IconShieldFilled,
  IconUser,
  IconUserFilled,
  IconUsers,
} from "@tabler/icons-react";
import { PageLayout } from "@uspk/components";
import { useTheme } from "next-themes";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useMutation } from "urql";
import { NavLink } from "../sidebar";
import { UserMenuProps } from "../user-menu";
import Link from "next/link";

const AUTH_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/pending",
];

export const MainPageLayout = ({
  children,
  userData,
  appsData,
}: {
  children: React.ReactNode;
  userData: Omit<UserMenuProps, "onLogout">;
  appsData?: AppsQuery["apps"];
}) => {
  const pathname = usePathname();
  const params = useParams();
  const [, mutateLogout] = useMutation(LogoutDocument);
  const router = useRouter();
  const { defaultApp, apps } = useGetApps({ appsData: appsData?.edges });
  const { theme, setTheme } = useTheme();

  const handleLogout = useCallback(async () => {
    const result = await mutateLogout({});
    if (result.data?.logout) {
      router.push("/login");
      router.refresh();
    }
  }, [mutateLogout, router]);

  const isAdmin = userData?.role?.toLowerCase() === "admin";

  const ADMIN_ROUTES = ["/users", "/roles", "/apps", "/approvals", "/admin"];
  const isAdminRoute =
    pathname === "/" ||
    ADMIN_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));

  const userBasePath = `/users/${params.id}`;
  const isUserDetailsRoute =
    pathname === userBasePath || pathname.startsWith(`${userBasePath}/`);

  const userMenuData = useMemo(
    () => [
      {
        id: "profile",
        label: "Profile",
        icon: <IconUser className="size-4" />,
        onClick: undefined
      },
      {
        id: "logout",
        label: "Logout",
        onClick: handleLogout,
        icon: <IconLogout className="size-4" />,
      },
    ],
    [handleLogout],
  );

  const sidebarRoutes: NavLink[] = useMemo(() => {
    if (isUserDetailsRoute) {
      return [
        {
          id: "overview",
          label: "Overview",
          href: `/users/${params.id}`,
          isActive: pathname === `/users/${params.id}`,
          icon: (
            <IconUserFilled
              className={cn("size-5 fill-zinc-500", {
                "fill-foreground": pathname === `/users/${params.id}`,
              })}
            />
          ),
        },
        {
          id: "access",
          label: "Acceso",
          href: `/users/${params.id}/access`,
          isActive: pathname === `/users/${params.id}/access`,
          icon: (
            <IconAppsFilled
              className={cn("size-5 fill-zinc-500", {
                "fill-foreground": pathname === `/users/${params.id}/access`,
              })}
            />
          ),
        },
        {
          id: "sessions",
          label: "Sesiones",
          href: `/users/${params.id}/sessions`,
          isActive: pathname === `/users/${params.id}/sessions`,
          icon: (
            <IconShieldFilled
              className={cn("size-5 fill-zinc-500", {
                "fill-foreground": pathname === `/users/${params.id}/sessions`,
              })}
            />
          ),
        },
      ];
    }

    if (isAdmin) {
      return [
        {
          id: "overview",
          label: "Overview",
          href: "/",
          isActive: pathname === "/",
          icon: (
            <IconHomeFilled
              className={cn("size-5 fill-zinc-500", {
                "fill-foreground": pathname === "/",
              })}
            />
          ),
        },
        {
          id: "users",
          label: "Usuarios",
          href: "/users",
          isActive: pathname === "/users" || pathname.startsWith("/users/"),
          icon: (
            <IconUsers
              className={cn("size-5 fill-zinc-500", {
                "fill-current":
                  pathname === "/users" || pathname.startsWith("/users/"),
              })}
            />
          ),
        },
        {
          id: "roles",
          label: "Roles",
          href: "/roles",
          isActive: pathname === "/roles" || pathname.startsWith("/roles/"),
          icon: (
            <IconKeyFilled
              className={cn("size-5 fill-zinc-500", {
                "fill-foreground":
                  pathname === "/roles" || pathname.startsWith("/roles/"),
              })}
            />
          ),
        },
        {
          id: "apps",
          label: "Aplicaciones",
          href: "/apps",
          isActive: pathname === "/apps" || pathname.startsWith("/apps/"),
          icon: (
            <IconBoxMultipleFilled
              className={cn("size-5 fill-zinc-500", {
                "fill-current":
                  pathname === "/apps" || pathname.startsWith("/apps/"),
              })}
            />
          ),
        },
        {
          id: "approvals",
          label: "Solicitudes de acceso",
          href: "/approvals",
          isActive:
            pathname === "/approvals" || pathname.startsWith("/approvals/"),
          icon: (
            <IconChecks
              className={cn("size-5 fill-zinc-500", {
                "fill-foreground":
                  pathname === "/approvals" ||
                  pathname.startsWith("/approvals/"),
              })}
            />
          ),
        },
        {
          id: "profile",
          label: "Mi Perfil",
          href: "/profile",
          isActive: pathname === "/profile",
          icon: (
            <IconUserFilled
              className={cn("size-5 fill-zinc-500", {
                "fill-foreground": pathname === "/profile",
              })}
            />
          ),
        },
      ];
    }

    return [
      {
        id: "portal",
        label: "Mis Aplicaciones",
        href: "/portal",
        isActive: pathname === "/portal" || pathname.startsWith("/portal/"),
        icon: (
          <IconLayoutGridFilled
            className={cn("size-5 fill-zinc-500", {
              "fill-foreground":
                pathname === "/portal" || pathname.startsWith("/portal/"),
            })}
          />
        ),
      },
      {
        id: "profile",
        label: "Mi Perfil",
        href: "/profile",
        isActive: pathname === "/profile",
        icon: (
          <IconUserFilled
            className={cn("size-5 fill-zinc-500", {
              "fill-foreground": pathname === "/profile",
            })}
          />
        ),
      },
    ];
  }, [isAdmin, isUserDetailsRoute, params.id, pathname]);

  // No layout for auth/public pages — early returns come AFTER all hooks
  const isAuthPath = AUTH_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  if (isAuthPath) return <>{children}</>;

  // Block non-admins from admin routes — return null prevents content flash
  if (isAdminRoute && !isAdmin) {
    router.replace("/portal");
    return null;
  }

  return (
    <PageLayout
      routesTree={sidebarRoutes}
      userData={userData}
      onLogout={handleLogout}
      theme={theme || "system"}
      onThemeChange={setTheme}
      apps={apps}
      LinkComponent={Link}
      defaultApp={defaultApp}
      userMenuData={[
        {
          id: "profile",
          label: "Profile",
          icon: <IconUser className="size-4" />,
          render: <Link href="/profile" />,
        },
        {
          id: "logout",
          label: "Logout",
          onClick: handleLogout,
          icon: <IconLogout className="size-4" />,
        },
      ]}
    >
      {children}
    </PageLayout>
  );
};
