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
import { LoginDocument, LoginMutationVariables } from "@/graphql/gql/graphql";
import { GraphQLError } from "graphql";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useMutation } from "urql";
import { AlertError } from "./alert-error";
import { PasswordInput } from "@uspk/components"

export default function LoginForm() {
  const [, loginMutation] = useMutation(LoginDocument);
  const [serverErrors, setServerErrors] = useState<GraphQLError[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParams = searchParams.get("from");
  const registered = searchParams.get("registered");

  const handleLogin = async (variables: LoginMutationVariables) => {
    const response = await loginMutation(variables);
    const hasErrors = response.error?.graphQLErrors.length;
    if (hasErrors) {
      setServerErrors(response.error?.graphQLErrors || []);
      return;
    }
    const result = response.data?.login;

    if (result) {
      // If there's an explicit redirect destination, honour it
      if (fromParams && fromParams !== "/") {
        router.push(fromParams);
        router.refresh();
        return;
      }

      // Role-based routing: admin → admin dashboard, everyone else → user portal
      const isAdmin = result.role?.toLowerCase() === "admin";
      router.push(isAdmin ? "/" : "/portal");
      router.refresh();
    }
  };

  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Bienvenido de Regreso</CardTitle>
        <CardDescription>Inicia sesión con tus credenciales.</CardDescription>
      </CardHeader>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const email = formData.get("email")?.toString();
          const password = formData.get("password")?.toString();
          handleLogin({ input: { email, password: password ?? "" } });
        }}
      >
        {registered && (
          <div className="px-4">
            <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
              Cuenta creada. Inicia sesión cuando sea aprobada.
            </div>
          </div>
        )}
        {serverErrors.map((item) => (
          <div className="px-4" key={item.source?.body}>
            <AlertError
              title="Ocurrió un error"
              description={item.originalError?.message}
            />
          </div>
        ))}
        <CardPanel>
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Correo electrónico</FieldLabel>
              <FieldControl
                type="text"
                placeholder="hell@email.com"
                name="email"
              />
            </Field>
            <Field>
              <FieldLabel>Contraseña</FieldLabel>
              <PasswordInput
                type="password"
                placeholder="•••••••••••"
                name="password"
              />
            </Field>
          </div>
        </CardPanel>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" type="submit">
            Iniciar Sesión
          </Button>
          <Link
            href="/forgot-password"
            className="text-sm text-center underline underline-offset-2 text-zinc-500"
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <p className="text-sm text-center">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="underline underline-offset-2">
              Registrarse
            </Link>
          </p>
        </CardFooter>
      </Form>
    </Card>
  );
}
