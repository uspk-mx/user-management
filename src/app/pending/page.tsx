import { getProfile } from "@/lib/services/users";
import { redirect } from "next/navigation";
import PendingApprovalClient from "./pending-client";

export default async function PendingPage() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  }

  return (
    <PendingApprovalClient
      userId={profile.userID}
      fullName={profile.fullName}
      email={profile.email}
    />
  );
}
