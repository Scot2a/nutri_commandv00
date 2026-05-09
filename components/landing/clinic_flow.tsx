export const Wflow = () => {
    return (
        <section className="py-24 px-36 bg-white">
            <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column */}
            <div className="flex flex-col justify-center">
              <div className="mb-8 inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold tracking-widest uppercase text-slate-500">
                Flujo Operativo Clínico
              </div>
              
              <h2 className="mb-8 text-4xl font-bold leading-tight text-slate-900">
               Un flujo de trabajo que inicia con la evaluación y culmina en un plan nutricional accionable.
              </h2>
              
              <p className="mb-10 text-lg leading-relaxed text-slate-600">
                Recorre toda la consulta en una sola secuencia: recopila el contexto del paciente, calcula valores relevantes, evalúa mediciones, genera recomendaciones basadas en el sistema de equivalentes y documenta cada decisión en la historia clínica.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <div className="mb-2 text-3xl font-bold text-slate-900">1 source</div>
                    <p className="text-sm text-slate-600">for patient data, calculations and plan logic</p>
                 </div>
                 <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <div className="mb-2 text-3xl font-bold text-slate-900">Less friction</div>
                    <p className="text-sm text-slate-600">between evaluation, notes and prescription</p>
                 </div>
              </div>
            </div>

            {/* Right Column: Steps */}
            <div className="relative">
              <div className="absolute -left-4 -top-4 -z-10 h-full w-full rounded-[2rem] bg-slate-50 transform rotate-1"></div>
              
              <div className="flex flex-col gap-4">
                {[
                  { num: "01", title: "Inicia desde la historia clínica:", desc: "Parte de los registros previos para preservar el contexto, identificar restricciones y rastrear intervenciones anteriores." },
                  { num: "02", title: "Realiza cálculos con toda confianza:", desc: "Revisa el IMC, metas de macronutrientes y consideraciones de micronutrientes dentro del mismo perfil, reduciendo el trabajo manual repetitivo." },
                  { num: "03", title: "Evalúa la composición corporal y su evolución:", desc: "Integra mediciones antropométricas y análisis de somatotipo para profundizar en la interpretación y respaldar recomendaciones individualizadas." },
                  { num: "04", title: "Diseña y perfecciona un sistema de equivalentes:", desc: "Utiliza el motor de equivalentes para transformar tus metas en estructuras de comidas prácticas, más fáciles de implementar y ajustar con el tiempo." },
                  { num: "05", title: "Documenta y da continuidad a la atención:", desc: "Registra decisiones, resultados y acciones de seguimiento para que cada consulta inicie con total continuidad clínica." },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-50 font-bold text-lg text-pink-900">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg font-bold text-slate-900">{step.title}</h4>
                      <p className="text-sm leading-relaxed text-slate-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
        </section>
    )
}