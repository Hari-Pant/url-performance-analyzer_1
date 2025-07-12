"use client"

import { useState } from "react"
import type { PerformanceData } from "@/types/performance"
import { performanceService } from "@/services/performance-service"

export function usePerformanceAnalysis() {
  const [results, setResults] = useState<PerformanceData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeUrl = async (url: string) => {
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const data = await performanceService.analyzeUrl(url)
      setResults(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const clearResults = () => {
    setResults(null)
    setError(null)
  }

  return {
    results,
    loading,
    error,
    analyzeUrl,
    clearResults,
  }
}
