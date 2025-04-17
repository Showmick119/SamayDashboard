"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TrendingUp, CheckCircle, XCircle } from "lucide-react"
import ModelSelector from "./model-selector"
import DataUploader from "./data-uploader"
import LoadingSpinner from "./loading-spinner"

// API base URL configuration
const API_BASE_URL = "https://2e76-130-207-126-160.ngrok-free.app"

export default function Dashboard() {
  // State management
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [plotUrl, setPlotUrl] = useState<string | null>(null)
  const [apiMessage, setApiMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Loading states
  const [isLoadingModel, setIsLoadingModel] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isFinetuning, setIsFinetuning] = useState<boolean>(false)
  const [isGeneratingPlot, setIsGeneratingPlot] = useState<boolean>(false)

  // Derived states
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false)
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)

  // Clear messages when starting a new action
  const clearMessages = () => {
    setApiMessage(null)
    setErrorMessage(null)
  }

  const resetDashboard = () => {
    clearMessages()
    setUploadedFile(null)      // clear the file selection
    setPlotUrl(null)           // hide any existing plot
    setIsModelLoaded(false)    // mark model as “not yet loaded”
    setIsDataLoaded(false)     // mark data as “not yet uploaded”
  }

  // Handle model selection
  const handleModelSelect = (model: string) => {
    resetDashboard()
    setSelectedModel(model)
  }

  // Handle file upload selection and trigger upload
  const handleDatasetUpload = async (file: File) => {
    setUploadedFile(file)
    clearMessages()

    // Automatically trigger upload when file is selected
    await uploadDataset(file)
  }

  // Load model API call
  const loadModel = async () => {
    if (!selectedModel) {
      setErrorMessage("Please select a model first")
      return
    }

    clearMessages()
    setIsLoadingModel(true)

    try {
      const response = await fetch(`https://9427-130-207-126-160.ngrok-free.app/load_model`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_name: selectedModel }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to load model")
      }

      setApiMessage(data.message || "Model loaded successfully")
      setIsModelLoaded(true)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An error occurred while loading the model")
      console.error("Load model error:", error)
    } finally {
      setIsLoadingModel(false)
    }
  }

  // Upload dataset API call
  const uploadDataset = async (file: File) => {
    if (!file) {
      setErrorMessage("Please select a CSV file to upload")
      return
    }

    clearMessages()
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("dataset", file)
      formData.append("model_name", selectedModel)

      const response = await fetch(`https://9427-130-207-126-160.ngrok-free.app/upload_dataset`, {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload dataset")
      }

      setApiMessage(data.message || "Dataset uploaded successfully")
      setIsDataLoaded(true)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An error occurred while uploading the dataset")
      console.error("Upload dataset error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  // Finetune model API call
  const finetune = async () => {
    if (!isModelLoaded) {
      setErrorMessage("Please load a model first")
      return
    }

    if (!isDataLoaded) {
      setErrorMessage("Please upload a dataset first")
      return
    }

    clearMessages()
    setIsFinetuning(true)

    try {
      const response = await fetch(`https://9427-130-207-126-160.ngrok-free.app/finetune`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_name: selectedModel, dataset_name: "uploaded" }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to finetune model")
      }

      setApiMessage(data.message || "Model fine-tuned successfully")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An error occurred while finetuning the model")
      console.error("Finetune error:", error)
    } finally {
      setIsFinetuning(false)
    }
  }

  // Generate plot API call
  const generatePlot = async () => {
    if (!isModelLoaded) {
      setErrorMessage("Please load a model first")
      return
    }

    if (!isDataLoaded) {
      setErrorMessage("Please upload a dataset first")
      return
    }

    clearMessages()
    setIsGeneratingPlot(true)

    try {
      const response = await fetch(`https://9427-130-207-126-160.ngrok-free.app/run_inference`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_name: selectedModel, dataset_name: "uploaded" }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Error: ${response.status} ${response.statusText}`)
      }

      // Handle the blob response for the image
      const blob = await response.blob()
      const imageURL = URL.createObjectURL(blob)

      setPlotUrl(imageURL)
      setApiMessage("Plot generated successfully")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An error occurred while generating the plot")
      console.error("Generate plot error:", error)
    } finally {
      setIsGeneratingPlot(false)
    }
  }

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (plotUrl) {
        URL.revokeObjectURL(plotUrl)
      }
    }
  }, [plotUrl])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/2 transition-opacity duration-500 ease-in-out">
          <CardHeader>
            <CardTitle>Model Selection</CardTitle>
            <CardDescription>Choose a time-series forecasting model</CardDescription>
          </CardHeader>
          <CardContent>
            <ModelSelector onSelect={handleModelSelect} selectedModel={selectedModel} />
          </CardContent>
          <CardFooter>
            <Button onClick={loadModel} disabled={!selectedModel || isLoadingModel} className="w-full">
              {isLoadingModel ? <LoadingSpinner className="mr-2" /> : null}
              {isLoadingModel ? "Loading Model..." : "Load Model"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Dataset Upload</CardTitle>
            <CardDescription>Upload your time-series CSV data</CardDescription>
          </CardHeader>
          <CardContent>
            <DataUploader key={selectedModel} onUpload={handleDatasetUpload} isUploading={isUploading} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={finetune}
              disabled={!isModelLoaded || !isDataLoaded || isFinetuning}
              variant="outline"
              className="w-1/3 mr-2"
            >
              {isFinetuning ? <LoadingSpinner className="mr-2" /> : null}
              {isFinetuning ? "Finetuning..." : "Finetune"}
            </Button>
            <Button
              onClick={generatePlot}
              disabled={!isModelLoaded || !isDataLoaded || isGeneratingPlot}
              className="w-2/3 ml-2"
            >
              {isGeneratingPlot ? <LoadingSpinner className="mr-2" /> : null}
              {isGeneratingPlot ? "Generating Plot..." : "Generate Plot"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Status messages */}
      {apiMessage && (
        <Alert variant="default" className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{apiMessage}</AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {/* Plot Display */}
      {plotUrl ? (
        <Card className="transition-opacity duration-500 ease-in-out">
          <CardHeader>
            <CardTitle>Forecast Results</CardTitle>
            <CardDescription>Time-series forecast visualization</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <img
              src={plotUrl || "/placeholder.svg"}
              alt="Forecast Plot"
              className="max-w-full border rounded-md shadow-sm"
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="transition-opacity duration-500 ease-in-out">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-muted rounded-full p-3">
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Ready for Forecasting</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Select a model and upload your dataset, then generate a forecast plot to visualize the results.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <Button variant="outline" size="sm" disabled={!selectedModel} onClick={loadModel}>
                  {selectedModel ? "Load Selected Model" : "Select a Model First"}
                </Button>
                <Button variant="outline" size="sm" disabled={!isModelLoaded || !isDataLoaded} onClick={generatePlot}>
                  Generate Forecast
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
