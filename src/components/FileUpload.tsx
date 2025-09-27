import { useCallback, useState, FC } from 'react'
import { UploadedFile } from '../App'
import mammoth from 'mammoth'

interface FileUploadProps {
  onFilesUploaded: (files: UploadedFile[]) => void
}

export const FileUpload: FC<FileUploadProps> = ({ onFilesUploaded }: FileUploadProps) => {
  const [isDragActive, setIsDragActive] = useState(false)

  const processFiles = useCallback(async (files: FileList) => {
    const uploadedFiles: UploadedFile[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      // Check file type
      const isValidType = file.type === 'text/plain' || 
                         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                         file.type === 'application/msword' ||
                         file.name.endsWith('.txt') ||
                         file.name.endsWith('.docx') ||
                         file.name.endsWith('.doc')

      if (!isValidType) {
        alert(`File ${file.name} is not supported. Please upload .txt, .doc, or .docx files.`)
        continue
      }

      try {
        let content = ''
        
        if (file.type === 'text/plain') {
          content = await file.text()
        } else if (file.type.includes('word') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
          try {
            const arrayBuffer = await file.arrayBuffer()
            const result = await mammoth.extractRawText({ arrayBuffer })
            content = result.value
            if (result.messages.length > 0) {
              console.warn('Mammoth warnings:', result.messages)
            }
          } catch (error) {
            console.error('Error extracting Word document:', error)
            content = `[Error extracting content from ${file.name}]`
          }
        } else {
          content = `[Unsupported file type: ${file.name}]`
        }

        uploadedFiles.push({
          file,
          content,
          type: file.type === 'text/plain' ? 'text' : 'document'
        })
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error)
        alert(`Error processing file ${file.name}`)
      }
    }

    onFilesUploaded(uploadedFiles)
  }, [onFilesUploaded])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFiles(files)
    }
  }, [processFiles])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFiles(files)
    }
  }, [processFiles])

  return (
    <div className="space-y-4">
      <div
        className={`upload-zone ${isDragActive ? 'dragover' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Documents
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              Drag and drop your files here, or click to browse
            </p>
            <p className="text-xs text-gray-500 text-center">
              Supported formats: .txt, .doc, .docx, Google Docs
            </p>
          </div>
          
          <div className="flex justify-center">
            <label className="btn-primary cursor-pointer">
              Choose Files
              <input
                type="file"
                className="hidden"
                multiple
                accept=".txt,.doc,.docx,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                onChange={handleFileInput}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">
              Google Docs Integration
            </h4>
            <p className="text-sm text-blue-700">
              To upload Google Docs, connect your Google Drive account using the button in the top right, 
              then share the document link in the instructions section.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}