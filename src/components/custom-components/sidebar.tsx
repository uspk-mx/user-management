import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Menu, MenuGroup, MenuItem, MenuPopup, MenuTrigger } from "../ui/menu";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { UserMenuProps } from "../user-menu";
import { getInitials } from "@/lib/utils";
import ThemeToggle from "../theme-toggle";

interface NavLink {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
  icon?: React.ReactNode;
}

export interface SidebarProps {
  routesTree: NavLink[];
  userData: Omit<UserMenuProps, "onLogout">;
  handleLogout: () => Promise<void>;
}

export function Sidebar({ routesTree, userData, handleLogout }: SidebarProps) {
  return (
    <div className="fixed inset-y-0 left-0 w-64 max-lg:hidden">
      <nav className="flex h-full min-h-0 flex-col">
        <div className="flex flex-col border-b border-zinc-950/5 p-4 dark:border-white/5 [&amp;&gt;[data-slot=section]+[data-slot=section]]:mt-2.5">
          <div data-slot="section" className="flex flex-col gap-0.5">
            <span className="relative">
              <button
                id="headlessui-menu-button-_R_1t9ivaivb_"
                type="button"
                aria-haspopup="menu"
                aria-expanded="false"
                data-headlessui-state=""
                className="cursor-default flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5 *:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5 *:last:data-[slot=icon]:ml-auto *:last:data-[slot=icon]:size-5 sm:*:last:data-[slot=icon]:size-4 *:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 sm:*:data-[slot=avatar]:size-6 hover:bg-zinc-950/5 hover:*:data-[slot=icon]:fill-zinc-950 active:bg-zinc-950/5 active:*:data-[slot=icon]:fill-zinc-950 data-current:*:data-[slot=icon]:fill-zinc-950 dark:text-white dark:*:data-[slot=icon]:fill-zinc-400 dark:hover:bg-white/5 dark:hover:*:data-[slot=icon]:fill-white dark:active:bg-white/5 dark:active:*:data-[slot=icon]:fill-white dark:data-current:*:data-[slot=icon]:fill-white"
              >
                <span
                  className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
                  aria-hidden="true"
                />
                <span
                  data-slot="avatar"
                  className="inline-grid shrink-0 align-middle bg-white [--avatar-radius:20%] *:col-start-1 *:row-start-1 outline -outline-offset-1 outline-black/10 dark:outline-white/10 rounded-full *:rounded-full"
                >
                  <Image
                    className="w-7 h-7"
                    src="https://pub-74a58968a0814f12bf1cecf8c23125ee.r2.dev/logos/u-logo-blue.png"
                    alt="U logo"
                    width={100}
                    height={100}
                  />
                </span>
                <span className="truncate">User Management</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </span>
          </div>
          <div
            data-slot="section"
            className="max-lg:hidden flex flex-col gap-0.5"
          >
            <span className="relative">
              <a
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5 *:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5 *:last:data-[slot=icon]:ml-auto *:last:data-[slot=icon]:size-5 sm:*:last:data-[slot=icon]:size-4 *:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 sm:*:data-[slot=avatar]:size-6 hover:bg-zinc-950/5 hover:*:data-[slot=icon]:fill-zinc-950 active:bg-zinc-950/5 active:*:data-[slot=icon]:fill-zinc-950 data-current:*:data-[slot=icon]:fill-zinc-950 dark:text-white dark:*:data-[slot=icon]:fill-zinc-400 dark:hover:bg-white/5 dark:hover:*:data-[slot=icon]:fill-white dark:active:bg-white/5 dark:active:*:data-[slot=icon]:fill-white dark:data-current:*:data-[slot=icon]:fill-white"
                type="button"
                data-headlessui-state=""
                href="#"
              >
                <span
                  className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
                  aria-hidden="true"
                ></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="truncate">Search</span>
              </a>
            </span>
            <span className="relative">
              <a
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5 *:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5 *:last:data-[slot=icon]:ml-auto *:last:data-[slot=icon]:size-5 sm:*:last:data-[slot=icon]:size-4 *:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 sm:*:data-[slot=avatar]:size-6 hover:bg-zinc-950/5 hover:*:data-[slot=icon]:fill-zinc-950 active:bg-zinc-950/5 active:*:data-[slot=icon]:fill-zinc-950 data-current:*:data-[slot=icon]:fill-zinc-950 dark:text-white dark:*:data-[slot=icon]:fill-zinc-400 dark:hover:bg-white/5 dark:hover:*:data-[slot=icon]:fill-white dark:active:bg-white/5 dark:active:*:data-[slot=icon]:fill-white dark:data-current:*:data-[slot=icon]:fill-white"
                type="button"
                data-headlessui-state=""
                href="/demos/sidebar/inbox"
              >
                <span
                  className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
                  aria-hidden="true"
                ></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 11.27c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 0 1 5.273 3h9.454a2.75 2.75 0 0 1 2.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3.73Zm3.068-5.852A1.25 1.25 0 0 1 5.273 4.5h9.454a1.25 1.25 0 0 1 1.205.918l1.523 5.52c.006.02.01.041.015.062H14a1 1 0 0 0-.86.49l-.606 1.02a1 1 0 0 1-.86.49H8.236a1 1 0 0 1-.894-.553l-.448-.894A1 1 0 0 0 6 11H2.53l.015-.062 1.523-5.52Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="truncate">Inbox</span>
              </a>
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto p-4 [&amp;&gt;[data-slot=section]+[data-slot=section]]:mt-8">
          <div data-slot="section" className="flex flex-col gap-0.5">
            {routesTree.map((route) => (
              <span className="relative" key={route.id}>
                {route.isActive && (
                  <span
                    className="absolute inset-y-2 -left-4 w-0.5 rounded-full bg-zinc-950 dark:bg-white"
                    // style={{ opacity: route.isActive === 1 ? 1 : 0 }}
                  />
                )}
                <Link
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5 *:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5 *:last:data-[slot=icon]:ml-auto *:last:data-[slot=icon]:size-5 sm:*:last:data-[slot=icon]:size-4 *:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 sm:*:data-[slot=avatar]:size-6 hover:bg-zinc-950/5 hover:*:data-[slot=icon]:fill-zinc-950 active:bg-zinc-950/5 active:*:data-[slot=icon]:fill-zinc-950 data-current:*:data-[slot=icon]:fill-zinc-950 dark:text-white dark:*:data-[slot=icon]:fill-zinc-400 dark:hover:bg-white/5 dark:hover:*:data-[slot=icon]:fill-white dark:active:bg-white/5 dark:active:*:data-[slot=icon]:fill-white dark:data-current:*:data-[slot=icon]:fill-white"
                  href={route.href}
                  data-current="true"
                >
                  <span
                    className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
                    aria-hidden="true"
                  />
                  {route.icon}
                  <span className="truncate">{route.label}</span>
                </Link>
              </span>
            ))}
          </div>

          <div aria-hidden="true" className="mt-8 flex-1"></div>
          <div data-slot="section" className="flex flex-col gap-0.5">
            <span className="relative">
              <Link
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5 *:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5 *:last:data-[slot=icon]:ml-auto *:last:data-[slot=icon]:size-5 sm:*:last:data-[slot=icon]:size-4 *:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 sm:*:data-[slot=avatar]:size-6 hover:bg-zinc-950/5 hover:*:data-[slot=icon]:fill-zinc-950 active:bg-zinc-950/5 active:*:data-[slot=icon]:fill-zinc-950 data-current:*:data-[slot=icon]:fill-zinc-950 dark:text-white dark:*:data-[slot=icon]:fill-zinc-400 dark:hover:bg-white/5 dark:hover:*:data-[slot=icon]:fill-white dark:active:bg-white/5 dark:active:*:data-[slot=icon]:fill-white dark:data-current:*:data-[slot=icon]:fill-white"
                href="https://uspk.com.mx/contact"
              >
                <span
                  className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
                  aria-hidden="true"
                ></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="truncate">Soporte</span>
              </Link>
            </span>
            <span className="relative">
              <button
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5 *:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5 *:last:data-[slot=icon]:ml-auto *:last:data-[slot=icon]:size-5 sm:*:last:data-[slot=icon]:size-4 *:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 sm:*:data-[slot=avatar]:size-6 hover:bg-zinc-950/5 hover:*:data-[slot=icon]:fill-zinc-950 active:bg-zinc-950/5 active:*:data-[slot=icon]:fill-zinc-950 data-current:*:data-[slot=icon]:fill-zinc-950 dark:text-white dark:*:data-[slot=icon]:fill-zinc-400 dark:hover:bg-white/5 dark:hover:*:data-[slot=icon]:fill-white dark:active:bg-white/5 dark:active:*:data-[slot=icon]:fill-white dark:data-current:*:data-[slot=icon]:fill-white"
                type="button"
                data-headlessui-state=""
              >
                <span
                  className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
                  aria-hidden="true"
                ></span>
                <ThemeToggle
                  showLabel
                  className="w-full [&>label]:justify-start"
                />
              </button>
            </span>
          </div>
        </div>
        <div className="max-lg:hidden flex flex-col border-t border-zinc-950/5 p-4 dark:border-white/5 [&amp;&gt;[data-slot=section]+[data-slot=section]]:mt-2.5">
          <div data-slot="section" className="flex flex-col gap-0.5">
            <span className="relative">
              <Menu>
                <MenuTrigger
                  render={
                    <button
                      id="headlessui-menu-button-_R_fpivaivb_"
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      data-headlessui-state=""
                      className="cursor-default flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5 *:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5 *:last:data-[slot=icon]:ml-auto *:last:data-[slot=icon]:size-5 sm:*:last:data-[slot=icon]:size-4 *:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 sm:*:data-[slot=avatar]:size-6 hover:bg-zinc-950/5 hover:*:data-[slot=icon]:fill-zinc-950 active:bg-zinc-950/5 active:*:data-[slot=icon]:fill-zinc-950 data-current:*:data-[slot=icon]:fill-zinc-950 dark:text-white dark:*:data-[slot=icon]:fill-zinc-400 dark:hover:bg-white/5 dark:hover:*:data-[slot=icon]:fill-white dark:active:bg-white/5 dark:active:*:data-[slot=icon]:fill-white dark:data-current:*:data-[slot=icon]:fill-white"
                    >
                      <span
                        className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
                        aria-hidden="true"
                      />
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          data-slot="avatar"
                          className="size-10 inline-grid shrink-0 align-middle [--avatar-radius:20%] *:col-start-1 *:row-start-1 outline -outline-offset-1 outline-black/10 dark:outline-white/10 rounded-(--avatar-radius) *:rounded-(--avatar-radius)"
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
                            <Avatar className="size-full">
                              <AvatarFallback className="rounded-[inherit]">
                                {getInitials(userData.fullName)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                            {userData.fullName}
                          </span>
                          <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                            {userData.email}
                          </span>
                        </span>
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  }
                />
                <MenuPopup className="min-w-60">
                  <MenuGroup>
                    <MenuItem closeOnClick render={<Link href="/profile" />}>
                      <IconUser /> Profile
                    </MenuItem>
                    <MenuItem closeOnClick render={<Link href="/settings" />}>
                      <IconSettings /> Settings
                    </MenuItem>
                    <MenuItem closeOnClick onClick={handleLogout}>
                      <IconLogout /> Cerrar sesión
                    </MenuItem>
                  </MenuGroup>
                </MenuPopup>
              </Menu>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
