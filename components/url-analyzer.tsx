"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Globe } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface UrlAnalyzerProps {
  onAnalyze: (url: string) => void
  loading: boolean
  disabled: boolean
}

export function UrlAnalyzer({ onAnalyze, loading, disabled }: UrlAnalyzerProps) {
  const [inputUrl, setInputUrl] = useState("")
  const [validationError, setValidationError] = useState("")

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === "http:" || urlObj.protocol === "https:"
    } catch {
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError("")

    if (!inputUrl.trim()) {
      setValidationError("Please enter a URL")
      return
    }

    if (!validateUrl(inputUrl)) {
      setValidationError("Please enter a valid URL (including http:// or https://)")
      return
    }

    onAnalyze(inputUrl.trim())
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value)
    if (validationError) {
      setValidationError("")
    }
  }

  const exampleUrls = ["https://google.com", "https://github.com", "https://vercel.com", "https://react.dev"]

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url-input">Website URL</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="url-input"
              type="url"
              placeholder="https://example.com"
              value={inputUrl}
              onChange={handleInputChange}
              disabled={disabled}
              className="pl-10"
            />
          </div>
        </div>

        {validationError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={disabled || !inputUrl.trim()} className="w-full sm:w-auto">
          {loading ? "Analyzing..." : "Analyze Performance"}
        </Button>
      </form>

      {/* Example URLs */}
      <div className="space-y-2">
        <Label className="text-sm text-gray-600">Try these examples:</Label>
        <div className="flex flex-wrap gap-2">
          {exampleUrls.map((url) => (
            <Button
              key={url}
              variant="outline"
              size="sm"
              onClick={() => setInputUrl(url)}
              disabled={disabled}
              className="text-xs"
            >
              {url}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
