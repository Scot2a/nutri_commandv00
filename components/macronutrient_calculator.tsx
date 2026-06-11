'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface MacronutrientCalculatorProps {
  get: number
  bodyWeight: number
  onNext: (macros: MacroData) => void
}

export interface MacroData {
  proteinMultiplier: number
  proteins_percentage: number
  proteins_g: number
  proteins_kcals: number
  carbs_percentage: number
  carbs_kcal: number
  carbs_g: number
  lipids_percentage: number
  lipids_kcals: number
  lipids_g: number
}

export function MacronutrientCalculator({
  get,
  bodyWeight,
  onNext,
}: MacronutrientCalculatorProps) {
  const [proteinMultiplier, setProteinMultiplier] = useState('1.6')
  const [carbs_percentage, setCarbsPercentage] = useState('45')
  const [lipidPercentage, setLipidPercentage] = useState('30')

  const proteins_g = parseFloat(proteinMultiplier) * bodyWeight
  const proteins_kcals = proteins_g * 4
  const proteins_percentage = (proteins_kcals / get) * 100

  const remainingKcals = get - proteins_kcals
  const carbs_kcal = Math.min((parseFloat(carbs_percentage) / 100) * get, remainingKcals)
  const carbs_g = carbs_kcal / 4

  const lipids_kcals = Math.min((parseFloat(lipidPercentage) / 100) * get, remainingKcals)
  const lipids_g = lipids_kcals / 9

  const totalKcals = proteins_kcals + carbs_kcal + lipids_kcals
  const totalPercentage = proteins_percentage + parseFloat(carbs_percentage || "0") + parseFloat(lipidPercentage || "0")

  const roundedTotalPercentage = Math.round(totalPercentage * 10) / 10;
  const roundedTotalKcals = Math.round(totalKcals);

  const displayPercentage = parseFloat(totalPercentage.toFixed(1));
  const isWithinMargin = displayPercentage >= 99.7 && displayPercentage <= 100.3;

  const isValidDistribution = roundedTotalPercentage >= 99.7 && 
                            roundedTotalPercentage <= 100.3 && 
                            roundedTotalKcals <= (get + 10);
                            isWithinMargin && totalKcals <= (get + 10)


  

  const handleCarboChange = (value: string) => {
    const num = parseFloat(value) || 0
    if (num >= 0 && num <= 100) {
      setCarbsPercentage(value)
    }
  }

  const handleLipidChange = (value: string) => {
    const num = parseFloat(value) || 0
    if (num >= 0 && num <= 100) {
      setLipidPercentage(value)
    }
  }

  const handleNext = () => {
    if (isValidDistribution) {
      onNext({
        proteinMultiplier: parseFloat(proteinMultiplier),
        proteins_g,
        proteins_kcals,
        carbs_percentage: parseFloat(carbs_percentage),
        carbs_kcal: carbs_kcal,
        carbs_g: carbs_g,
        lipids_percentage: parseFloat(lipidPercentage),
        lipids_kcals: lipids_kcals,
        lipids_g: lipids_g,
        proteins_percentage,
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-foreground">
            Macronutrient Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Protein Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Protein Multiplier (g/kg)
            </label>
            <Input
              type="number"
              value={proteinMultiplier}
              onChange={(e) => setProteinMultiplier(e.target.value)}
              className="bg-secondary/20 border-border"
              step="0.1"
              min="0.8"
              max="3"
            />
            <p className="text-xs text-muted-foreground">
              Weight: {bodyWeight}kg × {proteinMultiplier} = {proteins_g.toFixed(1)}g protein
            </p>
          </div>

          {/* Macronutrient Distribution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Protein Card */}
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Protein</h3>
                <Badge variant="outline" style={{ borderColor: '#4ade80', color: '#4ade80' }}>
                  {proteins_percentage.toFixed(1)}%
                </Badge>
              </div>
              <div className="space-y-1 text-sm">
                <div className="text-2xl font-bold text-green-500">
                  {proteins_kcals.toFixed(0)} kcal
                </div>
                <div className="text-muted-foreground">
                  {proteins_g.toFixed(1)}g
                </div>
              </div>
            </div>

            {/* Carbohydrate Card */}
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Carbohydrates</h3>
                <Input
                  type="number"
                  value={carbs_percentage}
                  onChange={(e) => handleCarboChange(e.target.value)}
                  className="w-16 h-8 bg-secondary/20 border-border text-xs"
                  min="0"
                  max="100"
                />
                <span className="text-xs text-muted-foreground">%</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="text-2xl font-bold text-blue-500">
                  {carbs_kcal.toFixed(0)} kcal
                </div>
                <div className="text-muted-foreground">
                  {carbs_g.toFixed(1)}g
                </div>
              </div>
            </div>

            {/* Lipid Card */}
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Lipids</h3>
                <Input
                  type="number"
                  value={lipidPercentage}
                  onChange={(e) => handleLipidChange(e.target.value)}
                  className="w-16 h-8 bg-secondary/20 border-border text-xs"
                  min="0"
                  max="100"
                />
                <span className="text-xs text-muted-foreground">%</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="text-2xl font-bold text-orange-500">
                  {lipids_kcals.toFixed(0)} kcal
                </div>
                <div className="text-muted-foreground">
                  {lipids_g.toFixed(1)}g
                </div>
              </div>
            </div>
          </div>

          {/* Total Summary */}
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Kcals</p>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold text-primary">
                    {totalKcals.toFixed(0)}
                  </div>
                  <span className="text-xs text-muted-foreground">/ {get.toFixed(0)}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Percentage</p>
                <div className="flex items-baseline gap-2">
                  <div className={`text-2xl font-bold ${displayPercentage > 100.3 ? 'text-red-500' : 'text-primary'}`}>
                    {displayPercentage}%
                  </div>
                </div>
              </div>
            </div>
            {!isValidDistribution && (
              <p className="text-xs text-red-500 mt-2">
                ⚠ Invalid distribution. Check percentages and kcals.
              </p>
            )}
          </div>

          {/* Next Button */}
          <Button
            onClick={handleNext}
            disabled={!isValidDistribution}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Complete Patient Registration
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
