"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { ChangePasswordDocument } from "@/graphql/gql/graphql";
import { PasswordInput } from "@uspk/components";
import { GraphQLError } from "graphql";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useMutation } from "urql";
import { AlertError } from "./alert-error";

export default function ResetPasswordForm() {
  const [, changePasswordMutation] = useMutation(ChangePasswordDocument);
  const [serverErrors, setServerErrors] = useState<GraphQLError[]>([]);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const handleSubmit = async (formData: FormData) => {
    const password = formData.get("password")?.toString() ?? "";
    const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }
    setPasswordError(null);

    if (!token) {
      setPasswordError("Token inválido. Solicita un nuevo enlace.");
      return;
    }

    const response = await changePasswordMutation({ token, password });

    if (response.error?.graphQLErrors.length) {
      setServerErrors(response.error.graphQLErrors);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/login"), 2500);
  };

  if (success) {
    return (
      <Card className="w-full max-w-xs">
        <CardHeader>
          <CardTitle>Contraseña actualizada</CardTitle>
          <CardDescription>
            Tu contraseña fue restablecida correctamente. Serás redirigido al
            inicio de sesión.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/login" className="w-full">
            <Button className="w-full">Iniciar sesión</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Nueva Contraseña</CardTitle>
        <CardDescription>Ingresa tu nueva contraseña.</CardDescription>
      </CardHeader>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(new FormData(e.currentTarget));
        }}
      >
        {serverErrors.map((item) => (
          <div className="px-4" key={item.message}>
            <AlertError title="Ocurrió un error" description={item.message} />
          </div>
        ))}
        {passwordError && (
          <div className="px-4">
            <AlertError title="Error" description={passwordError} />
          </div>
        )}
        <CardPanel>
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Nueva contraseña</FieldLabel>
              <PasswordInput
                type="password"
                placeholder="***********"
                name="password"
                required
              />
            </Field>
            <Field>
              <FieldLabel>Confirmar contraseña</FieldLabel>
              <PasswordInput
                type="password"
                placeholder="***********"
                name="confirmPassword"
                required
              />
            </Field>
          </div>
        </CardPanel>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" type="submit">
            Restablecer contraseña
          </Button>
          <p className="text-sm text-center">
            <Link href="/login" className="underline underline-offset-2">
              Volver al inicio de sesión
            </Link>
          </p>
        </CardFooter>
      </Form>
    </Card>
  );
}
