import { getProfile } from "@/lib/services/users";
import { redirect } from "next/navigation";
import ProfileClient from "./profile-client";

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  }

  return (
    <ProfileClient
      userId={profile.userID}
      fullName={profile.fullName}
      userName={profile.userName}
      email={profile.email}
      phoneNumber={profile.phoneNumber ?? ""}
      profilePicture={profile.profilePicture ?? ""}
    />
  );
}
