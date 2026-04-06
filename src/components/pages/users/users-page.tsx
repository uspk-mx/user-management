import { PageHeader } from "@/components/custom-components/page-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldControl, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { UsersTable, UsersTableProps } from "@/components/users-table";

type UsersPageProps = UsersTableProps;

export function UsersPage(props: UsersPageProps) {
  return (
    <>
      <PageHeader
        title="Usuarios"
        actions={<CreateUserModal triggerLabel="Registrar usuario" />}
      />
      <UsersTable {...props} />
    </>
  );
}

function CreateUserModal({ triggerLabel }: { triggerLabel: string }) {
  return (
    <Dialog>
      <DialogTrigger render={<Button type="button" />}>
        {triggerLabel}
      </DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <Form>
          <DialogHeader>
            <DialogTitle>Agregar Usuario</DialogTitle>
            <DialogDescription>
              Agrega los datos del usuario para crear una nueva cuenta. Por
              favor, asegúrate de proporcionar toda la información necesaria.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Nombre Completo</FieldLabel>
              <FieldControl
                type="text"
                name="fullName"
                defaultValue="George G."
              />
            </Field>
            <Field>
              <FieldLabel>Usuario</FieldLabel>
              <FieldControl
                type="text"
                name="userName"
                defaultValue="george_g"
              />
            </Field>
            <Field>
              <FieldLabel>Correo Electronico</FieldLabel>
              <FieldControl
                type="email"
                name="emailAddress"
                defaultValue="email@email.com"
              />
            </Field>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>
              Cancelar
            </DialogClose>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
