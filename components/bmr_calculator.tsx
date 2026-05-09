"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BMRResults{
    mifflinStJeor: number
    harrisBenedict: number
    quickEstimation: number
}

interface BMRCalculatorProps {
    gender: "male" | "female"
    onNext?: (weight: number, height: number, age: number, gebAverage: number) => void
}

export function BMRCalculator({gender, onNext}: BMRCalculatorProps) {
const [weight, setWeight] = useState("")
const [height, setHeight] = useState("")
const [age, setAge] = useState("")

const calculateBMR = (): BMRResults | null => {
    if (!weight || !height || !age) return null 

    const w = parseFloat(weight)
    const h = parseFloat(height) //this is set in centimeters, so you need to be careful when adding new formulas
    const a = parseFloat(age)

    if (isNaN(w) || isNaN(h) || isNaN(a) || w <= 0 || h <= 0 || a <= 0) return null

    if (gender === "male") {
        return {
            mifflinStJeor: 10 * w + 6.25 * h - 5 * a + 5,
            harrisBenedict: 66.47 + 13.75 * w + 5 * h - 6.78 * a,
            quickEstimation: 1 * w * 24,
        }
    } else{
        return{
            mifflinStJeor: 10 * w + 6.25 * h - 5 * a - 161,
            harrisBenedict: 665.1 + 9.56 * w + 1.85 * h - 4.68 * a,
            quickEstimation: 0.95 * w * 24
        }
    }
}

const results = calculateBMR()
const gebAverage = results ? (results.mifflinStJeor + results.harrisBenedict + results.quickEstimation) / 3 : 0

const handleNext = () => {
    if (results && onNext) {
        const w = parseFloat(weight)
        const h = parseFloat(height)
        const a = parseFloat(age)
        onNext(w, h, a, gebAverage)
    }
}

return (
    <div className="space-y-6">
        {/*INPUT SELECTION BABY */}
        <Card className="border-border bg-card">
            <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground">
                Medidas del paciente
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            Peso (kg)
                        </label>
                        <input type="number"
                        placeholder="e.g. 75"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="bg-secondary/20 border-border rounded-2xl"
                        step="0.1">
                        </input>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            Estatura (cm)
                        </label>
                        <input type="number"
                        placeholder="e.g. 165"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="bg-secondary/20 border-border rounded-2xl"
                        step="0.1">
                        </input>
                    </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                        Edad (años)
                        </label>
                        <input type="number"
                        placeholder="e.g. 30"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="bg-secondary/20 border-border rounded-2xl">
                        </input>
                    </div>
                </div>
            </CardContent>
        </Card>
    {/**Here goes the results!! */}

{results && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            Estimaciones de Tasa Metabólica Basal (BMR)
          </h3>

          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Mifflin St. Jeor */}
                <div className="flex items-start justify-between p-4 rounded-lg bg-secondary/20 border border-border">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Mifflin-St Jeor</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Más utilizada
                    </p>
                  </div>
                  <Badge className="bg-primary text-primary-foreground text-base font-semibold px-3 py-1">
                    {results.mifflinStJeor.toFixed(0)} kcal
                  </Badge>
                </div>

                {/* Harris Benedict */}
                <div className="flex items-start justify-between p-4 rounded-lg bg-secondary/20 border border-border">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Harris-Benedict</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Formula de estimación clásica
                    </p>
                  </div>
                  <Badge className="bg-primary text-primary-foreground text-base font-semibold px-3 py-1">
                    {results.harrisBenedict.toFixed(0)} kcal
                  </Badge>
                </div>

                {/* Quick Estimation */}
                <div className="flex items-start justify-between p-4 rounded-lg bg-secondary/20 border border-border">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Quick Estimation</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Estimación rápida basada en el peso
                    </p>
                  </div>
                  <Badge className="bg-primary text-primary-foreground text-base font-semibold px-3 py-1">
                    {results.quickEstimation.toFixed(0)} kcal
                  </Badge>
                </div>
              </div>

              {/* Average */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm font-semibold text-foreground">BMR promedio</p>
                  <Badge className="bg-accent text-accent-foreground text-base font-semibold px-3 py-1">
                    {gebAverage.toFixed(0)} kcal
                  </Badge>
                </div>

                {onNext && (
                  <Button
                    onClick={handleNext}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Next: Calcular GET
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
)

}
