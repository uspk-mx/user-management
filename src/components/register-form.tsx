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
import { Field, FieldControl, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { RegisterUserDocument } from "@/graphql/gql/graphql";
import { GraphQLError } from "graphql";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "urql";
import { AlertError } from "./alert-error";

export default function RegisterForm() {
  const [, registerMutation] = useMutation(RegisterUserDocument);
  const [serverErrors, setServerErrors] = useState<GraphQLError[]>([]);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (formData: FormData) => {
    const fullName = formData.get("fullName")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const username = formData.get("username")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }
    setPasswordError(null);

    const response = await registerMutation({
      input: { fullName, email, username, password },
    });

    if (response.error?.graphQLErrors.length) {
      setServerErrors(response.error.graphQLErrors);
      return;
    }

    if (response.data?.registerUser) {
      router.push("/login?registered=1");
    }
  };

  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Crear Cuenta</CardTitle>
        <CardDescription>
          Completa el formulario para solicitar acceso.
        </CardDescription>
      </CardHeader>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister(new FormData(e.currentTarget));
        }}
      >
        {serverErrors.map((item) => (
          <div className="px-4" key={item.message}>
            <AlertError
              title="Ocurrió un error"
              description={item.message}
            />
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
              <FieldLabel>Nombre completo</FieldLabel>
              <FieldControl
                type="text"
                placeholder="Juan Pérez"
                name="fullName"
                required
              />
            </Field>
            <Field>
              <FieldLabel>Usuario</FieldLabel>
              <FieldControl
                type="text"
                placeholder="juanperez"
                name="username"
                required
              />
            </Field>
            <Field>
              <FieldLabel>Correo electrónico</FieldLabel>
              <FieldControl
                type="email"
                placeholder="juan@empresa.com"
                name="email"
                required
              />
            </Field>
            <Field>
              <FieldLabel>Contraseña</FieldLabel>
              <FieldControl
                type="password"
                placeholder="***********"
                name="password"
                required
              />
            </Field>
            <Field>
              <FieldLabel>Confirmar contraseña</FieldLabel>
              <FieldControl
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
            Crear Cuenta
          </Button>
          <p className="text-xs text-zinc-500 text-center">
            Tu cuenta requiere aprobación del administrador.
          </p>
          <p className="text-sm text-center">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="underline underline-offset-2">
              Iniciar sesión
            </Link>
          </p>
        </CardFooter>
      </Form>
    </Card>
  );
}
