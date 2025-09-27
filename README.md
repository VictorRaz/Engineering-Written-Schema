# Engineering Written Schema Document Generator

A modern web application for generating UK & Ireland compliant engineering schema documents using AI.

## Features

- **File Upload**: Support for .txt, .doc, and .docx files with drag-and-drop interface
- **AI-Powered Generation**: Intelligent schema generation based on uploaded documents and instructions
- **UK & Ireland Compliance**: Built-in compliance with BS EN standards, CDM regulations, and building codes
- **Google Drive Integration**: Connect and upload generated schemas directly to Google Drive
- **Modern UI**: Responsive design with clean, professional interface
- **Export Options**: Download as Markdown, copy to clipboard, or upload to Drive

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Document Processing**: Mammoth.js for Word documents
- **Cloud Integration**: Google Drive API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd engineering-written-schema
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

### Building for Production

```bash
npm run build
```

### Deployment

This project is configured for GitHub Pages deployment using GitHub Actions.

## Usage

1. **Upload Documents**: Drag and drop or click to upload .txt, .doc, or .docx files
2. **Enter Instructions**: Provide detailed requirements and specifications
3. **Connect Google Drive** (optional): For direct upload capabilities
4. **Generate Schema**: Click to process documents and generate schema
5. **Export**: Download, copy, or upload the generated schema

## Compliance

This application generates schemas that comply with:
- BS EN standards
- CDM regulations  
- UK Building regulations
- Irish building codes
- Health & safety requirements

## License

This project is licensed under the ISC License.