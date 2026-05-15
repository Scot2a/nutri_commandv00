"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GETCalculatorProps{
    gebAverage: number
    onNext: (get: number, pa: number) => void
}

const activityLevels = [
    { value: 1.2, Label: "Muy ligera"},
    { value: 1.375, Label: "Ligera"},
    { value: 1.55, Label: "Moderada"},
    { value: 1.725, Label: "Intensa"},
    { value: 1.9, Label: "Muy intensa"},
]

export function GETCalculator({ gebAverage, onNext }: GETCalculatorProps) {
    const [selectedPA, setSelectedPA] = useState<number | null>(null)

    const calculateGET = () => {
        if (selectedPA === null) return null
        //const eta = gebAverage * 0.1
        return gebAverage * selectedPA //+ eta            
    }
        
    const get = calculateGET()
    
    const handleNext = () => {
        if (get !== null && selectedPA !== null) {
            onNext(get, selectedPA)
        }
    }

      return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-foreground">
            Gasto Energético total (GET)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* GEB Display */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Gasto Energético Basal (GEB) - Moderado
            </label>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="text-2xl font-bold text-primary">
                {gebAverage.toFixed(2)} kcal
              </div>
            </div>
          </div>

          {/* Activity Level Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Nivel de Acitividad Física
            </label>
            <Select value={selectedPA?.toString() || ''} onValueChange={(val) => setSelectedPA(parseFloat(val))}>
              <SelectTrigger className="bg-secondary/20 border-border">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {activityLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value.toString()}>
                    {level.Label} ({level.value})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ETA Display */}
{/*          {selectedPA !== null && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Efecto Termogénico de los Alimentos (ETA) - 10% of GEB
              </label>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="text-2xl font-bold text-accent">
                  {(gebAverage * 0.1).toFixed(2)} kcal
                </div>
              </div>
            </div>
          )}* */}

          {/* GET Result */}
          {get !== null && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
               {/**  Total Daily Energy Expenditure (GET)*/}
               Gasto Energético Total (GET)
              </label>
              <div className="p-4 rounded-lg bg-primary/20 border-2 border-primary">
                <div className="text-3xl font-bold text-primary">
                  {get.toFixed(2)} kcal/day
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                {/*  Formula: (GEB × PA) + ETA = ({gebAverage.toFixed(2)} × {selectedPA}) + {(gebAverage * 0.1).toFixed(2)} */}
                    Fórmula: (GEB * PA) = ({gebAverage.toFixed(2)} * {selectedPA})
                </p>
              </div>
            </div>
          )}

          {/* Next Button */}
          <Button
            onClick={handleNext}
            disabled={get === null}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Next: Macronutrient Distribution
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
