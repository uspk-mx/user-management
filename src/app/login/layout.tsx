import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Login | Uspk User Management",
  description: "Uspk User Management",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
