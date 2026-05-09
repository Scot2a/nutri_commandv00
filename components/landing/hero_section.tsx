import { Scale, Calculator, FileHeart, Ruler, ArrowUpRight, LayoutDashboard, PenBox, History, HeartPulse } from "lucide-react";
import { DashboardPreview } from "@/components/landing/hero_dashboard";


export const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-slate-50 pt-14 pb-24 lg:pt-20 lg:pb-22">
            <div className="container mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/*left content */}
                <div className="flex flex-col space-y-8">
                    <div className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-slate-500 shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-primary/85">
                        </span>
                        Precisión clínica para la nutrición moderna.
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-slate-900">
                        Un panel de control hecho para nutricionistas que requieren un sistema preciso de equivalencias alimentarias y
                        trazabilidad clínica.
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                    Centralice el sistema de equivalencias alimenticias, el IMC, los cálculos de macronutrientes y micronutrientes, 
                    las mediciones antropométricas, el análisis del somatotipo, el historial del paciente y los registros clínicos en
                    un flujo de trabajo optimizado, diseñado para tomar decisiones rápidas y basadas en la evidencia. 
                    Todo en tiempo record y sin complicaciones.
                    </p>
                    {/*features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                            <Scale className="w-8 h-8"></Scale>
                            Sistema de intercambio de alimentos.
                        </div>
                        <div className=" text-sm text-muted p-1 ml-6">Convierta prescripciones en interacciones prácticas, de forma estructurada y ágil.</div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                            <FileHeart className=" w-8 h-8"></FileHeart>
                            Historia clínica sin complicaciones.
                        </div>
                        <div className=" text-sm text-muted p-1 ml-6">Registre la evolución de cada paciente, las consultas y el contexto de salud pertinente en un historial clínico unificado.</div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                            <Calculator className="w-8 h-8"></Calculator>
                            Cálculo de BMI, Macros & Micros.
                        </div>
                        <div className="text-sm text-muted p-1 ml-6">Automatice los cálculos nutricionales con una lógica precisa, comprobada y reproducible.</div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                            <Ruler className="w-8 h-8"></Ruler>
                            Cálculo del somatotipo y antropometría.
                        </div>
                        <div className="text-sm text-muted p-1 ml-6">Evalúe los patrones y la evolución de la composición corporal con precisión clínica.</div>
                    </div>
                </div>
                {/*CTAS */}
                <div className="flex flex-wrap gap-4 pt-4">
                    <button className="group flex h-11 items-center justify-center gap-2 rounded-full bg-slate-900 px-8 font-bold text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                        Agenda una demo guiada.
                        <ArrowUpRight className="w-8 h-8 transition-transform group-hover:translate-x-1"></ArrowUpRight>
                    </button>
                    <button className="flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                        Explora todos los módulos.
                        <LayoutDashboard className="w-8 h-8"></LayoutDashboard>
                    </button>
                </div>
                {/*bottom hero */}
                <div className="flex items-center gap-3 text-sm text-slate-500 pt-1">
                    <div className="flex items-center gap-2">
                        <div className=" flex h-2 w-2 rounded-full bg-primary/85"></div>
                    Diseñado para consultas privadas y el seguimiento de múltiples pacientes.
                    </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <div className=" flex h-2 w-2 rounded-full bg-accent/45"></div>
                    Garantiza una lógica de cálculo uniforme y la continuidad de los registros.
                    </div>
                </div>
            </div>
                {/* RIGHT-S */}
            <div className="relative flex items-center justify-center">
                <DashboardPreview />
            </div>
        </div>
        {/*footer-trustbar */}        
        </div>
        <section className="py-3 mt-5 bg-white border-y border-slate-100">
            <div className="container mx-auto px-6 md:px-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                {/* Left Side: The Label */}
                <div className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 shrink-0">
                    Diseñado para un Workflow nutricional preciso
                </div>
                {/* Right Side: The Features List */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <PenBox className="w-4 h-4 text-slate-400"></PenBox>
                        <span>Consultas estructuradas</span>
                    </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <Calculator className="w-4 h-4 text-slate-400" />
                    <span>Cálculos confiables</span>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <History className="w-4 h-4 text-slate-400" />
                    <span>Historia longitudinal</span>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <HeartPulse className="w-4 h-4 text-slate-400" />
                    <span>Monitoreo de nivel clínico</span>
                </div>
            </div>
            </div>
                </div>
        </section>
    </section>
    )
}