import React from 'react'

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const PromptInput: React.FC<PromptInputProps> = ({ 
  value, 
  onChange, 
  placeholder 
}) => {
  return (
    <div className="space-y-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={8}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-900 mb-2">
            📋 Sample Instructions
          </h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Project scope and objectives</li>
            <li>• Technical requirements</li>
            <li>• Compliance standards needed</li>
            <li>• Timeline and deliverables</li>
          </ul>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-amber-900 mb-2">
            🌍 UK & Ireland Compliance
          </h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• BS EN standards</li>
            <li>• CDM regulations</li>
            <li>• Building regulations</li>
            <li>• Health & safety requirements</li>
          </ul>
        </div>
      </div>
      
      <div className="text-xs text-gray-500">
        Character count: {value.length} | Recommended: 200-1000 characters for optimal results
      </div>
    </div>
  )
}