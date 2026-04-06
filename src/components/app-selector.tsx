"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInitials } from "@/lib/utils";

const users = [
  {
    avatar:
      "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=72&h=72&dpr=2&q=80",
    initials: "JH",
    label: "Jenny Hamilton",
    value: "jenny",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=72&h=72&dpr=2&q=80",
    initials: "PS",
    label: "Paul Smith",
    value: "paul",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1655874819398-c6dfbec68ac7?w=72&h=72&dpr=2&q=80",
    initials: "LW",
    label: "Luna Wyen",
    value: "luna",
  },
];

export interface AppDetails {
  label: string;
  value: string;
  logo?: string;
  url?: string;
}

interface AppSelectorProps {
  apps: AppDetails[];
  defaultApp?: AppDetails;
}

export function AppSelector({ apps, defaultApp }: AppSelectorProps) {
  return (
    <Select
      aria-label="Select app"
      defaultValue={apps.find((app) => app.value === defaultApp?.value)}
      itemToStringValue={(item) => item.value}
    >
      <SelectTrigger size="lg">
        <SelectValue>
          {(item) => (
            <span className="flex items-center gap-2">
              <Avatar className="size-5">
                <AvatarImage alt={item?.label} src={item?.logo} />
                <AvatarFallback className="text-[.625rem]">
                  {item?.label ? getInitials(item?.label) : ""}
                </AvatarFallback>
              </Avatar>
              <span className="truncate">{item?.label}</span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectPopup>
        <SelectGroup>
          <SelectGroupLabel>Aplicaciones disponibles</SelectGroupLabel>
          {apps.map((item) => (
            <SelectItem key={item.value} value={item}>
              <span className="flex items-center gap-2">
                <Avatar className="size-5">
                  <AvatarImage alt={item.label} src={item.logo} />
                  <AvatarFallback className="text-[10px]">
                    {getInitials(item.label)}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">{item.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectPopup>
    </Select>
  );
}
