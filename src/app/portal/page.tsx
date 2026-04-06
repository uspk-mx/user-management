import { getMyApps, getProfile, getUserApproval } from "@/lib/services/users";
import { redirect } from "next/navigation";
import PortalAppGrid from "./portal-app-grid";

export default async function PortalPage() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  }

  // Only block users who have an explicit PENDING or REJECTED approval.
  // Users with no approval record (admin-created, etc.) pass through freely.
  const approval = await getUserApproval(profile.userID);
  if (approval?.status === "PENDING" || approval?.status === "REJECTED") {
    redirect("/pending");
  }

  const apps = await getMyApps();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Bienvenido, {profile.fullName.split(" ")[0]}
        </h1>
        <p className="text-sm text-zinc-500">
          Aquí están todas las aplicaciones a las que tienes acceso.
        </p>
      </div>

      <PortalAppGrid apps={apps ?? []} />
    </div>
  );
}
