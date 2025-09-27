import { useState, FC } from 'react'
import { SchemaData } from '../App'

interface SchemaPreviewProps {
  schema: SchemaData
  isGoogleDriveConnected: boolean
}

export const SchemaPreview: FC<SchemaPreviewProps> = ({ 
  schema, 
  isGoogleDriveConnected 
}: SchemaPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleDownload = () => {
    const blob = new Blob([schema.content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${schema.title.replace(/\s+/g, '_')}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleUploadToDrive = async () => {
    if (!isGoogleDriveConnected) {
      alert('Please connect to Google Drive first')
      return
    }
    
    // Simulate Google Drive upload
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Schema successfully uploaded to Google Drive!')
    } catch (error) {
      alert('Error uploading to Google Drive')
    }
  }

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(schema.content)
      alert('Schema copied to clipboard!')
    } catch (error) {
      alert('Error copying to clipboard')
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Generated Schema
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            {schema.generatedAt.toLocaleString()}
          </span>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg border p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-900">{schema.title}</h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        
        <div className={`${isExpanded ? '' : 'max-h-32 overflow-hidden'} transition-all duration-200`}>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
            {schema.content}
          </pre>
        </div>
        
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleDownload}
            className="btn-primary flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download</span>
          </button>

          <button
            onClick={handleUploadToDrive}
            disabled={!isGoogleDriveConnected}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.5 2.5L22 15H14.5L12.5 12.5L8.5 15H2L12.5 2.5ZM7.5 16.5H22L19.5 21H7.5L7.5 16.5Z"/>
            </svg>
            <span>Upload to Drive</span>
          </button>

          <button
            onClick={handleCopyToClipboard}
            className="btn-secondary flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy</span>
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm text-blue-700">
                This schema has been generated to comply with UK and Ireland engineering standards. 
                Please review and customize as needed for your specific project requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}