import { Check, Stars } from "lucide-react";

export const Teams = () => {
    return (
      <section className="bg-slate-50/50 py-24 px-36">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Main Proposition & Grid */}
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
              <div className="mb-8">
                <div className="mb-4 inline-block rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-slate-500">
                  Why Teams Choose It
                </div>
                <h2 className="mb-6 text-3xl md:text-4xl font-bold leading-tight text-slate-900">
                  Clinical precision without the spreadsheet sprawl.
                </h2>
                <p className="text-lg leading-relaxed text-slate-600">
                  NutriCommand is built to feel exact, calm and operational. Every screen is designed to reduce ambiguity, preserve patient context, and help nutrition professionals make decisions faster while keeping documentation clean.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="mb-3 text-xs font-bold tracking-widest uppercase text-slate-400">Precision</div>
                  <p className="text-xs leading-relaxed text-slate-600">Standardize calculations and exchange planning so your clinical logic remains consistent across patients.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="mb-3 text-xs font-bold tracking-widest uppercase text-slate-400">Speed</div>
                  <p className="text-xs leading-relaxed text-slate-600">Shorten the path from assessment to prescription without sacrificing rigor or record quality.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="mb-3 text-xs font-bold tracking-widest uppercase text-slate-400">Continuity</div>
                  <p className="text-xs leading-relaxed text-slate-600">Keep patient history and plan changes connected so follow-up decisions are always informed.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="mb-3 text-xs font-bold tracking-widest uppercase text-slate-400">Clarity</div>
                  <p className="text-xs leading-relaxed text-slate-600">Use a dashboard that feels calm and structured in front of patients, even in dense clinical sessions.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Benefit Stacks */}
            <div className="flex flex-col gap-4">
              {/* Stack Item 1 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <div className="mb-3 text-xs font-bold tracking-widest uppercase text-slate-400">Comanda superioridad</div>
                <h3 className="mb-4 text-2lg md:text-2xl font-bold text-slate-900">Una sola aplicación</h3>
                <p className="text-slate-600">Diseñado para que los intercambios dietéticos, las medidas, cálculos y registros funcionen de forma integrada, en lugar de estar dispersos en herramientas separadas.</p>
              </div>

              {/* Stack Item 2 */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                <div className="mb-4 text-xs font-bold tracking-widest uppercase text-slate-400">Hecho para tu uso diario</div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-700">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                    <span>Sirve para evaluaciones iniciales y seguimientos periódicos.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                    <span>Permite elaborar una documentación clínica más sólida.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                    <span> Combina una interfaz intuitiva con un workflow profesional.</span>
                  </li>
                </ul>
              </div>

              {/* Stack Item 3 */}
              <div className="rounded-3xl border border-green-200 bg-[#EAFBF5] p-8">
                 <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                      <Stars className="w-8 h-8"></Stars>
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg font-bold text-slate-900">Diseñado para ofrecer precisión y comodidad</h4>
                      <p className="text-sm text-slate-600">Una interfaz de alta gama y tonos claros que transmite confianza en entornos clínicos sin ruido visual.</p>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
};