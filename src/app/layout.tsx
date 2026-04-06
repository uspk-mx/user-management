import { getProfile } from "@/lib/services/users";
import { ThemeProvider } from "@/providers/theme-provider";
import { UrqlProvider } from "@/providers/urql";
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { PageLayout } from "@/components/custom-components/page-layout";
import { getApps } from "@/lib/services/apps";
import { globalConfig, logos } from "@/lib/config";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: globalConfig.title,
  description: globalConfig.description,
  icons: {
    icon: logos.favicon.icon,
    apple: logos.favicon.appleTouchIcon,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = await getProfile();
  const appsData = await getApps();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UrqlProvider>
            <ToastProvider position="top-center">
              <PageLayout
                userData={{
                  email: userData?.email ?? "",
                  fullName: userData?.fullName ?? "",
                  profilePicture: userData?.profilePicture ?? "",
                  role: userData?.role?.name ?? "",
                }}
                appsData={appsData}
              >
                {children}
              </PageLayout>
            </ToastProvider>
          </UrqlProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
