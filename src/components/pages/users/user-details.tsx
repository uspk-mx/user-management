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
import { GetUserQuery } from "@/graphql/gql/graphql";

export function UserDetails({
  userData,
}: {
  userData: GetUserQuery["getUser"];
}) {
  return (
    <>
      <PageHeader
        title="Información del usuario"
        actions={<CreateUserModal triggerLabel="Modificar usuario" />}
        hasBackButton={true}
        backButtonHref="/users"
      />
      <div>
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-foreground">
              Nombre completo
            </dt>
            <dd className="mt-1 text-sm/6 text-accent-foreground sm:col-span-2 sm:mt-0">
              {userData?.fullName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-foreground">
              Correo electrónico
            </dt>
            <dd className="mt-1 text-sm/6 text-accent-foreground sm:col-span-2 sm:mt-0">
              {userData?.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-foreground">Creado el</dt>
            <dd className="mt-1 text-sm/6 text-accent-foreground sm:col-span-2 sm:mt-0">
              {new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(
                new Date(userData?.createdAt ?? "")
              )}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-foreground">
              Ultimo inicio de sesion
            </dt>
            <dd className="mt-1 text-sm/6 text-accent-foreground sm:col-span-2 sm:mt-0">
              {userData?.loginHistory && userData?.loginHistory.length > 0
                ? new Intl.DateTimeFormat("es-MX", {
                    dateStyle: "medium",
                  }).format(new Date(userData?.loginHistory[0]?.attemptedAt))
                : "No hay historial de inicio de sesión"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-foreground">Aprobado</dt>
            <dd className="mt-1 text-sm/6 text-accent-foreground sm:col-span-2 sm:mt-0">
              {userData?.approval?.status || "No hay información disponible"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-foreground">
              Verificado
            </dt>
            <dd className="mt-1 text-sm/6 text-accent-foreground sm:col-span-2 sm:mt-0">
              {userData?.isVerified ? "Si" : "No"}
            </dd>
          </div>
          {/*<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-foreground">Attachments</dt>
            <dd className="mt-2 text-sm text-foreground sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      aria-hidden="true"
                      className="size-5 shrink-0 text-gray-400"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium text-foreground">
                        resume_back_end_developer.pdf
                      </span>
                      <span className="shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      aria-hidden="true"
                      className="size-5 shrink-0 text-gray-400"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium text-foreground">
                        coverletter_back_end_developer.pdf
                      </span>
                      <span className="shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>*/}
        </dl>
      </div>
    </>
  );
}

// <Form>
//   <CardPanel>
//     <div className="flex flex-col gap-4">
//       <Field>
//         <FieldLabel>Nombre</FieldLabel>
//         <FieldControl
//           type="text"
//           placeholder="Nombre completo"
//           defaultValue={getUser?.fullName}
//         />
//       </Field>
//       <Field>
//         <FieldLabel>Correo electrónico</FieldLabel>
//         <FieldControl
//           type="email"
//           placeholder="Correo electrónico"
//           defaultValue={getUser?.email}
//         />
//       </Field>
//       <Field>
//         <FieldLabel>Rol</FieldLabel>
//         <Select
//           items={listRoles?.map((item) => {
//             return {
//               value: item?.role?.id,
//               label: item?.role?.name,
//             };
//           })}
//           defaultValue={getUser?.role?.name}
//         >
//           <SelectTrigger>
//             <SelectValue />
//           </SelectTrigger>
//           <SelectPopup>
//             {listRoles.map((item) => (
//               <SelectItem key={item?.role?.id} value={item?.role?.id}>
//                 {item?.role?.name}
//               </SelectItem>
//             ))}
//           </SelectPopup>
//         </Select>
//       </Field>
//     </div>
//   </CardPanel>
//   <CardFooter>
//     <Button className="w-full" type="submit">
//       Deploy
//     </Button>
//   </CardFooter>
// </Form>

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
              <FieldLabel>Name</FieldLabel>
              <FieldControl type="text" defaultValue="Margaret Welsh" />
            </Field>
            <Field>
              <FieldLabel>Username</FieldLabel>
              <FieldControl type="text" defaultValue="@maggie.welsh" />
            </Field>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>
              Cancel
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
