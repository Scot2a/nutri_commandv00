'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface Patient {
  id: string
  name: string
  initials: string
  age: number
  goal: string
  status: 'on-track' | 'needs-attention' | 'excellent'
  trend: 'up' | 'down' | 'stable'
  nextSession: string
  calorieTarget: number
}

const patients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    initials: 'SM',
    age: 34,
    goal: 'Weight Loss',
    status: 'on-track',
    trend: 'down',
    nextSession: 'Today, 2:00 PM',
    calorieTarget: 1800,
  },
  {
    id: '2',
    name: 'James Wilson',
    initials: 'JW',
    age: 28,
    goal: 'Muscle Gain',
    status: 'excellent',
    trend: 'up',
    nextSession: 'Tomorrow, 10:00 AM',
    calorieTarget: 2800,
  },
  {
    id: '3',
    name: 'Emily Chen',
    initials: 'EC',
    age: 45,
    goal: 'Diabetes Management',
    status: 'needs-attention',
    trend: 'stable',
    nextSession: 'Wed, 3:30 PM',
    calorieTarget: 1600,
  },
  {
    id: '4',
    name: 'Michael Brown',
    initials: 'MB',
    age: 52,
    goal: 'Heart Health',
    status: 'on-track',
    trend: 'down',
    nextSession: 'Thu, 11:00 AM',
    calorieTarget: 1900,
  },
  {
    id: '5',
    name: 'Lisa Rodriguez',
    initials: 'LR',
    age: 31,
    goal: 'Sports Nutrition',
    status: 'excellent',
    trend: 'up',
    nextSession: 'Fri, 4:00 PM',
    calorieTarget: 2400,
  },
]

const statusConfig = {
  'on-track': { label: 'On Track', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' },
  'needs-attention': { label: 'Needs Attention', color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)' },
  'excellent': { label: 'Excellent', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.15)' },
}

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-primary" />
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-[#38bdf8]" />
  return <Minus className="w-4 h-4 text-muted-foreground" />
}

export function PatientProfiles() {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-foreground">Patient Profiles</CardTitle>
        <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
          {patients.length} Active
        </Badge>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[340px] pr-3">
          <div className="space-y-2">
            {patients.map((patient) => {
              const status = statusConfig[patient.status]
              const isSelected = selectedPatient === patient.id
              
              return (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(isSelected ? null : patient.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    isSelected 
                      ? 'bg-secondary ring-1 ring-primary' 
                      : 'bg-secondary/50 hover:bg-secondary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarFallback className="bg-muted text-foreground text-sm font-medium">
                        {patient.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-foreground truncate">
                          {patient.name}
                        </span>
                        <TrendIcon trend={patient.trend} />
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">
                          {patient.age}y • {patient.goal}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-border space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Status</span>
                        <Badge 
                          variant="outline"
                          style={{ 
                            backgroundColor: status.bg, 
                            color: status.color,
                            borderColor: 'transparent'
                          }}
                        >
                          {status.label}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Calorie Target</span>
                        <span className="text-xs font-medium text-foreground">
                          {patient.calorieTarget} kcal/day
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Next Session</span>
                        <span className="text-xs font-medium text-primary">
                          {patient.nextSession}
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2 text-xs hover:bg-primary hover:text-primary-foreground bg-transparent"
                      >
                        View Full Profile
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
