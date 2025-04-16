"use client"

import { Card, CardContent } from "@/components/ui/card"

interface ModelMetricsProps {
  metrics: {
    mse: string
    mae: string
    rmse: string
    mape: string
  }
}

export default function ModelMetrics({ metrics }: ModelMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MetricCard
        title="Mean Squared Error (MSE)"
        value={metrics.mse}
        description="Average of the squared differences between predicted and actual values"
        color="blue"
      />
      <MetricCard
        title="Mean Absolute Error (MAE)"
        value={metrics.mae}
        description="Average of the absolute differences between predicted and actual values"
        color="green"
      />
      <MetricCard
        title="Root Mean Squared Error (RMSE)"
        value={metrics.rmse}
        description="Square root of the average of squared differences"
        color="purple"
      />
      <MetricCard
        title="Mean Absolute Percentage Error (MAPE)"
        value={metrics.mape}
        description="Average of percentage differences between predicted and actual values"
        color="amber"
      />
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  description: string
  color: "blue" | "green" | "purple" | "amber"
}

function MetricCard({ title, value, description, color }: MetricCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900",
    green: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900",
    purple: "bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-900",
    amber: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900",
  }

  const valueColorClasses = {
    blue: "text-blue-700 dark:text-blue-400",
    green: "text-green-700 dark:text-green-400",
    purple: "text-purple-700 dark:text-purple-400",
    amber: "text-amber-700 dark:text-amber-400",
  }

  return (
    <Card className={`border ${colorClasses[color]}`}>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className={`text-3xl font-bold mb-2 ${valueColorClasses[color]}`}>{value}</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
      </CardContent>
    </Card>
  )
}
