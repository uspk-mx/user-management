"use client";
import { AlertError } from "@/components/alert-error";
import { Button } from "@/components/ui/button";
import { Field, FieldControl, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import {
  UpdateUserPasswordDocument,
  UpdateUserProfileDocument,
} from "@/graphql/gql/graphql";
import { getInitials } from "@/lib/utils";
import { GraphQLError } from "graphql";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "urql";

interface ProfileClientProps {
  userId: string;
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
}

export default function ProfileClient({
  fullName,
  userName,
  email,
  phoneNumber,
}: ProfileClientProps) {
  const router = useRouter();
  const [, updateProfile] = useMutation(UpdateUserProfileDocument);
  const [, updatePassword] = useMutation(UpdateUserPasswordDocument);

  const [profileErrors, setProfileErrors] = useState<GraphQLError[]>([]);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<GraphQLError[]>([]);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(
    null
  );

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileSuccess(false);
    setProfileErrors([]);
    const formData = new FormData(e.currentTarget);
    const response = await updateProfile({
      input: {
        fullName: formData.get("fullName")?.toString(),
        userName: formData.get("userName")?.toString(),
        phoneNumber: formData.get("phoneNumber")?.toString(),
      },
    });
    if (response.error?.graphQLErrors.length) {
      setProfileErrors(response.error.graphQLErrors);
      return;
    }
    setProfileSuccess(true);
    router.refresh();
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordSuccess(false);
    setPasswordErrors([]);
    setPasswordMatchError(null);
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword")?.toString() ?? "";
    const newPassword = formData.get("newPassword")?.toString() ?? "";
    const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

    if (newPassword !== confirmPassword) {
      setPasswordMatchError("Las contraseñas nuevas no coinciden.");
      return;
    }

    const response = await updatePassword({
      input: { currentPassword, newPassword },
    });
    if (response.error?.graphQLErrors.length) {
      setPasswordErrors(response.error.graphQLErrors);
      return;
    }
    setPasswordSuccess(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Mi Perfil
        </h1>
        <p className="text-sm text-zinc-500">
          Actualiza tu información personal y contraseña.
        </p>
      </div>

      {/* Avatar + name */}
      <div className="flex items-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-full bg-zinc-200 text-xl font-semibold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
          {getInitials(fullName)}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-zinc-900 dark:text-white">
            {fullName}
          </span>
          <span className="text-sm text-zinc-500">{email}</span>
        </div>
      </div>

      {/* Profile info */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-base font-semibold text-zinc-900 dark:text-white">
          Información personal
        </h2>
        <Form onSubmit={handleProfileSubmit}>
          <div className="flex flex-col gap-4">
            {profileErrors.map((e) => (
              <AlertError
                key={e.message}
                title="Error"
                description={e.message}
              />
            ))}
            {profileSuccess && (
              <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                Perfil actualizado correctamente.
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Nombre completo</FieldLabel>
                <FieldControl
                  type="text"
                  name="fullName"
                  defaultValue={fullName}
                />
              </Field>
              <Field>
                <FieldLabel>Usuario</FieldLabel>
                <FieldControl
                  type="text"
                  name="userName"
                  defaultValue={userName}
                />
              </Field>
              <Field>
                <FieldLabel>Correo electrónico</FieldLabel>
                <FieldControl
                  type="email"
                  name="email"
                  defaultValue={email}
                  disabled
                  className="opacity-60"
                />
              </Field>
              <Field>
                <FieldLabel>Teléfono</FieldLabel>
                <FieldControl
                  type="tel"
                  name="phoneNumber"
                  defaultValue={phoneNumber}
                  placeholder="+52 55 1234 5678"
                />
              </Field>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Guardar cambios</Button>
            </div>
          </div>
        </Form>
      </div>

      {/* Change password */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-base font-semibold text-zinc-900 dark:text-white">
          Cambiar contraseña
        </h2>
        <Form onSubmit={handlePasswordSubmit}>
          <div className="flex flex-col gap-4">
            {passwordErrors.map((e) => (
              <AlertError
                key={e.message}
                title="Error"
                description={e.message}
              />
            ))}
            {passwordMatchError && (
              <AlertError title="Error" description={passwordMatchError} />
            )}
            {passwordSuccess && (
              <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                Contraseña actualizada correctamente.
              </div>
            )}
            <Field>
              <FieldLabel>Contraseña actual</FieldLabel>
              <FieldControl
                type="password"
                name="currentPassword"
                required
                placeholder="***********"
              />
            </Field>
            <Field>
              <FieldLabel>Nueva contraseña</FieldLabel>
              <FieldControl
                type="password"
                name="newPassword"
                required
                placeholder="***********"
              />
            </Field>
            <Field>
              <FieldLabel>Confirmar nueva contraseña</FieldLabel>
              <FieldControl
                type="password"
                name="confirmPassword"
                required
                placeholder="***********"
              />
            </Field>
            <div className="flex justify-end">
              <Button type="submit">Actualizar contraseña</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
