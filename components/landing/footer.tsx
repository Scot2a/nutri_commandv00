import { Apple, ArrowRight } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="border-t border-slate-200 bg-white py-12">
        <div className="container mx-auto px-6 md:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           {/* Brand Column */}
           <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-lg">
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
            </nav>
            </div>
        </footer>
    )
}   

