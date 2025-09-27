import React, { useState, useCallback } from 'react'
import { FileUpload } from './components/FileUpload'
import { PromptInput } from './components/PromptInput'
import { SchemaPreview } from './components/SchemaPreview'
import { GoogleDriveIntegration } from './components/GoogleDriveIntegration'
import { ProcessingStatus } from './components/ProcessingStatus'

export interface UploadedFile {
  file: File
  content?: string
  type: 'document' | 'text'
}

export interface SchemaData {
  title: string
  content: string
  generatedAt: Date
}

function App() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [prompt, setPrompt] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [generatedSchema, setGeneratedSchema] = useState<SchemaData | null>(null)
  const [isGoogleDriveConnected, setIsGoogleDriveConnected] = useState(false)

  const handleFilesUploaded = useCallback((files: UploadedFile[]) => {
    setUploadedFiles(files)
  }, [])

  const handlePromptChange = useCallback((newPrompt: string) => {
    setPrompt(newPrompt)
  }, [])

  const handleGenerateSchema = useCallback(async () => {
    if (!uploadedFiles.length || !prompt.trim()) {
      alert('Please upload at least one file and provide instructions.')
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate AI processing - In real implementation, this would call your AI service
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const mockSchema: SchemaData = {
        title: 'Engineering Written Schema Document',
        content: `# Engineering Written Schema Document

## Project Overview
Based on the uploaded documents and instructions: "${prompt}"

## Technical Specifications
[This would contain the actual generated schema based on AI analysis]

## Compliance Requirements (UK & Ireland)
- Regulatory compliance considerations
- Documentation standards
- Quality assurance protocols

## Implementation Guidelines
[Detailed implementation steps]

Generated on: ${new Date().toLocaleDateString()}`,
        generatedAt: new Date()
      }
      
      setGeneratedSchema(mockSchema)
    } catch (error) {
      console.error('Error generating schema:', error)
      alert('Error generating schema. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }, [uploadedFiles, prompt])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Engineering Written Schema Document
              </h1>
              <p className="mt-2 text-gray-600">
                Upload documents and generate UK & Ireland compliant engineering schemas
              </p>
            </div>
            <GoogleDriveIntegration 
              isConnected={isGoogleDriveConnected}
              onConnectionChange={setIsGoogleDriveConnected}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Document Upload
              </h2>
              <FileUpload onFilesUploaded={handleFilesUploaded} />
              
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Uploaded Files:
                  </h3>
                  <ul className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {file.file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Instructions
              </h2>
              <PromptInput 
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Describe the type of engineering schema you need, specific requirements, compliance standards, and any other relevant details..."
              />
            </div>

            <button 
              onClick={handleGenerateSchema}
              disabled={isProcessing || !uploadedFiles.length || !prompt.trim()}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Generating Schema...' : 'Generate Schema Document'}
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {isProcessing && (
              <ProcessingStatus 
                stage="Analyzing documents and generating schema..."
              />
            )}
            
            {generatedSchema && (
              <SchemaPreview 
                schema={generatedSchema}
                isGoogleDriveConnected={isGoogleDriveConnected}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App