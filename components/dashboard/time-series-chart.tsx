"use client"

import { useEffect, useRef } from "react"

interface TimeSeriesChartProps {
  data: {
    timestamps: string[]
    actual: number[]
    predicted: number[]
  }
}

export default function TimeSeriesChart({ data }: TimeSeriesChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current || !data) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Clear previous chart
    ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height)

    const width = chartRef.current.width
    const height = chartRef.current.height
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Find min and max values
    const allValues = [...data.actual, ...data.predicted]
    const minValue = Math.min(...allValues) * 0.9
    const maxValue = Math.max(...allValues) * 1.1
    const valueRange = maxValue - minValue

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#94a3b8"
    ctx.lineWidth = 1
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw grid lines
    const gridLines = 5
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#64748b"

    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i
      const value = maxValue - (valueRange / gridLines) * i

      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()

      ctx.fillText(value.toFixed(1), padding - 5, y)
    }

    // Draw x-axis labels (timestamps)
    const labelStep = Math.ceil(data.timestamps.length / 10)
    ctx.textAlign = "center"
    ctx.textBaseline = "top"

    for (let i = 0; i < data.timestamps.length; i += labelStep) {
      const x = padding + (chartWidth / (data.timestamps.length - 1)) * i
      ctx.fillText(data.timestamps[i], x, height - padding + 5)
    }

    // Draw actual data line
    ctx.beginPath()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2

    for (let i = 0; i < data.actual.length; i++) {
      const x = padding + (chartWidth / (data.actual.length - 1)) * i
      const y = padding + chartHeight - ((data.actual[i] - minValue) / valueRange) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.stroke()

    // Draw predicted data line
    ctx.beginPath()
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 2

    for (let i = 0; i < data.predicted.length; i++) {
      const x = padding + (chartWidth / (data.predicted.length - 1)) * i
      const y = padding + chartHeight - ((data.predicted[i] - minValue) / valueRange) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.stroke()

    // Draw legend
    const legendX = width - padding - 150
    const legendY = padding + 20

    // Actual data legend
    ctx.beginPath()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.moveTo(legendX, legendY)
    ctx.lineTo(legendX + 30, legendY)
    ctx.stroke()

    ctx.fillStyle = "#64748b"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText("Actual", legendX + 40, legendY)

    // Predicted data legend
    ctx.beginPath()
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 2
    ctx.moveTo(legendX, legendY + 20)
    ctx.lineTo(legendX + 30, legendY + 20)
    ctx.stroke()

    ctx.fillText("Predicted", legendX + 40, legendY + 20)
  }, [data])

  return (
    <div className="w-full h-96 relative">
      <canvas ref={chartRef} width={800} height={400} className="w-full h-full" />
    </div>
  )
}
