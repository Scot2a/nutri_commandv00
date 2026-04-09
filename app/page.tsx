"use client"

import Image from "next/image";
import { useReducer,useState } from "react";
import { ModeToggle } from "@/components/mode_toggle"
import { DashboardSidebar,MobileHeader } from "@/components/dashboard_sidebar";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FoodProgress } from "@/components/food_progress";
import { PatientProfiles } from "@/components/patient_profiles";
import { useLayoutStore } from "@/src/main_store/use_layout_store";
import { StatsCards } from "@/components/stats_cards";
import { CalorieChart } from "@/components/calorie_chart";
import { MacrosPanel } from "@/components/macros_panel";

export default function NutritionistDashboard() {

  // We now don't even need the state here! 
  // The components inside will subscribe to the store themselves.
  // Zustand seems to be a better option overall to useReduce and useState!
  // Freaking easier...

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <MobileHeader />

      <main className="lg:ml-64 p-6"> 
        <nav className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tablero de control</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Bienvenido de vuelta, Dr. Anderson
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Paciente nuevo
            </Button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarFallback className="bg-muted text-foreground font-medium">
                  DA
                </AvatarFallback>
              </Avatar>
              <div className="hidden xl:block">
                <p className="text-sm font-medium">Dr. Anderson</p>
                <p className="text-xs text-muted-foreground">Nutricionista</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
            <ModeToggle />
          </div>
        </nav>
        
        {/* The main Dashboard content goes HEEEREEE */}
        {/* Dashboard content - top */}

        <div className="p-4 lg:p-6 space-y-6">
          {/* State cards go here */}
          <StatsCards></StatsCards>

        {/* Main items / grid */}

        <div className="grid grid=cols=1 lg:grid-cols-3 gap-6">
          {/*Everything on the left + progress bar + foodprogress */}
          <div className="lg:col-span-2 space-y-6">
            <CalorieChart></CalorieChart>
            <div className="grid grid-cols-1 md:grid-cols02 gap-6">
              {/*<FoodProgress macroTotals={MacroTotals} estimatedCalories={{estimatedCalories}}></FoodProgress>
            */}</div>
            <div className="lg:col-span-1">
              <PatientProfiles></PatientProfiles>
            </div>
          </div>
        </div>
        </div>

      </main>
    </div>
  )
}


