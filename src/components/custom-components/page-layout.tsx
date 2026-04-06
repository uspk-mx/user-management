"use client";
import Image from "next/image";
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu, MenuGroup, MenuItem, MenuPopup, MenuTrigger } from "../ui/menu";
import Link from "next/link";
import {
  IconAppsFilled,
  IconBoxMultipleFilled,
  IconChecks,
  IconHomeFilled,
  IconKeyFilled,
  IconLayoutGridFilled,
  IconLogout,
  IconSettings,
  IconShieldFilled,
  IconUser,
  IconUserFilled,
  IconUsers,
} from "@tabler/icons-react";
import { UserMenuProps } from "../user-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { useMutation } from "urql";
import { useParams, usePathname, useRouter } from "next/navigation";
import { LogoutDocument } from "@/graphql/gql/graphql";
import { NavLink } from "../sidebar";
import { useMemo } from "react";

const AUTH_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/pending",
];

export const PageLayout = ({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: Omit<UserMenuProps, "onLogout">;
}) => {
  const pathname = usePathname();
  const params = useParams();
  const [, mutateLogout] = useMutation(LogoutDocument);
  const router = useRouter();

  const handleLogout = async () => {
    const result = await mutateLogout({});
    if (result.data?.logout) {
      router.push("/login");
      router.refresh();
    }
  };

  // No layout for auth/public pages
  const isAuthPath = AUTH_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  if (isAuthPath) return <>{children}</>;

  const isAdmin = userData.role?.toLowerCase() === "admin";

  // Routes only accessible to admins
  const ADMIN_ROUTES = ["/users", "/roles", "/apps", "/approvals", "/admin"];
  const isAdminRoute =
    pathname === "/" ||
    ADMIN_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));

  // Block non-admins from admin routes — return null prevents content flash
  if (isAdminRoute && !isAdmin) {
    router.replace("/portal");
    return null;
  }

  const userBasePath = `/users/${params.id}`;
  const isUserDetailsRoute =
    pathname === userBasePath || pathname.startsWith(`${userBasePath}/`);

  // Portal routes: /portal/* and /profile (for non-admins only)
  // Admins on /profile stay in the admin sidebar
  const isPortalRoute =
    !isAdmin &&
    (pathname === "/portal" ||
      pathname.startsWith("/portal/") ||
      pathname === "/profile");

  // eslint-disable-next-line react-hooks/rules-of-hooks
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
    if (isPortalRoute) {
      return [
        {
          id: "portal",
          label: "Mis Aplicaciones",
          href: "/portal",
          isActive: pathname === "/portal",
          icon: (
            <IconLayoutGridFilled
              className={cn("size-5 fill-zinc-500", {
                "fill-foreground": pathname === "/portal",
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

    if (userData.role?.toLowerCase() === "admin") {
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
          isActive: pathname === "/users",
          icon: (
            <IconUsers
              className={cn("size-5 fill-zinc-500", {
                "fill-current ": pathname === "/users",
              })}
            />
          ),
        },
        {
          id: "roles",
          label: "Roles",
          href: "/roles",
          isActive: pathname === "/roles",
          icon: (
            <IconKeyFilled
              className={cn("size-5 fill-zinc-500", {
                "fill-foreground": pathname.includes("/roles"),
              })}
            />
          ),
        },
        {
          id: "apps",
          label: "Aplicaciones",
          href: "/apps",
          isActive: pathname === "/apps",
          icon: (
            <IconBoxMultipleFilled
              className={cn("size-5 fill-zinc-500", {
                "fill-current ": pathname === "/apps",
              })}
            />
          ),
        },
        {
          id: "approvals",
          label: "Solicitudes de acceso",
          href: "/approvals",
          isActive: pathname === "/approvals",
          icon: (
            <IconChecks
              className={cn("size-5 fill-zinc-500", {
                "fill-foreground": pathname === "/approvals",
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
        isActive: pathname === "/portal",
        icon: (
          <IconLayoutGridFilled
            className={cn("size-5 fill-zinc-500", {
              "fill-foreground": pathname === "/portal",
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
  }, [isPortalRoute, isUserDetailsRoute, params.id, pathname, userData.role]);

  return (
    <div className="relative isolate flex min-h-svh w-full bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
      {/* Sidebar */}
      <Sidebar
        routesTree={sidebarRoutes}
        userData={userData}
        handleLogout={handleLogout}
      />

      {/* Mobile header */}
      <header className="flex items-center px-4 lg:hidden">
        <div className="py-2.5">
          <span className="relative">
            <Sheet>
              <SheetTrigger
                render={
                  <button
                    aria-label="Open navigation"
                    className="cursor-default relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950 sm:text-sm/5 *:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5 *:not-nth-2:last:data-[slot=icon]:ml-auto *:not-nth-2:last:data-[slot=icon]:size-5 sm:*:not-nth-2:last:data-[slot=icon]:size-4 *:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 *:data-[slot=avatar]:[--avatar-radius:var(--radius-md)] sm:*:data-[slot=avatar]:size-6 hover:bg-zinc-950/5 hover:*:data-[slot=icon]:fill-zinc-950 active:bg-zinc-950/5 active:*:data-[slot=icon]:fill-zinc-950 dark:text-white dark:*:data-[slot=icon]:fill-zinc-400 dark:hover:bg-white/5 dark:hover:*:data-[slot=icon]:fill-white dark:active:bg-white/5 dark:active:*:data-[slot=icon]:fill-white"
                    type="button"
                    data-headlessui-state=""
                  >
                    <span
                      className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
                      aria-hidden="true"
                    />
                    <svg
                      data-slot="icon"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z"></path>
                    </svg>
                  </button>
                }
              />
              <SheetPopup side="left" showCloseButton={true}>
                <SheetHeader>
                  <SheetTitle>Navegación</SheetTitle>
                  <SheetDescription>Menu principal</SheetDescription>
                </SheetHeader>
              </SheetPopup>
            </Sheet>
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <nav className="flex flex-1 items-center gap-4 py-2.5">
            <div aria-hidden="true" className="-ml-4 flex-1"></div>
            <div className="flex items-center gap-3">
              <span className="relative">
                <Menu>
                  <MenuTrigger
                    render={
                      <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        data-headlessui-state=""
                        className="cursor-default relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950 sm:text-sm/5 *:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5 *:not-nth-2:last:data-[slot=icon]:ml-auto *:not-nth-2:last:data-[slot=icon]:size-5 sm:*:not-nth-2:last:data-[slot=icon]:size-4 *:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 *:data-[slot=avatar]:[--avatar-radius:var(--radius-md)] sm:*:data-[slot=avatar]:size-6 hover:bg-zinc-950/5 hover:*:data-[slot=icon]:fill-zinc-950 active:bg-zinc-950/5 active:*:data-[slot=icon]:fill-zinc-950 dark:text-white dark:*:data-[slot=icon]:fill-zinc-400 dark:hover:bg-white/5 dark:hover:*:data-[slot=icon]:fill-white dark:active:bg-white/5 dark:active:*:data-[slot=icon]:fill-white"
                      >
                        <span
                          className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
                          aria-hidden="true"
                        />
                        <span
                          data-slot="avatar"
                          className="inline-grid shrink-0 align-middle [--avatar-radius:20%] *:col-start-1 *:row-start-1 outline -outline-offset-1 outline-black/10 dark:outline-white/10 rounded-(--avatar-radius) *:rounded-(--avatar-radius)"
                        >
                          {userData.profilePicture ? (
                            <Image
                              className="size-full"
                              src={userData.profilePicture}
                              alt={userData.fullName}
                              width={100}
                              height={100}
                            />
                          ) : (
                            <Avatar className="rounded-[inherit] size-6m">
                              <AvatarFallback className="rounded-[inherit] size-6">
                                {getInitials(userData.fullName)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </span>
                      </button>
                    }
                  />
                  <MenuPopup>
                    <MenuGroup>
                      <MenuItem closeOnClick render={<Link href="/profile" />}>
                        <IconUser /> Perfil
                      </MenuItem>
                      <MenuItem closeOnClick render={<Link href="/settings" />}>
                        <IconSettings /> Ajustes
                      </MenuItem>
                      <MenuItem closeOnClick onClick={handleLogout}>
                        <IconLogout /> Cerrar sesión
                      </MenuItem>
                    </MenuGroup>
                  </MenuPopup>
                </Menu>
              </span>
            </div>
          </nav>
        </div>
      </header>

      {/* Body */}
      <main className="flex flex-1 flex-col pb-2 lg:min-w-0 lg:pt-2 lg:pr-2 lg:pl-64">
        <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </div>
      </main>
    </div>
  );
};
