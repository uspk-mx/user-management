import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger
} from "@/components/ui/menu";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export interface UserMenuProps {
  profilePicture?: string;
  fullName: string;
  email: string;
  role?: string;
  onLogout: () => void;
}

export function UserMenu({ fullName, profilePicture, email, onLogout }: UserMenuProps) {
  return (
    <Menu>
      <MenuTrigger>
        <Avatar>
          <AvatarImage src={profilePicture} alt={fullName} />
          <AvatarFallback className="bg-background dark:bg-muted">{getInitials(fullName)}</AvatarFallback>
        </Avatar>
      </MenuTrigger>
      <MenuPopup>
        <MenuGroup>
          <MenuItem>{fullName}</MenuItem>
          <MenuItem>{email}</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuItem closeOnClick render={<Link href="/profile" />}>
            Profile
          </MenuItem>
          <MenuItem closeOnClick render={<Link href="/settings" />}>
            Settings
          </MenuItem>
          <MenuItem closeOnClick onClick={onLogout}>Log out</MenuItem>
        </MenuGroup>
      </MenuPopup>
    </Menu>
  );
}
