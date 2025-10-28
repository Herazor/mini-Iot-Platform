// src/pages/template/TemplateLayout.jsx
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getTemplateById } from "../../data/templates";

const nav = [
  { to: "", label: "Home" },
  { to: "datastreams", label: "Datastreams" },
  { to: "web-dashboard", label: "Web Dashboard" },
  // tambah: "data-converters", "automation-templates", "metadata", ...
];

export default function TemplateLayout() {
  const { templateId } = useParams();
  const t = getTemplateById(templateId);

  if (!t) return <div className="p-6">Template not found.</div>;

  return (
    <div className="p-6">
      {/* Header kecil */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-emerald-100" />
        <div>
          <h2 className="text-xl font-semibold">{t.name}</h2>
          <p className="text-xs text-gray-500">{t.board}, {t.network}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="px-3 py-1.5 rounded-md border">Edit</button>
        </div>
      </div>

      {/* 2 kolom */}
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar sekunder */}
        <aside className="col-span-12 md:col-span-3">
          <nav className="rounded-2xl border bg-white p-2">
            {nav.map(n => (
              <NavLink
                key={n.label}
                end={n.to === ""}
                to={n.to}
                className={({isActive}) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-gray-100 ${
                    isActive ? "bg-gray-100 font-semibold" : ""
                  }`
                }
              >
                <span>{n.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Konten + panel kanan */}
        <main className="col-span-12 md:col-span-9">
          <div className="grid grid-cols-12 gap-6">
            <section className="col-span-12 lg:col-span-8">
              <div className="rounded-2xl border bg-white p-5">
                <Outlet context={{ template: t }} />
              </div>
            </section>
            <aside className="col-span-12 lg:col-span-4">
              <RightPanel template={t} />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function RightPanel({ template }) {
  return (
    <div className="rounded-2xl border bg-white p-5 space-y-4">
      <div>
        <h3 className="font-semibold mb-1">Template settings</h3>
        <p className="text-sm text-gray-500">{template.board}, {template.network}</p>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Firmware configuration</h3>
        <p className="text-xs text-gray-500 mb-2">
          Template ID and Template Name should be declared at the very top of the firmware code.
        </p>
        <pre className="rounded-lg bg-gray-900 text-green-200 text-xs p-3 overflow-auto">
{`#define BLYNK_TEMPLATE_ID "${template.id.toUpperCase()}"
#define BLYNK_TEMPLATE_NAME "${template.name}"`}
        </pre>
      </div>
    </div>
  );
}
