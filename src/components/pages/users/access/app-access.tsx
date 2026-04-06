import { PageHeader } from '@/components/custom-components/page-header'
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card"

export const AppAccess = () => {
  return (
    <>
      <PageHeader
        title="Administracion de accesos"
        //   actions={<CreateUserModal triggerLabel="Modificar usuario" />}
        hasBackButton={true}
        backButtonHref="/users"
        actions={<Button>Nuevo Accesso</Button>}
      />

      <div className="flex flex-col w-full items-start gap-6 mt-6">
        <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
          Acceso Directo
        </h1>
        <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardDescription>Description</CardDescription>
            </CardHeader>
            <CardPanel>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Granted:</span>
                  <span>Oct 1, 2025</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold">Granted by:</span>
                  <span> admin@company.com</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold">Expires:</span>
                  <span>Never</span>
                </div>
              </div>
            </CardPanel>
            <CardFooter className="justify-end gap-2">
              <Button>Editar</Button>
              <Button variant="outline">Revocar acceso</Button>
            </CardFooter>
          </Card>
        </div>

        <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
          Acceso Basado en Rol (4)
        </h1>
        <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardDescription>Description</CardDescription>
            </CardHeader>
            <CardPanel>Content</CardPanel>
            <CardFooter>Footer</CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardDescription>Description</CardDescription>
            </CardHeader>
            <CardPanel>Content</CardPanel>
            <CardFooter>Footer</CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardDescription>Description</CardDescription>
            </CardHeader>
            <CardPanel>Content</CardPanel>
            <CardFooter>Footer</CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
