"use client";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogoutDocument, UserApprovalDocument } from "@/graphql/gql/graphql";
import { IconCheck, IconClock, IconX } from "@tabler/icons-react";
import { VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "urql";

interface PendingApprovalClientProps {
  userId: string;
  fullName: string;
  email: string;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendiente",
  APPROVED: "Aprobado",
  REJECTED: "Rechazado",
};

const STATUS_COLORS: Record<
  string,
  VariantProps<typeof badgeVariants>["variant"]
> = {
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "info",
};

export default function PendingApprovalClient({
  userId,
  fullName,
  email,
}: PendingApprovalClientProps) {
  const router = useRouter();
  const [, mutateLogout] = useMutation(LogoutDocument);
  // pause: true — only fetch when the user clicks "Actualizar estado"
  const [pause, setPause] = useState(false);

  const [{ data, fetching }, refetch] = useQuery({
    query: UserApprovalDocument,
    variables: { userId },
    pause,
  });

  const status = data?.userApproval?.status ?? "PENDING";
  const requestedAt = data?.userApproval?.requestedAt;

  // Run one initial fetch on mount
  const didFetch = useRef(false);
  useEffect(() => {
    if (!didFetch.current) {
      didFetch.current = true;
      setPause(false);
    }
  }, []);

  // Auto-redirect once when approved — router ref avoids stale closure loop
  const redirected = useRef(false);
  useEffect(() => {
    if (status === "APPROVED" && !redirected.current) {
      redirected.current = true;
      const t = setTimeout(() => router.push("/portal"), 2000);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleRefetch = () => {
    refetch({ requestPolicy: "network-only" });
  };

  const handleLogout = async () => {
    await mutateLogout({});
    router.push("/login");
    router.refresh();
  };

  const formatDate = useCallback((iso: string) => {
    return new Date(iso).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 font-medium">
          <div className="flex size-8 items-center justify-center rounded-md bg-blue-600">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://pub-74a58968a0814f12bf1cecf8c23125ee.r2.dev/logos/u-logo-white.png"
              alt="Logo"
              className="w-full object-cover pt-1"
            />
          </div>
        </div>

        {/* Card */}
        <div className="w-full rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Icon */}
            <div className="flex size-16 items-center justify-center rounded-full text-current bg-accent text-3xl">
              {status === "APPROVED" ? (
                <IconCheck />
              ) : status === "REJECTED" ? (
                <IconX />
              ) : (
                <IconClock />
              )}
            </div>

            {/* Title */}
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
                {status === "APPROVED"
                  ? "¡Cuenta Aprobada!"
                  : status === "REJECTED"
                  ? "Cuenta Rechazada"
                  : "Cuenta Pendiente de Aprobación"}
              </h1>
              <p className="text-sm text-zinc-500">
                {status === "APPROVED"
                  ? "Serás redirigido al portal en un momento..."
                  : status === "REJECTED"
                  ? "Tu solicitud fue rechazada. Contacta al soporte."
                  : "Tu cuenta está en revisión por un administrador."}
              </p>
            </div>

            {/* User info */}
            <div className="w-full rounded-lg border border-zinc-100 bg-zinc-50 p-4 text-left dark:border-zinc-800 dark:bg-zinc-800/50">
              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                {fullName}
              </p>
              <p className="text-xs text-zinc-500">{email}</p>
              {requestedAt && (
                <p className="mt-2 text-xs text-zinc-400">
                  Solicitado el {formatDate(requestedAt)}
                </p>
              )}
            </div>

            {/* Status badge */}
            <Badge
              variant={STATUS_COLORS[status] ?? STATUS_COLORS.PENDING}
              size="lg"
            >
              {STATUS_LABELS[status] ?? status}
            </Badge>

            {/* Actions */}
            <div className="flex w-full flex-col gap-2">
              {status === "PENDING" && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleRefetch}
                  disabled={fetching}
                >
                  {fetching ? "Verificando..." : "Actualizar estado"}
                </Button>
              )}
              {status === "APPROVED" && (
                <Button
                  className="w-full"
                  onClick={() => router.push("/portal")}
                >
                  Ir al Portal
                </Button>
              )}
              <Button className="w-full" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </div>

            {status === "PENDING" && (
              <p className="text-xs text-zinc-400">
                Recibirás un correo cuando tu cuenta sea revisada.{" "}
                <a
                  href="https://uspk.com.mx/contact"
                  className="underline underline-offset-2"
                >
                  ¿Necesitas ayuda?
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
