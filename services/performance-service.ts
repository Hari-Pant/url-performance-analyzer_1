import type { PerformanceData } from "@/types/performance"

class PerformanceService {
  private readonly API_KEY = process.env.NEXT_PUBLIC_PAGESPEED_API_KEY || "demo"
  private readonly BASE_URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"

  async analyzeUrl(url: string): Promise<PerformanceData> {
    try {
      // Validate URL format
      new URL(url)

      // If no API key is provided, return mock data for demo purposes
      if (this.API_KEY === "demo") {
        return this.getMockData(url)
      }

      const response = await fetch(
        `${this.BASE_URL}?url=${encodeURIComponent(url)}&key=${this.API_KEY}&category=performance&category=accessibility&category=seo&strategy=desktop`,
      )

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Invalid URL or the website cannot be analyzed")
        }
        if (response.status === 403) {
          throw new Error("API key is invalid or quota exceeded")
        }
        if (response.status === 429) {
          throw new Error("Too many requests. Please try again later")
        }
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      return this.parsePageSpeedData(data)
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Network error. Please check your connection and try again")
      }
      throw error
    }
  }

  private parsePageSpeedData(data: any): PerformanceData {
    const lighthouse = data.lighthouseResult
    const audits = lighthouse.audits

    // Extract resource information
    const resourceSummary = audits["resource-summary"]?.details?.items || []
    const resourceSizes = {
      html: 0,
      css: 0,
      javascript: 0,
      images: 0,
    }
    const requestCounts = {
      html: 0,
      css: 0,
      javascript: 0,
      images: 0,
    }

    resourceSummary.forEach((item: any) => {
      const resourceType = item.resourceType?.toLowerCase() || ""
      const size = item.transferSize || 0
      const count = item.requestCount || 0

      if (resourceType.includes("document")) {
        resourceSizes.html += size
        requestCounts.html += count
      } else if (resourceType.includes("stylesheet")) {
        resourceSizes.css += size
        requestCounts.css += count
      } else if (resourceType.includes("script")) {
        resourceSizes.javascript += size
        requestCounts.javascript += count
      } else if (resourceType.includes("image")) {
        resourceSizes.images += size
        requestCounts.images += count
      }
    })

    const totalSize = Object.values(resourceSizes).reduce((sum, size) => sum + size, 0)
    const totalRequests = Object.values(requestCounts).reduce((sum, count) => sum + count, 0)

    return {
      performanceScore: Math.round(lighthouse.categories.performance.score * 100),
      accessibilityScore: Math.round(lighthouse.categories.accessibility.score * 100),
      seoScore: Math.round(lighthouse.categories.seo.score * 100),
      firstContentfulPaint: audits["first-contentful-paint"]?.numericValue || 0,
      largestContentfulPaint: audits["largest-contentful-paint"]?.numericValue || 0,
      speedIndex: audits["speed-index"]?.numericValue || 0,
      timeToInteractive: audits["interactive"]?.numericValue || 0,
      totalLoadTime: audits["speed-index"]?.numericValue || 0,
      cumulativeLayoutShift: audits["cumulative-layout-shift"]?.numericValue || 0,
      firstInputDelay: audits["max-potential-fid"]?.numericValue || 0,
      totalSize,
      totalRequests,
      resourceSizes,
      requestCounts,
    }
  }

  private getMockData(url: string): PerformanceData {
    // Generate realistic mock data for demo purposes
    const baseScore = 60 + Math.random() * 35 // Score between 60-95
    const loadTimeBase = 1000 + Math.random() * 3000 // 1-4 seconds

    return {
      performanceScore: Math.round(baseScore),
      accessibilityScore: Math.round(85 + Math.random() * 15),
      seoScore: Math.round(75 + Math.random() * 20),
      firstContentfulPaint: loadTimeBase * 0.3,
      largestContentfulPaint: loadTimeBase * 0.7,
      speedIndex: loadTimeBase * 0.8,
      timeToInteractive: loadTimeBase * 1.2,
      totalLoadTime: loadTimeBase,
      cumulativeLayoutShift: Math.random() * 0.1,
      firstInputDelay: 50 + Math.random() * 100,
      totalSize: 1024 * (500 + Math.random() * 2000), // 500KB - 2.5MB
      totalRequests: Math.round(20 + Math.random() * 80), // 20-100 requests
      resourceSizes: {
        html: 1024 * (10 + Math.random() * 40), // 10-50KB
        css: 1024 * (20 + Math.random() * 100), // 20-120KB
        javascript: 1024 * (100 + Math.random() * 500), // 100-600KB
        images: 1024 * (200 + Math.random() * 1000), // 200KB-1.2MB
      },
      requestCounts: {
        html: Math.round(1 + Math.random() * 3),
        css: Math.round(2 + Math.random() * 8),
        javascript: Math.round(5 + Math.random() * 15),
        images: Math.round(10 + Math.random() * 30),
      },
    }
  }
}

export const performanceService = new PerformanceService()
