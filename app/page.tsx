"use client"

import { useState } from "react"
import { UrlAnalyzer } from "@/components/url-analyzer"
import { PerformanceResults } from "@/components/performance-results"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorDisplay } from "@/components/error-display"
import { usePerformanceAnalysis } from "@/hooks/use-performance-analysis"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [url, setUrl] = useState("")
  const { results, loading, error, analyzeUrl, clearResults } = usePerformanceAnalysis()

  const handleAnalyze = async (inputUrl: string) => {
    setUrl(inputUrl)
    await analyzeUrl(inputUrl)
  }

  const handleReset = () => {
    setUrl("")
    clearResults()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">URL Performance Analyzer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze any website's performance metrics including load time, page size, and request count using Google
            PageSpeed Insights API.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* URL Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Enter URL to Analyze</CardTitle>
              <CardDescription>
                Provide a complete URL (including https://) to get detailed performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UrlAnalyzer onAnalyze={handleAnalyze} loading={loading} disabled={loading} />
            </CardContent>
          </Card>

          {/* Loading State */}
          {loading && (
            <Card>
              <CardContent className="py-12">
                <LoadingSpinner message="Analyzing website performance..." />
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {error && (
            <Card>
              <CardContent className="py-8">
                <ErrorDisplay error={error} onRetry={() => handleAnalyze(url)} onReset={handleReset} />
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {results && !loading && !error && (
            <PerformanceResults results={results} url={url} onAnalyzeNew={handleReset} />
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 pt-8 border-t">
          <p>Built with React, Next.js, and Google PageSpeed Insights API</p>
          <p className="mt-2">Performance data is measured using real-world metrics and lab data</p>
        </div>
      </div>
    </div>
  )
}
