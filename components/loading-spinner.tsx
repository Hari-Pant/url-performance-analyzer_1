import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-gray-600 text-center">{message}</p>
      <div className="text-sm text-gray-500 text-center max-w-md">
        <p>This may take 10-30 seconds as we analyze the website's performance using Google PageSpeed Insights.</p>
      </div>
    </div>
  )
}
