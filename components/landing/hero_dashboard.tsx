import { User, Activity } from "lucide-react";

export const DashboardPreview = () => {
  return (
    <div className="relative w-full max-w-lg">

      {/* Glow */}
      <div className="absolute -inset-8 bg-linear-to-tr from-primary/20 via-transparent to-accent/20 blur-2xl opacity-60" />

      {/* GRID BACKGROUND CONTAINER */}
      <div
        className="relative rounded-2xl border border-slate-200 bg-[#f8fafc] p-4 shadow-xl"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >

        {/* TOP HEADER */}
        <div className="flex items-center justify-between rounded-xl border bg-white px-4 py-3 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Panel de control clínico
            </p>
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              WORKFLOW DE PACIENTES ACTIVO
            </p>
          </div>

          <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
            PRECISIÓN EN TIEMPO REAL
          </span>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-3 gap-3 mt-3">

          {/* LEFT BIG CARD */}
          <div className="col-span-2 rounded-xl border bg-white p-4 shadow-sm space-y-4">

            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase text-slate-400 tracking-wide">
                  Motor de intercambio de alimentos
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  Distribución del día
                </p>
              </div>

              <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-rose-100 text-rose-600">
                CORE FLOW
              </span>
            </div>

            {/* Items */}
            <div className="space-y-2">
              {[
                { label: "Intercambios de Carbohidratos", value: "8 unidades", color: "bg-green-400" },
                { label: "Intercambios de proteina", value: "6 unidades", color: "bg-amber-400" },
                { label: "Intercambios de lípidos", value: "4 unidades", color: "bg-rose-400" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border px-3 py-2"
                >
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className={`h-2 w-2 rounded-full ${item.color}`} />
                    {item.label}
                  </div>
                  <span className="text-sm font-medium text-slate-800">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[
                { label: "BMI", value: "21.7" },
                { label: "Macros", value: "40/30/30" },
                { label: "Micros", value: "96%" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-2 text-center"
                >
                  <p className="text-[10px] uppercase text-slate-400">
                    {m.label}
                  </p>
                  <p className="text-sm font-semibold text-slate-800">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-3">

            {/* Patient History */}
            <div className="rounded-xl border bg-white p-3 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <User className="w-4 h-4" />
                Historia del paciente
              </div>

              <div className="rounded-lg border p-2 text-xs text-slate-500">
                Evolución del peso actualizada y vinculada al plan actual.
              </div>

              <div className="rounded-lg border p-2 text-xs text-slate-500">
                Marcadores bioquímicos evaluados en historia clínica.
              </div>
            </div>

            {/* Somatotype */}
            <div className="rounded-xl border bg-white p-3 shadow-sm space-y-2">
              <p className="text-[10px] uppercase text-slate-400">
                Calculadora de somatotipo
              </p>
              <p className="text-sm font-semibold text-slate-800">
                3.1 · 4.8 · 2.4
              </p>
              <p className="text-xs text-slate-500">
                Integración con medidas antropométricas
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER BAR */}
        <div className="mt-3 rounded-xl border bg-white px-4 py-3 shadow-sm flex items-center gap-2 text-xs text-slate-600">
          <Activity className="w-4 h-4 text-primary" />
          <span className="font-medium text-slate-700">
            Homogeneidad clínica:
          </span>
          <span className="text-slate-500">
            De medición a prescripción en un único proceso.
          </span>
        </div>
      </div>
    </div>
  );
};