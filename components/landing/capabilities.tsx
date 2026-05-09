import { Apple, Calculator, FolderHeart, RulerDimensionLine, ClipboardListIcon, ChartScatter } from "lucide-react";

export const Capabilities = () => {
    return (
        <section className="py-24 bg-green-400/10">
            <div className="container mx-auto px-6 md:px-8 max-w-6xl">
                <header className="mx-auto max-w-2xl text-center mb-16">
                    <p className="mb-6 inline-block rounded-full bg-slate-50 px-4 py-1.5 text-xs font-bold tracking-widest uppercase
                    text-slate-500 border border-slate-200">
                    Funcionalidades clave de la interfaz
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                    Todo lo que exige el protocolo de nutrición clínica, reunido en un único panel de control.
                    </h2>
                    <p className=" text-lg text-slate-600">
                    NutriCommand reduce de forma drástica la fricción entre la evaluación, el cálculo, la planificación y el seguimiento nutricional de tus pacientes,
                    ahorrando tiempo y logrando que cada consulta sea rápida, coherente y clínicamente justificada.
                    </p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="group rounded-2xl border border-bg-slate-100 bg-slate-50 p-6 shadow-sm transition-all hover:shadow-md hover:bg-white hover:border-slate-200">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-2xl shadow-sm">
                        <Apple className="h-8 w-8 bg"></Apple>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">
                        Sistema de intercambio de alimentos
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                        El núcleo de la aplicación. Elabora planes nutricionales utilizando una lógica de equivalencias que resulta práctica
                         para los pacientes y precisa para los profesionales, con funciones integradas de distribución de comidas y ajustes rápidos.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Asignación de intercambios por comida
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Recalibración rápida sin calcular todo manualmente
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Estructura clara y accesible para el paciente, que facilita el cumplimiento
                            </li>
                        </ul>
                    </div>
                    <div className="group rounded-2xl border border-bg-slate-100 bg-slate-50 p-6 shadow-sm transition-all hover:shadow-md hover:bg-white hover:border-slate-200">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-2xl shadow-sm">
                        <Calculator className="h-8 w-8 bg"></Calculator>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">
                        BMI, micros y macros
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                        Realiza cálculos básicos de forma rápida y sistemática, desde la evaluación del IMC hasta los objetivos
                         de macronutrientes y el análisis de micronutrientes, sin interrumpir el ritmo de la consulta.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Asignación de intercambios por comida
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Recalibración rápida sin calcular todo manualmente
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Estructura clara y accesible para el paciente, que facilita el cumplimiento
                            </li>
                        </ul>
                    </div>
                    <div className="group rounded-2xl border border-bg-slate-100 bg-slate-50 p-6 shadow-sm transition-all hover:shadow-md hover:bg-white hover:border-slate-200">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-2xl shadow-sm">
                        <FolderHeart className="h-8 w-8 bg"></FolderHeart>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">
                        Historial y expediente clínico del paciente
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                        Crea una visión longitudinal completa de cada paciente, integrando consultas, 
                        evolución, notas, contexto e intervenciones en un único expediente clínico coherente.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Asignación de intercambios por comida
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Recalibración rápida sin calcular todo manualmente
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Estructura clara y accesible para el paciente, que facilita el cumplimiento
                            </li>
                        </ul>
                    </div>
                    <div className="group rounded-2xl border border-bg-slate-100 bg-slate-50 p-6 shadow-sm transition-all hover:shadow-md hover:bg-white hover:border-slate-200">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-2xl shadow-sm">
                        <RulerDimensionLine className="h-8 w-8 bg"></RulerDimensionLine>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">
                        Sistema de intercambio de alimentos
                        </h3>
                        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                        El núcleo de la aplicación. Elabora planes nutricionales utilizando una lógica de intercambio que resulta práctica
                         para los pacientes y precisa para los profesionales, con funciones integradas de distribución de comidas y ajustes rápidos.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Asignación de intercambios por comida
                            </li>
                                                        <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Recalibración rápida sin calcular todo manualmente
                            </li>
                                                        <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Estructura clara y accesible para el paciente, que facilita el cumplimiento
                            </li>
                        </ul>
                    </div>
                    <div className="group rounded-2xl border border-bg-slate-100 bg-slate-50 p-6 shadow-sm transition-all hover:shadow-md hover:bg-white hover:border-slate-200">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-2xl shadow-sm">
                        <ChartScatter className="h-8 w-8 bg"></ChartScatter>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">
                        Sistema de intercambio de alimentos
                        </h3>
                        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                        El núcleo de la aplicación. Elabora planes nutricionales utilizando una lógica de intercambio que resulta práctica
                         para los pacientes y precisa para los profesionales, con funciones integradas de distribución de comidas y ajustes rápidos.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Asignación de intercambios por comida
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Recalibración rápida sin calcular todo manualmente
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Estructura clara y accesible para el paciente, que facilita el cumplimiento
                            </li>
                        </ul>
                    </div>
                    <div className="group rounded-2xl border border-bg-slate-100 bg-slate-50 p-6 shadow-sm transition-all hover:shadow-md hover:bg-white hover:border-slate-200">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-2xl shadow-sm">
                        <ClipboardListIcon className="h-8 w-8 bg"></ClipboardListIcon>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">
                        Sistema de intercambio de alimentos
                        </h3>
                        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                        El núcleo de la aplicación. Elabora planes nutricionales utilizando una lógica de intercambio que resulta práctica
                         para los pacientes y precisa para los profesionales, con funciones integradas de distribución de comidas y ajustes rápidos.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Asignación de intercambios por comida
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Recalibración rápida sin calcular todo manualmente
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-700">
                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-b-full bg-primary">
                                </span>
                                Estructura clara y accesible para el paciente, que facilita el cumplimiento
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}