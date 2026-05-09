"use client"

import React from "react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard,
    User,
    Calendar,
    PieChart,
    Settings,
    Bell,
    Search,
    Menu,
    Apple,
    Smartphone,
    Users,
    ChevronLeft,
 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLayoutStore } from "@/src/main_store/use_layout_store";
import { ModeToggle } from "@/components/mode_toggle";

interface NavItem{
    icon: React.ElementType
    label:string
    href: string;
    active?: boolean
    badge?: number
}

const navItems:NavItem[] = [
    {icon: LayoutDashboard, label: "Panel de control", href:"/dashboard" ,active: true},
    {icon: Users,label: "Pacientes", href: "/dashboard/patients", badge: 2},
    {icon: Apple, label: "Plan nutricional", href:"/dashboard/meal-plans"},
    {icon: Calendar, label: "Calendario", href:"/dashboard/schedule"},
    {icon: PieChart, label: "Análisis", href:"/dashboard/analysis"},
    {icon: Smartphone, label: "Test", href:"/dashboard/test"},
]

const bottomItems: NavItem[] = [
    {icon: Bell, label: "Notificaciones", href:"alarms", badge: 3},
    {icon: Settings, label: "Ajustes", href:"/dashboard/config"},
]



export function DashboardSidebar (){
  const pathname = usePathname(); //it lets you read the current URL!! USE IT!

  const isOpen = useLayoutStore((state) => state.isSidebarOpen)
  const toggle = useLayoutStore((state) => state.toggleSidebar)
  const close = useLayoutStore((state) => state.closeSidebar)

return (
    <>
    {/*mobile overlay*/}
    {isOpen && (
        <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
        onClick={close} //for overlay click
        />
    )}

    {/*SIDEBAR*/}

    <aside className={cn (
        "fixed left-0 top-0 z-50 h-full w-60 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        >
        
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-sidebar-border">
            {/*<div className="flex items-center justify-between mb-8"></div>*/}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Apple className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 overflow-hidden">
                <h1 className="font-semibold text-sidebar-foreground">Nutri Command</h1>
                <p className="text-xs text-muted-foreground truncate">Pro Dashboard</p>
              </div>
              <button 
              onClick={toggle}
              className="p-2 hover:bg-secondary rounded-md text-muted-foreground">
                <ChevronLeft className={cn("h-5 w-5 transition-transform", !isOpen && "rotate-180")}></ChevronLeft>

              </button>
            </div>
          </div>

          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-9 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-3 space-y-1">
            <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Menu
            </p>
            {navItems.map((item) => {

              const isActive = item.href ? pathname === item.href: false;
              return(
              <Link 
              key={item.label || "#"} //href instead of label | if you use "||" you create a condition in case something is missing
              href={item.href || "#"} //it prevents that two parts have the same URL and prevents crashing
              prefetch={false} //prefetch links only through hoovering or clicking instead of loading everything.
              //this prevents excessive and expensive pullings from the server.
              
              className={cn(
                "flex",
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                 isActive //look to not have different css active at the same time!
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}>
                <item.icon className="w-5 h-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "min-w-5 h-5 justify-center",
                      isActive 
                        ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground" 
                        : "bg-sidebar-accent text-sidebar-foreground"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}  
            </Link>
              );
            })}
            
          </nav>

          {/* Bottom Items */}
          <div className="px-3 pb-4 space-y-1 border-t border-sidebar-border pt-4">
            {bottomItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className="min-w-5 h-5 justify-center bg-accent text-accent-foreground"
                  >
                    {item.badge}
                  </Badge>
                )}
                
              </button>
            ))}
          {/*Theme / Mode_toggle */}
          <div className="flex items-center justify-between 0.2rem py-2.5 rounded-lg">
            <span className="text-sm font-medium text-sidebar-foreground">Tema</span>
            <ModeToggle></ModeToggle>

          </div>

          </div>
        </div>
      </aside>
    </>
    )
}

export function MobileHeader() {
  const toggle = useLayoutStore((state) => state.toggleSidebar)
    return (
        <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-background border-b border-border lg:hidden">
        <Button variant="ghost" size="icon" onClick={toggle}>
        <Menu className="w-5 h-5"></Menu>
        </Button>
            <div className="flex items-center gap-2"></div>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"></div>
            <Apple className="w-4 h-4 text-primary-foreground"></Apple>
            <div>
                <span className="font-semibold text-foreground">Nutri Command</span>
            </div>
        <Button>
            <Bell className="w-5 h-5"></Bell>
        </Button>
        </header>
    )
}

