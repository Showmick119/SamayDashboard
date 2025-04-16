"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ModelSelectorProps {
  onSelect: (model: string) => void
  selectedModel: string
}

const models = [
  { id: "LPTM", name: "LPTM" },
  { id: "TimesFM", name: "TimesFM" },
  { id: "Chronos", name: "Chronos" },
  { id: "Moment_Imputation", name: "Moment Imputation" },
  { id: "Moment_Forecasting", name: "Moment Forecasting" },
  { id: "Moment_Anomaly", name: "Moment Anomaly Detection" },
]

export default function ModelSelector({ onSelect, selectedModel }: ModelSelectorProps) {
  return (
    <div className="space-y-4">
      <Select value={selectedModel} onValueChange={onSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a forecasting model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              {model.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedModel && (
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-md">
          <h4 className="font-medium mb-2">Model Description</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">{getModelDescription(selectedModel)}</p>
        </div>
      )}
    </div>
  )
}

function getModelDescription(modelId: string): string {
  switch (modelId) {
    case "LPTM":
      return "LPTM is our flagship foundational model for time-series analysis with 150M parameters, offering superior performance across multiple domains and tasks."
    case "TimesFM":
      return "TimesFM is a foundational model for time-series forecasting with a focus on financial and economic data."
    case "Chronos":
      return "Chronos is a time-series model designed for handling long-term dependencies and seasonal patterns."
    case "Moment_Imputation":
      return "Moment Imputation is specialized for filling missing values in time-series data with high accuracy."
    case "Moment_Forecasting":
      return "Moment Forecasting focuses on multi-horizon forecasting with uncertainty quantification."
    case "Moment_Anomaly":
      return "Moment Anomaly Detection is designed to identify unusual patterns and outliers in time-series data."
    default:
      return "Select a model to see its description."
  }
}
