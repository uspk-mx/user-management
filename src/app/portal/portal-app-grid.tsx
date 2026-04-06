"use client";
import { MyAppsQuery } from "@/graphql/gql/graphql";
import { IconExternalLink, IconSailboat2 } from "@tabler/icons-react";

type App = MyAppsQuery["myApps"][number];

interface PortalAppGridProps {
  apps: App[];
}

const APP_EMOJI_FALLBACK = "📦";

function getAppEmoji(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("mail") || n.includes("email") || n.includes("correo"))
    return "📧";
  if (n.includes("slack") || n.includes("chat") || n.includes("mensaje"))
    return "💬";
  if (n.includes("drive") || n.includes("storage") || n.includes("archivo"))
    return "📁";
  if (n.includes("jira") || n.includes("project") || n.includes("proyecto"))
    return "🔧";
  if (n.includes("design") || n.includes("figma") || n.includes("diseño"))
    return "🎨";
  if (n.includes("analytic") || n.includes("report") || n.includes("reporte"))
    return "📊";
  if (n.includes("sales") || n.includes("venta")) return "📈";
  if (n.includes("crm")) return "🤝";
  if (n.includes("hr") || n.includes("people") || n.includes("rrhh"))
    return "👥";
  return APP_EMOJI_FALLBACK;
}

export default function PortalAppGrid({ apps }: PortalAppGridProps) {
  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="text-4xl">
          <IconSailboat2 />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium text-zinc-700 dark:text-zinc-300">
            Aún no tienes aplicaciones asignadas
          </p>
          <p className="text-sm text-zinc-500">
            Contacta a tu administrador para solicitar acceso.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {apps.map((app) => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  );
}

function AppCard({ app }: { app: App }) {
  const handleLaunch = () => {
    if (app.url) {
      window.open(app.url, "_blank", "noopener,noreferrer");
    }
  };

  const emoji = app.icon ?? getAppEmoji(app.name);

  return (
    <button
      onClick={handleLaunch}
      disabled={!app.url || !app.isActive}
      className="group relative flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 text-left shadow-sm transition-all hover:border-zinc-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      {/* Icon */}
      <div className="flex size-12 items-center justify-center rounded-xl bg-zinc-100 text-2xl dark:bg-zinc-800">
        {emoji}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
          {app.name}
        </span>
        {app.description && (
          <span className="line-clamp-2 text-xs text-zinc-500">
            {app.description}
          </span>
        )}
      </div>

      {/* Launch icon */}
      {app.url && app.isActive && (
        <IconExternalLink className="absolute right-3 top-3 size-4 text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-600" />
      )}

      {!app.isActive && (
        <span className="absolute right-2 top-2 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-400 dark:bg-zinc-800">
          Inactivo
        </span>
      )}
    </button>
  );
}
