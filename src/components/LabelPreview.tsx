'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Upload, Download, RotateCcw, ZoomIn, ZoomOut, Move, Trash2, MousePointer } from 'lucide-react'

interface LabelPreviewProps {
  shape: 'circle' | 'square' | 'custom'
  width: string | number
  length: string | number
  stock: 'standard' | 'bopp'
  finish: 'matte' | 'gloss'
  onFileUpload?: (files: File[]) => void
  className?: string
}

interface UploadedImage {
  id: string
  file: File
  image: HTMLImageElement
  x: number
  y: number
  width: number
  height: number
  rotation: number
  selected: boolean
}

const LabelPreview: React.FC<LabelPreviewProps> = ({
  shape,
  width,
  length,
  stock,
  finish,
  onFileUpload,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 })

  // Calculate canvas dimensions based on label size
  const calculateCanvasSize = useCallback(() => {
    const w = parseFloat(width.toString()) || 2
    const h = parseFloat(length.toString()) || 2
    const aspectRatio = w / h
    
    let canvasWidth = 400
    let canvasHeight = 400
    
    if (aspectRatio > 1) {
      canvasHeight = canvasWidth / aspectRatio
    } else {
      canvasWidth = canvasHeight * aspectRatio
    }
    
    canvasWidth = Math.max(300, Math.min(500, canvasWidth))
    canvasHeight = Math.max(300, Math.min(500, canvasHeight))
    
    return { width: canvasWidth, height: canvasHeight }
  }, [width, length])

  // Update canvas size when dimensions change
  useEffect(() => {
    const newSize = calculateCanvasSize()
    setCanvasSize(newSize)
    
    if (canvasRef.current) {
      canvasRef.current.width = newSize.width
      canvasRef.current.height = newSize.height
      drawCanvas()
    }
  }, [calculateCanvasSize, shape, stock, finish])

  // Draw the canvas
  const drawCanvas = useCallback(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw background
    ctx.fillStyle = '#f8f9fa'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw label shape
    drawLabelShape(ctx)
    
    // Draw uploaded images
    uploadedImages.forEach(img => drawImage(ctx, img))
    
    // Draw selection handles for selected image
    const selectedImage = uploadedImages.find(img => img.id === selectedImageId)
    if (selectedImage) {
      drawSelectionHandles(ctx, selectedImage)
    }
  }, [uploadedImages, selectedImageId, shape, stock, finish, canvasSize])

  // Draw the label shape
  const drawLabelShape = (ctx: CanvasRenderingContext2D) => {
    const { width: canvasWidth, height: canvasHeight } = canvasSize
    const centerX = canvasWidth / 2
    const centerY = canvasHeight / 2
    
    // Stock colors
    const stockColors = {
      standard: '#fefefe', // Paper white
      bopp: '#ffffff'      // BOPP white
    }
    
    ctx.save()
    
    if (shape === 'circle') {
      const radius = Math.min(canvasWidth, canvasHeight) * 0.4
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.fillStyle = stockColors[stock]
      ctx.fill()
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 2
      ctx.stroke()
    } else if (shape === 'square') {
      const size = Math.min(canvasWidth, canvasHeight) * 0.8
      const x = centerX - size / 2
      const y = centerY - size / 2
      
      // Rounded rectangle
      const radius = 8
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + size - radius, y)
      ctx.quadraticCurveTo(x + size, y, x + size, y + radius)
      ctx.lineTo(x + size, y + size - radius)
      ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size)
      ctx.lineTo(x + radius, y + size)
      ctx.quadraticCurveTo(x, y + size, x, y + size - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()
      
      ctx.fillStyle = stockColors[stock]
      ctx.fill()
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 2
      ctx.stroke()
    } else {
      // Custom shape - rectangle with label proportions
      const w = parseFloat(width.toString()) || 2
      const h = parseFloat(length.toString()) || 2
      const scale = Math.min(canvasWidth * 0.8 / w, canvasHeight * 0.8 / h) * 0.1
      const rectWidth = w * scale
      const rectHeight = h * scale
      const x = centerX - rectWidth / 2
      const y = centerY - rectHeight / 2
      
      ctx.beginPath()
      ctx.roundRect(x, y, rectWidth, rectHeight, 4)
      ctx.fillStyle = stockColors[stock]
      ctx.fill()
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 2
      ctx.stroke()
    }
    
    // Add finish effects
    if (finish === 'gloss') {
      // Add subtle gradient overlay for gloss effect
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
      gradient.addColorStop(0, 'rgba(255,255,255,0.3)')
      gradient.addColorStop(0.5, 'rgba(255,255,255,0.1)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      
      ctx.fillStyle = gradient
      if (shape === 'circle') {
        const radius = Math.min(canvasWidth, canvasHeight) * 0.4
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
        ctx.fill()
      } else {
        ctx.fill()
      }
    }
    
    ctx.restore()
  }

  // Draw an uploaded image
  const drawImage = (ctx: CanvasRenderingContext2D, imageData: UploadedImage) => {
    ctx.save()
    
    // Apply transformations
    ctx.translate(imageData.x + imageData.width / 2, imageData.y + imageData.height / 2)
    ctx.rotate((imageData.rotation * Math.PI) / 180)
    ctx.translate(-imageData.width / 2, -imageData.height / 2)
    
    // Draw the image
    ctx.drawImage(imageData.image, 0, 0, imageData.width, imageData.height)
    
    ctx.restore()
  }

  // Draw selection handles
  const drawSelectionHandles = (ctx: CanvasRenderingContext2D, imageData: UploadedImage) => {
    const handleSize = 8
    const { x, y, width, height } = imageData
    
    ctx.fillStyle = '#3b82f6'
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    
    // Corner handles
    const handles = [
      { x: x - handleSize/2, y: y - handleSize/2 },
      { x: x + width - handleSize/2, y: y - handleSize/2 },
      { x: x + width - handleSize/2, y: y + height - handleSize/2 },
      { x: x - handleSize/2, y: y + height - handleSize/2 }
    ]
    
    handles.forEach(handle => {
      ctx.fillRect(handle.x, handle.y, handleSize, handleSize)
      ctx.strokeRect(handle.x, handle.y, handleSize, handleSize)
    })
    
    // Selection border
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.strokeRect(x, y, width, height)
    ctx.setLineDash([])
  }

  // Handle file upload
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    imageFiles.forEach(file => {
      const img = new Image()
      img.onload = () => {
        const aspectRatio = img.width / img.height
        let imgWidth = 150
        let imgHeight = imgWidth / aspectRatio
        
        if (imgHeight > 150) {
          imgHeight = 150
          imgWidth = imgHeight * aspectRatio
        }
        
        const newImage: UploadedImage = {
          id: Date.now().toString() + Math.random(),
          file,
          image: img,
          x: (canvasSize.width - imgWidth) / 2,
          y: (canvasSize.height - imgHeight) / 2,
          width: imgWidth,
          height: imgHeight,
          rotation: 0,
          selected: false
        }
        
        setUploadedImages(prev => [...prev, newImage])
        setSelectedImageId(newImage.id)
        drawCanvas()
      }
      
      img.src = URL.createObjectURL(file)
    })
    
    onFileUpload?.(imageFiles)
  }

  // Mouse event handlers
  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    // Check if clicking on an image
    const clickedImage = [...uploadedImages].reverse().find(img => 
      x >= img.x && x <= img.x + img.width && 
      y >= img.y && y <= img.y + img.height
    )
    
    if (clickedImage) {
      setSelectedImageId(clickedImage.id)
      setIsDragging(true)
      setDragStart({ x: x - clickedImage.x, y: y - clickedImage.y })
    } else {
      setSelectedImageId(null)
    }
    
    drawCanvas()
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedImageId) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    setUploadedImages(prev => prev.map(img => 
      img.id === selectedImageId 
        ? { ...img, x: x - dragStart.x, y: y - dragStart.y }
        : img
    ))
    
    drawCanvas()
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Redraw canvas when images change
  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  // Delete selected image
  const deleteSelected = () => {
    if (selectedImageId) {
      setUploadedImages(prev => prev.filter(img => img.id !== selectedImageId))
      setSelectedImageId(null)
      drawCanvas()
    }
  }

  // Clear all images
  const clearAll = () => {
    setUploadedImages([])
    setSelectedImageId(null)
    drawCanvas()
  }

  // Download preview
  const downloadPreview = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.download = `label-preview-${width}x${length}.png`
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

  return (
    <div className={`label-preview-container ${className}`}>
      {/* Upload Area */}
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-lettuce-green hover:bg-lettuce-pale transition-colors"
        >
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="text-sm font-medium text-gray-700">Upload Artwork</p>
            <p className="text-xs text-gray-500">PNG, JPG • Drag images to move</p>
          </div>
        </button>
      </div>

      {/* Canvas Container */}
      <div className="relative bg-gray-50 rounded-lg overflow-hidden shadow-inner border border-gray-200">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="cursor-pointer"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        
        {/* Canvas Controls */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          {selectedImageId && (
            <button
              onClick={deleteSelected}
              className="p-2 bg-red-500 text-white rounded shadow-sm hover:bg-red-600 transition-colors"
              title="Delete Selected"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={downloadPreview}
            className="p-2 bg-white rounded shadow-sm hover:bg-gray-50 transition-colors"
            title="Download Preview"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Preview Info */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center text-sm">
          <div>
            <span className="font-medium text-gray-700">
              {shape === 'circle' ? 'Circle' : shape === 'square' ? 'Square' : 'Custom'} • 
              {width}" × {length}" • 
              {stock === 'standard' ? 'Paper' : 'BOPP'} • 
              {finish === 'matte' ? 'Matte' : 'Gloss'} Laminate
            </span>
          </div>
          <div className="flex space-x-2">
            {uploadedImages.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-gray-500 hover:text-red-500 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
        
        {uploadedImages.length > 0 && (
          <div className="mt-2 text-xs text-gray-600">
            {uploadedImages.length} image{uploadedImages.length > 1 ? 's' : ''} uploaded • 
            Click to select • Drag to move
          </div>
        )}
      </div>
    </div>
  )
}

export default LabelPreview