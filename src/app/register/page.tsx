import RegisterForm from "@/components/register-form";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Image
              src="https://pub-74a58968a0814f12bf1cecf8c23125ee.r2.dev/logos/u-logo-white.png"
              alt="Logo"
              width={50}
              height={50}
              className="object-cover pt-1 w-full"
            />
          </div>
        </a>
        <RegisterForm />
      </div>
    </div>
  );
}
