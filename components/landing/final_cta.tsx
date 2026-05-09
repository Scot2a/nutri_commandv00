import { ArrowRight, Plus } from "lucide-react"

export const Fcta = () => {
    return (
        <section className="py-24 px-32 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-slate-50 to-[#f0fdf4] p-10 md:p-16 text-center border border-slate-200">
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-8 inline-block rounded-full border border-slate-200 bg-white px-6 py-2 text-xs font-bold tracking-widest uppercase text-slate-500 shadow-sm">
                See NutriCommand in Action
              </div>
              
              <h2 className="mb-6 max-w-3xl text-3xl md:text-4xl font-bold leading-tight text-slate-900">
                Haz una simulación completa: desde la introducción del paciente a la planificación alimenticia.
              </h2>
              
              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-600">
                Agenda una demo para explorar el panel de control, explorar un mejor manejo de dietas, y ver como los cálculos, la  antropometría, somatotipos e historia clínica trabajan juntos en una misma plataforma.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group flex h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-8 font-bold text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                  Agenda tu demo
                  <ArrowRight className="transition-transform group-hover:translate-x-1 w-8 h-8" />
                </button>
                <button className="flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                  Explora todos los módulos
                  <Plus className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}