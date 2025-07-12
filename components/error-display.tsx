"use client"

import { AlertTriangle, RefreshCw, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ErrorDisplayProps {
  error: string
  onRetry: () => void
  onReset: () => void
}

export function ErrorDisplay({ error, onRetry, onReset }: ErrorDisplayProps) {
  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Analysis Failed</AlertTitle>
        <AlertDescription className="mt-2">{error}</AlertDescription>
      </Alert>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onRetry} variant="outline" className="flex items-center gap-2 bg-transparent">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
        <Button onClick={onReset} variant="outline" className="flex items-center gap-2 bg-transparent">
          <RotateCcw className="h-4 w-4" />
          Start Over
        </Button>
      </div>

      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <strong>Common issues:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>URL is not accessible or returns an error</li>
          <li>Website blocks automated analysis tools</li>
          <li>Temporary network or API issues</li>
          <li>Invalid URL format</li>
        </ul>
      </div>
    </div>
  )
}
