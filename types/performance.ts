export interface PerformanceData {
  // Core Metrics
  performanceScore: number
  accessibilityScore: number
  seoScore: number

  // Load Time Metrics (in milliseconds)
  firstContentfulPaint: number
  largestContentfulPaint: number
  speedIndex: number
  timeToInteractive: number
  totalLoadTime: number
  cumulativeLayoutShift: number
  firstInputDelay: number

  // Size Metrics (in bytes)
  totalSize: number
  resourceSizes: {
    html: number
    css: number
    javascript: number
    images: number
  }

  // Request Metrics
  totalRequests: number
  requestCounts: {
    html: number
    css: number
    javascript: number
    images: number
  }
}

export interface AnalysisError {
  message: string
  code?: string
  details?: string
}
