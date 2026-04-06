"use client";
import { Button } from "@/components/ui/button";
import { VerifyEmailDocument } from "@/graphql/gql/graphql";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "urql";

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [, verifyMutation] = useMutation(VerifyEmailDocument);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMsg("Token inválido o faltante.");
      return;
    }

    verifyMutation({ token }).then((res) => {
      if (res.error) {
        setStatus("error");
        setErrorMsg(
          res.error.graphQLErrors[0]?.message ?? "Error al verificar el correo."
        );
      } else {
        setStatus("success");
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <div className="w-full rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 text-center flex flex-col gap-4 items-center">
          {status === "loading" && (
            <>
              <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                ⏳
              </div>
              <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Verificando correo...
              </h1>
            </>
          )}

          {status === "success" && (
            <>
              <div className="size-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                ✅
              </div>
              <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">
                ¡Correo verificado!
              </h1>
              <p className="text-sm text-zinc-500">
                Tu correo ha sido verificado correctamente. Ya puedes iniciar
                sesión.
              </p>
              <Link href="/login" className="w-full">
                <Button className="w-full">Iniciar sesión</Button>
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="size-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">
                ❌
              </div>
              <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Error al verificar
              </h1>
              <p className="text-sm text-zinc-500">{errorMsg}</p>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  Volver al inicio de sesión
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
