import { FC } from 'react'

interface ProcessingStatusProps {
  stage: string
}

export const ProcessingStatus: FC<ProcessingStatusProps> = ({ stage }: ProcessingStatusProps) => {
  return (
    <div className="card">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Processing Documents
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {stage}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Analyzing uploaded documents</span>
          <span className="text-green-600">✓</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Processing instructions</span>
          <span className="text-green-600">✓</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Generating schema structure</span>
          <div className="animate-pulse w-2 h-2 bg-yellow-500 rounded-full"></div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Applying UK & Ireland compliance</span>
          <span className="text-gray-400">⋯</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Finalizing document</span>
          <span className="text-gray-400">⋯</span>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-700">
          🤖 AI is analyzing your documents and generating a comprehensive engineering schema 
          that meets UK and Ireland regulatory standards. This process typically takes 2-5 minutes.
        </p>
      </div>
    </div>
  )
}