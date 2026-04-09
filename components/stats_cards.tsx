'use client'

import React from "react"

import { Card, CardContent } from '@/components/ui/card'
import { Users, Target, TrendingUp, Calendar } from 'lucide-react'

interface StatCard {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: React.ElementType
  color: string
}

const stats: StatCard[] = [
  {
    label: 'Active Patients',
    value: '24',
    change: '+3 this week',
    trend: 'up',
    icon: Users,
    color: '#4ade80',
  },
  {
    label: 'Goals Achieved',
    value: '89%',
    change: '+5% vs last month',
    trend: 'up',
    icon: Target,
    color: '#38bdf8',
  },
  {
    label: 'Avg. Progress',
    value: '12.4kg',
    change: 'Total weight loss',
    trend: 'up',
    icon: TrendingUp,
    color: '#f97316',
  },
  {
    label: 'Sessions Today',
    value: '6',
    change: '2 remaining',
    trend: 'neutral',
    icon: Calendar,
    color: '#a78bfa',
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon 
                  className="w-5 h-5"
                  style={{ color: stat.color }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
