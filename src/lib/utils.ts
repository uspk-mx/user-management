import { App, AppEdge, AppsQuery } from "@/graphql/gql/graphql";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  const [firstName, lastName] = name?.split(" ");
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

export const isClient = typeof window !== "undefined";

export function getInitialAppByName({
  apps,
  initialAppName,
}: {
  apps: AppsQuery["apps"]["edges"] | undefined;
  initialAppName?: string;
}) {
  if (initialAppName) {
    return apps?.find((app) => app.node.name === initialAppName)?.node;
  }

  return apps?.[0]?.node;
}
