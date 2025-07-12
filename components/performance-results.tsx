"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Clock,
  HardDrive,
  Network,
  Gauge,
  ExternalLink,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import type { PerformanceData } from "@/types/performance"

interface PerformanceResultsProps {
  results: PerformanceData
  url: string
  onAnalyzeNew: () => void
}

export function PerformanceResults({ results, url, onAnalyzeNew }: PerformanceResultsProps) {
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${Math.round(ms)}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  const getScoreColor = (score: number): string => {
    if (score >= 90) return "text-green-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (score >= 50) return <Minus className="h-4 w-4 text-yellow-600" />
    return <TrendingDown className="h-4 w-4 text-red-600" />
  }

  const getScoreLabel = (score: number): string => {
    if (score >= 90) return "Good"
    if (score >= 50) return "Needs Improvement"
    return "Poor"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5" />
                Performance Analysis Results
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                {url}
              </CardDescription>
            </div>
            <Button onClick={onAnalyzeNew} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Analyze New URL
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Performance Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Score</CardTitle>
            <CardDescription>Overall performance rating (0-100)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{results.performanceScore}</span>
              <div className="flex items-center gap-2">
                {getScoreIcon(results.performanceScore)}
                <Badge
                  variant={
                    results.performanceScore >= 90
                      ? "default"
                      : results.performanceScore >= 50
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {getScoreLabel(results.performanceScore)}
                </Badge>
              </div>
            </div>
            <Progress value={results.performanceScore} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Accessibility Score</CardTitle>
            <CardDescription>Accessibility compliance rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{results.accessibilityScore}</span>
              <div className="flex items-center gap-2">
                {getScoreIcon(results.accessibilityScore)}
                <Badge
                  variant={
                    results.accessibilityScore >= 90
                      ? "default"
                      : results.accessibilityScore >= 50
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {getScoreLabel(results.accessibilityScore)}
                </Badge>
              </div>
            </div>
            <Progress value={results.accessibilityScore} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-blue-600" />
              Load Time
            </CardTitle>
            <CardDescription>Total page load duration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">First Contentful Paint</span>
                <span className="font-semibold">{formatTime(results.firstContentfulPaint)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Largest Contentful Paint</span>
                <span className="font-semibold">{formatTime(results.largestContentfulPaint)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Speed Index</span>
                <span className="font-semibold">{formatTime(results.speedIndex)}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Load Time</span>
                  <span className="text-xl font-bold text-blue-600">{formatTime(results.totalLoadTime)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <HardDrive className="h-5 w-5 text-green-600" />
              Page Size
            </CardTitle>
            <CardDescription>Total resource size breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">HTML</span>
                <span className="font-semibold">{formatBytes(results.resourceSizes.html)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CSS</span>
                <span className="font-semibold">{formatBytes(results.resourceSizes.css)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">JavaScript</span>
                <span className="font-semibold">{formatBytes(results.resourceSizes.javascript)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Images</span>
                <span className="font-semibold">{formatBytes(results.resourceSizes.images)}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Size</span>
                  <span className="text-xl font-bold text-green-600">{formatBytes(results.totalSize)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Network className="h-5 w-5 text-purple-600" />
              Network Activity
            </CardTitle>
            <CardDescription>HTTP requests and transfers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">HTML Requests</span>
                <span className="font-semibold">{results.requestCounts.html}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CSS Requests</span>
                <span className="font-semibold">{results.requestCounts.css}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">JS Requests</span>
                <span className="font-semibold">{results.requestCounts.javascript}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Image Requests</span>
                <span className="font-semibold">{results.requestCounts.images}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Requests</span>
                  <span className="text-xl font-bold text-purple-600">{results.totalRequests}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Performance Metrics</CardTitle>
          <CardDescription>Other important performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{formatTime(results.timeToInteractive)}</div>
              <div className="text-sm text-gray-600 mt-1">Time to Interactive</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{results.cumulativeLayoutShift.toFixed(3)}</div>
              <div className="text-sm text-gray-600 mt-1">Cumulative Layout Shift</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{formatTime(results.firstInputDelay)}</div>
              <div className="text-sm text-gray-600 mt-1">First Input Delay</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{results.seoScore}</div>
              <div className="text-sm text-gray-600 mt-1">SEO Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
