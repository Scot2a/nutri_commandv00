
import { Apple, ArrowRight } from "lucide-react";
import Link from "next/link";


export const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b background bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-20 items-center justify-between 0.4rem md:0.5rem">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl text-xl">
                        <Apple></Apple>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-bold text-lg text-slate-900">NutriCommand</span>
                        <span className="text-[0.6rem] font-medium tracking-widest text-slate-500 uppercase">Panel de control nutricional</span>
                    </div>
                </div>
            <nav className="hidden md:flex items-center gap-8">
                <a href="#capabilities" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Capacidades</a>
                <a href="#workflow" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Workflow</a>
                <a href="#records" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Historia clínica</a>
                <a href="#demo" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Agenda una demo</a>
            </nav>
            <div className="flex items-center gap-4">
                <Link href={"/login"} className="hidden sm:flex h-12 items-center justify-center rounded-full border gap-2 border-slate-200 bg-white px-8 text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                Ver plataforma
                </Link>
                <Link href={"/dashboard"} className="flex h-12 items-center justify-center rounded-full gap-2 bg-slate-900 px-8 text-sm font-bold text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                    Solicitar demo<ArrowRight className="h-4 w-4"></ArrowRight> 
                </Link>
            </div>
            </div>
        </header>
    )
}   

