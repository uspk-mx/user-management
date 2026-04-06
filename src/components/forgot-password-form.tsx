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
import { ResetPasswordDocument } from "@/graphql/gql/graphql";
import { GraphQLError } from "graphql";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "urql";
import { AlertError } from "./alert-error";

export default function ForgotPasswordForm() {
  const [, resetMutation] = useMutation(ResetPasswordDocument);
  const [serverErrors, setServerErrors] = useState<GraphQLError[]>([]);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email")?.toString() ?? "";
    const response = await resetMutation({ email });

    if (response.error?.graphQLErrors.length) {
      setServerErrors(response.error.graphQLErrors);
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <Card className="w-full max-w-xs">
        <CardHeader>
          <CardTitle>Correo enviado</CardTitle>
          <CardDescription>
            Revisa tu bandeja de entrada y sigue las instrucciones para
            restablecer tu contraseña.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full">
              Volver al inicio de sesión
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Olvidé mi contraseña</CardTitle>
        <CardDescription>
          Ingresa tu correo y te enviaremos un enlace para restablecer tu
          contraseña.
        </CardDescription>
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
        <CardPanel>
          <Field>
            <FieldLabel>Correo electrónico</FieldLabel>
            <FieldControl
              type="email"
              placeholder="juan@empresa.com"
              name="email"
              required
            />
          </Field>
        </CardPanel>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" type="submit">
            Enviar enlace
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
