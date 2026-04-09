'use client'

import { useState, Dispatch } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Check, RefreshCw } from 'lucide-react'
import type { FoodItem, MacroType, MacrosState, MacrosAction } from '@/app/reducers/macros-reducer'



interface ExchangeDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedFood: FoodItem | null
  macroType: MacroType
  onExchange: (newFood: FoodItem) => void
  color: string
}

function ExchangeDrawer({ 
  open, 
  onOpenChange, 
  selectedFood, 
  macroType, 
  onExchange,
  color 
}: ExchangeDrawerProps) {
  const getExchangeOptions = () => {
    if (!selectedFood) return []
    
    switch (macroType) {
      case 'proteins':
        return proteinExchanges[selectedFood.id] || []
      case 'carbs':
        return carbExchanges[selectedFood.id] || []
      case 'lipids':
        return lipidExchanges[selectedFood.id] || []
      default:
        return []
    }
  }

  const exchanges = getExchangeOptions()
  const macroLabel = macroType === 'proteins' ? 'Protein' : macroType === 'carbs' ? 'Carbohydrate' : 'Lipid'

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-card border-border">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2 text-foreground">
            <RefreshCw className="h-5 w-5" style={{ color }} />
            Exchange {selectedFood?.name}
          </DrawerTitle>
          <DrawerDescription>
            Select an equivalent {macroLabel.toLowerCase()} exchange for today&apos;s menu
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-2">
          <div className="grid gap-3">
            {exchanges.map((food) => (
              <button
                key={food.id}
                onClick={() => {
                  onExchange(food)
                  onOpenChange(false)
                }}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border hover:border-primary/50 transition-all cursor-pointer text-left group"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {food.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{food.amount}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className="border-transparent font-semibold"
                    style={{ backgroundColor: `${color}20`, color: color }}
                  >
                    {food.value}{food.unit}
                  </Badge>
                  <div 
                    className="h-8 w-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <Check className="h-4 w-4" style={{ color }} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full bg-transparent">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

interface FoodListProps {
  foods: FoodItem[]
  color: string
  macroType: MacroType
  onFoodClick: (food: FoodItem) => void
}

function FoodList({ foods, color, macroType, onFoodClick }: FoodListProps) {
  return (
    <ScrollArea className="h-[280px] pr-3">
      <div className="space-y-2">
        {foods.map((food) => (
          <button
            key={food.id}
            onClick={() => onFoodClick(food)}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer w-full text-left group"
          >
            <div className="flex flex-col">
              <span className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                {food.name}
              </span>
              <span className="text-xs text-muted-foreground">{food.amount}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className="border-transparent font-semibold"
                style={{ backgroundColor: `${color}20`, color: color }}
              >
                {food.value}{food.unit}
              </Badge>
              <RefreshCw className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}

interface MacrosPanelProps {
  macrosState: MacrosState
  dispatch: Dispatch<MacrosAction>
}

export function MacrosPanel({ macrosState, dispatch }: MacrosPanelProps) {
  const [activeTab, setActiveTab] = useState<MacroType>('proteins')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)

  const handleFoodClick = (food: FoodItem) => {
    setSelectedFood(food)
    setDrawerOpen(true)
  }

  const handleExchange = (newFood: FoodItem) => {
    if (!selectedFood) return

    dispatch({
      type: 'EXCHANGE_FOOD',
      payload: {
        macroType: activeTab,
        oldFoodId: selectedFood.id,
        newFood: newFood,
      },
    })
  }

  const getColorForTab = (tab: MacroType) => {
    switch (tab) {
      case 'proteins': return '#4ade80'
      case 'carbs': return '#38bdf8'
      case 'lipids': return '#f97316'
    }
  }

  return (
    <>
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium text-foreground">Food Exchange Menu</CardTitle>
            <Badge variant="outline" className="text-xs text-muted-foreground">
              Today
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as MacroType)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary/50 mb-4">
              <TabsTrigger 
                value="proteins" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm"
              >
                Proteins
              </TabsTrigger>
              <TabsTrigger 
                value="carbs"
                className="data-[state=active]:bg-[#38bdf8] data-[state=active]:text-[#0c1015] text-sm"
              >
                Carbs
              </TabsTrigger>
              <TabsTrigger 
                value="lipids"
                className="data-[state=active]:bg-[#f97316] data-[state=active]:text-[#0c1015] text-sm"
              >
                Lipids
              </TabsTrigger>
            </TabsList>
            <TabsContent value="proteins" className="mt-0">
              <FoodList 
                foods={macrosState.proteins} 
                color="#4ade80" 
                macroType="proteins"
                onFoodClick={handleFoodClick}
              />
            </TabsContent>
            <TabsContent value="carbs" className="mt-0">
              <FoodList 
                foods={macrosState.carbs} 
                color="#38bdf8" 
                macroType="carbs"
                onFoodClick={handleFoodClick}
              />
            </TabsContent>
            <TabsContent value="lipids" className="mt-0">
              <FoodList 
                foods={macrosState.lipids} 
                color="#f97316" 
                macroType="lipids"
                onFoodClick={handleFoodClick}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ExchangeDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        selectedFood={selectedFood}
        macroType={activeTab}
        onExchange={handleExchange}
        color={getColorForTab(activeTab)}
      />
    </>
  )
}
