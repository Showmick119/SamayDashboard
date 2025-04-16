"use client"

import type React from "react"

import { useState, useRef } from "react"
import { UploadIcon, CheckIcon, Loader2 } from "lucide-react"

interface DataUploaderProps {
  onUpload: (file: File) => void
  isUploading: boolean
}

export default function DataUploader({ onUpload, isUploading }: DataUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      onUpload(selectedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      setFile(droppedFile)
      onUpload(droppedFile)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : isUploading
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
              : file
                ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                : "border-slate-300 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv"
          className="hidden"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-blue-500 mb-2 animate-spin" />
            <p className="text-sm font-medium">Uploading dataset...</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Please wait</p>
          </div>
        ) : file ? (
          <div className="flex flex-col items-center">
            <CheckIcon className="h-10 w-10 text-green-500 mb-2" />
            <p className="text-sm font-medium">{file.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{(file.size / 1024).toFixed(2)} KB</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <UploadIcon className="h-10 w-10 text-slate-400 dark:text-slate-600 mb-2" />
            <p className="text-sm font-medium">Drag and drop your CSV file here</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">or click to browse</p>
          </div>
        )}
      </div>

      <div className="text-xs text-slate-500 dark:text-slate-400">
        <p>Supported format: CSV</p>
        <p>The CSV should contain at least two columns: timestamp and value</p>
      </div>
    </div>
  )
}
