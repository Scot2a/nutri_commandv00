'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardSidebar, MobileHeader } from '@/components/dashboard_sidebar'
import { NewPatientForm } from '@/components/new_patient_form'
import { PatientsList } from '@/components/patients_list'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Plus } from 'lucide-react'
import { usePatientStore } from '@/src/patient_store/use_patient_store' 

export default function PatientsPage() {
  // we keep useState for the UI only... It might need some fixes later on
  //const [activeTab, setActiveTab] = useState('list')
  //const router = useRouter()
    // THAT DIDN'T WORK. WHY? Because the dashboard_sidebar now handles everything  on it's own
    //blessed be Zustand.
    //We need to set them as active or not.
    //That being said, we also DON'T need things like "toggle" or "isOpen" for the sidebar
    const [activeTab, setActiveTab] = useState("list")
    const router = useRouter()


  // We bring in Zustand! No more useReducer or useEffects.
  const patients = usePatientStore((state) => state.patients)
  const removePatient = usePatientStore((state) => state.removePatient)
  const updatePatient = usePatientStore((state) => state.updatePatient)

  const handleAddPatient = () => {
    setActiveTab('new')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar></DashboardSidebar>

      {/* Mobile Header */}
      <MobileHeader></MobileHeader>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/')}
              className="hover:bg-secondary/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Patients</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Manage and register your patients ({patients.length})
              </p>
            </div>
          </div>
          <Button
            onClick={handleAddPatient}
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          >
            <Plus className="w-4 h-4" />
            New Patient
          </Button>
        </header>

        {/* Mobile Header with Back Button */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/')}
              className="hover:bg-secondary/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Patients</h1>
              <p className="text-xs text-muted-foreground">{patients.length} patients</p>
            </div>
          </div>
          <Button
            onClick={handleAddPatient}
            size="icon"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-secondary/50 mb-6">
              <TabsTrigger value="list" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                All Patients
              </TabsTrigger>
              <TabsTrigger value="new" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                New Patient
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-0">
              <PatientsList
                patients={patients}
                onDelete={removePatient}
                onUpdate={updatePatient}
              />
            </TabsContent>

            <TabsContent value="new" className="mt-0">
              <NewPatientForm onPatientCreated={() => setActiveTab('list')} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}