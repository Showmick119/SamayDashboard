import { Suspense } from "react"
import Dashboard from "@/components/dashboard/dashboard"
import Documentation from "@/components/documentation/documentation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="border-b bg-white dark:bg-slate-950 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-montserrat tracking-tight">
            Foundational Models for Time-series Analysis
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="documentation" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="documentation">Research Documentation</TabsTrigger>
            <TabsTrigger value="dashboard">Samay Forecasting Dashboard</TabsTrigger>
          </TabsList>
          <TabsContent value="documentation" id="documentation">
            <Suspense fallback={<DocumentationSkeleton />}>
              <Documentation />
            </Suspense>
          </TabsContent>
          <TabsContent value="dashboard" id="dashboard">
            <Suspense fallback={<DashboardSkeleton />}>
              <Dashboard />
            </Suspense>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white dark:bg-slate-950 border-t py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} AdityaLab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  )
}

function DocumentationSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}
