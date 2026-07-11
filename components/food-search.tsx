'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { foodCategories, type FoodItem, getFoodCategoryColor } from '@/src/types/food'
import { getFoodbyCategory } from '@/app/(dashboard)/dashboard/database'

interface FoodSearchProps {
  onSelectFood: (food: FoodItem) => void
  stagedCart: Record<string, number>
  onAddToCart: (foodId: string) => void
  onRemoveFromCart: (foodId: string) => void
}

export function FoodSearch({ 
  onSelectFood, 
  stagedCart, 
  onAddToCart, 
  onRemoveFromCart 
}: FoodSearchProps) {
  const [searchMode, setSearchMode] = useState<'raciones' | 'recetas'>('raciones')
  const [searchQuery, setSearchQuery] = useState('')

  // Filtered foods based on search query
  const filteredFoods = useMemo(() => {
    const allFoods: (FoodItem & { category: string })[] = []
    
    foodCategories.forEach((category) => {
      const foods = getFoodbyCategory(category.id)
      foods.forEach((food) => {
        allFoods.push({ ...food, category: category.id })
      })
    })

    if (!searchQuery.trim()) return allFoods

    return allFoods.filter((food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const FoodGrid = ({ foods }: { foods: (FoodItem & { category: string })[] }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {foods.map((food) => {
        const quantity = stagedCart[food.id] || 0
        const isSelected = quantity > 0
        const categoryColor = getFoodCategoryColor(food.categoryId)

        return (
          <button
            key={food.id}
            onClick={() => onAddToCart(food.id)}
            className={`relative group rounded-lg border-2 p-2 transition-all text-left hover:shadow-md ${
              isSelected 
                ? 'border-primary bg-primary/5' 
                : 'border-transparent bg-secondary/20 hover:border-primary/30'
            }`}
          >
            {isSelected && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveFromCart(food.id)
                  }}
                  className="absolute top-1 right-1 z-10 rounded-full bg-destructive/80 p-1 text-white hover:bg-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute top-1 left-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {quantity}
                </div>
              </>
            )}

            <div className="aspect-square w-full rounded-md bg-secondary/40 mb-2 flex items-center justify-center text-center p-2 group-hover:opacity-80 transition-opacity">
              <span className="text-xs text-muted-foreground font-medium">{food.measure}</span>
            </div>

            <h3 className="text-xs font-semibold text-foreground line-clamp-2 mb-1">
              {food.name}
            </h3>
            
            <Badge
              variant="outline"
              className="text-[10px]"
              style={{
                backgroundColor: `${categoryColor}20`,
                color: categoryColor,
                borderColor: categoryColor,
              }}
            >
              {food.amount_g_ml}{food.unit}
            </Badge>
          </button>
        )
      })}
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Input
          placeholder="Search foods..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-4 pr-4"
        />
      </div>

      {/* Search Mode Tabs */}
      <Tabs value={searchMode} onValueChange={(v) => setSearchMode(v as 'raciones' | 'recetas')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary/10">
          <TabsTrigger 
            value="raciones"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Raciones
          </TabsTrigger>
          <TabsTrigger 
            value="recetas"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Recetas
          </TabsTrigger>
        </TabsList>

        {/* Raciones Mode - Category-based */}
        <TabsContent value="raciones" className="space-y-4">
          <div className="space-y-4">
            {foodCategories.map((category) => {
              const foods = getFoodbyCategory(category.id)
              const filteredByCategory = filteredFoods.filter((f) => f.category === category.id)

              return (
                <div key={category.id} className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground capitalize">
                    {category.name}
                  </h3>
                  {filteredByCategory.length === 0 ? (
                    <p className="text-xs text-muted-foreground py-4">
                      No foods found in {category.name}
                    </p>
                  ) : (
                    <ScrollArea className="rounded-lg border border-border p-3">
                      <FoodGrid foods={filteredByCategory} />
                    </ScrollArea>
                  )}
                </div>
              )
            })}
          </div>
        </TabsContent>

        {/* Recetas Mode - Full list */}
        <TabsContent value="recetas" className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Recipes coming soon</p>
            <p className="text-xs">Complete dishes will be available here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
