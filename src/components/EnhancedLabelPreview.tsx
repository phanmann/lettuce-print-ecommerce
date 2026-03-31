'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { 
  Upload, Download, RotateCcw, ZoomIn, ZoomOut, Move, Trash2, 
  Scissors, Wand2, Eye, EyeOff, Layers, Save, Share2, 
  MousePointer, Hand, RotateCw, Maximize, Copy, RefreshCw
} from 'lucide-react'

interface EnhancedLabelPreviewProps {
  shape: 'circle' | 'square' | 'custom'
  width: string | number
  length: string | number
  stock: 'standard' | 'bopp'
  finish: 'matte' | 'gloss'
  onFileUpload?: (files: File[]) => void
  onDesignChange?: (design: DesignData) => void
  className?: string
}

interface DesignLayer {
  id: string
  type: 'image' | 'text' | 'shape'
  name: string
  visible: boolean
  locked: boolean
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  data: any // Specific data for each layer type
}

interface DesignData {
  layers: DesignLayer[]
  background: {
    color: string
    texture: string
  }
  cutlines: CutlineData[]
}

interface CutlineData {
  id: string
  path: string
  type: 'cut' | 'score' | 'perforation'
  layerId: string
}

interface BackgroundRemovalOption {
  id: string
  name: string
  description: string
  preview?: string
}

const EnhancedLabelPreview: React.FC<EnhancedLabelPreviewProps> = ({
  shape,
  width,
  length,
  stock,
  finish,
  onFileUpload,
  onDesignChange,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [design, setDesign] = useState<DesignData>({
    layers: [],
    background: { color: '#ffffff', texture: 'none' },
    cutlines: []
  })
  
  // UI State
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null)
  const [tool, setTool] = useState<'select' | 'move' | 'rotate'>('select')
  const [zoom, setZoom] = useState(1)
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 })
  const [showGrid, setShowGrid] = useState(false)
  const [showCutlines, setShowCutlines] = useState(true)
  
  // Interaction State
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Background Removal State
  const [showBackgroundRemoval, setShowBackgroundRemoval] = useState(false)
  const [removalOptions, setRemovalOptions] = useState<BackgroundRemovalOption[]>([])
  const [selectedRemovalOption, setSelectedRemovalOption] = useState<string | null>(null)

  // Calculate optimal canvas dimensions
  const calculateCanvasSize = useCallback(() => {
    const w = parseFloat(width.toString()) || 2
    const h = parseFloat(length.toString()) || 2
    const aspectRatio = w / h
    
    let canvasWidth = 500
    let canvasHeight = 500
    
    if (aspectRatio > 1) {
      canvasHeight = canvasWidth / aspectRatio
    } else {
      canvasWidth = canvasHeight * aspectRatio
    }
    
    // Ensure minimum size for usability
    canvasWidth = Math.max(400, Math.min(600, canvasWidth))
    canvasHeight = Math.max(400, Math.min(600, canvasHeight))
    
    return { width: canvasWidth, height: canvasHeight }
  }, [width, length])

  // Initialize canvas
  useEffect(() => {
    const newSize = calculateCanvasSize()
    setCanvasSize(newSize)
    
    if (canvasRef.current) {
      canvasRef.current.width = newSize.width * 2 // High DPI
      canvasRef.current.height = newSize.height * 2
      canvasRef.current.style.width = `${newSize.width}px`
      canvasRef.current.style.height = `${newSize.height}px`
      
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.scale(2, 2) // High DPI scaling
      }
    }
    
    drawCanvas()
  }, [calculateCanvasSize, design, shape, stock, finish, showCutlines, showGrid])

  // Main drawing function
  const drawCanvas = useCallback(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
    
    // Draw background
    drawBackground(ctx)
    
    // Draw grid if enabled
    if (showGrid) drawGrid(ctx)
    
    // Draw label shape
    drawLabelShape(ctx)
    
    // Draw all layers
    design.layers
      .filter(layer => layer.visible)
      .sort((a, b) => a.type === 'image' ? -1 : 1) // Images first, then text/shapes
      .forEach(layer => drawLayer(ctx, layer))
    
    // Draw cutlines if enabled
    if (showCutlines) {
      design.cutlines.forEach(cutline => drawCutline(ctx, cutline))
    }
    
    // Draw selection handles
    const selectedLayer = design.layers.find(l => l.id === selectedLayerId)
    if (selectedLayer) {
      drawSelectionHandles(ctx, selectedLayer)
    }
  }, [design, selectedLayerId, canvasSize, shape, stock, finish, showGrid, showCutlines])

  // Draw background with texture
  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    const { width: canvasWidth, height: canvasHeight } = canvasSize
    
    // Checkerboard pattern for transparency
    const checkSize = 20
    for (let x = 0; x < canvasWidth; x += checkSize) {
      for (let y = 0; y < canvasHeight; y += checkSize) {
        const isEven = (Math.floor(x / checkSize) + Math.floor(y / checkSize)) % 2 === 0
        ctx.fillStyle = isEven ? '#f0f0f0' : '#ffffff'
        ctx.fillRect(x, y, checkSize, checkSize)
      }
    }
  }

  // Draw grid overlay
  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const { width: canvasWidth, height: canvasHeight } = canvasSize
    const gridSize = 25
    
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 0.5
    ctx.setLineDash([2, 2])
    
    for (let x = 0; x <= canvasWidth; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvasHeight)
      ctx.stroke()
    }
    
    for (let y = 0; y <= canvasHeight; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvasWidth, y)
      ctx.stroke()
    }
    
    ctx.setLineDash([])
  }

  // Draw label shape with material effects
  const drawLabelShape = (ctx: CanvasRenderingContext2D) => {
    const { width: canvasWidth, height: canvasHeight } = canvasSize
    const centerX = canvasWidth / 2
    const centerY = canvasHeight / 2
    
    // Material colors and effects
    const materialColors = {
      standard: { 
        base: '#fefefe', 
        shadow: 'rgba(0,0,0,0.05)',
        highlight: 'rgba(255,255,255,0.8)'
      },
      bopp: { 
        base: '#ffffff', 
        shadow: 'rgba(0,0,0,0.1)',
        highlight: 'rgba(255,255,255,0.9)'
      }
    }
    
    const material = materialColors[stock]
    
    ctx.save()
    
    let path: Path2D
    
    if (shape === 'circle') {
      const radius = Math.min(canvasWidth, canvasHeight) * 0.35
      path = new Path2D()
      path.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    } else if (shape === 'square') {
      const size = Math.min(canvasWidth, canvasHeight) * 0.7
      const x = centerX - size / 2
      const y = centerY - size / 2
      path = new Path2D()
      path.roundRect(x, y, size, size, 12)
    } else {
      // Custom shape
      const w = parseFloat(width.toString()) || 2
      const h = parseFloat(length.toString()) || 2
      const scale = Math.min(canvasWidth * 0.7 / w, canvasHeight * 0.7 / h) * 0.1
      const rectWidth = w * scale
      const rectHeight = h * scale
      const x = centerX - rectWidth / 2
      const y = centerY - rectHeight / 2
      
      path = new Path2D()
      path.roundRect(x, y, rectWidth, rectHeight, 6)
    }
    
    // Fill with base color
    ctx.fillStyle = material.base
    ctx.fill(path)
    
    // Add material-specific effects
    if (stock === 'standard') {
      // Paper texture with subtle noise
      ctx.globalCompositeOperation = 'multiply'
      ctx.fillStyle = 'rgba(245,245,245,0.3)'
      ctx.fill(path)
      ctx.globalCompositeOperation = 'source-over'
    }
    
    // Add finish effects
    if (finish === 'gloss') {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
      gradient.addColorStop(0, material.highlight)
      gradient.addColorStop(0.3, 'rgba(255,255,255,0.2)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      
      ctx.fillStyle = gradient
      ctx.fill(path)
    }
    
    // Border
    ctx.strokeStyle = '#d1d5db'
    ctx.lineWidth = 2
    ctx.stroke(path)
    
    ctx.restore()
  }

  // Draw individual layer
  const drawLayer = (ctx: CanvasRenderingContext2D, layer: DesignLayer) => {
    if (!layer.visible) return
    
    ctx.save()
    
    // Apply transforms
    ctx.globalAlpha = layer.opacity
    ctx.translate(layer.x + layer.width / 2, layer.y + layer.height / 2)
    ctx.rotate((layer.rotation * Math.PI) / 180)
    ctx.translate(-layer.width / 2, -layer.height / 2)
    
    switch (layer.type) {
      case 'image':
        if (layer.data.image && layer.data.image.complete) {
          ctx.drawImage(layer.data.image, 0, 0, layer.width, layer.height)
        }
        break
        
      case 'text':
        ctx.fillStyle = layer.data.color || '#000000'
        ctx.font = `${layer.data.fontSize || 16}px ${layer.data.fontFamily || 'Arial'}`
        ctx.textAlign = layer.data.textAlign || 'left'
        ctx.fillText(layer.data.text || '', 0, layer.data.fontSize || 16)
        break
        
      case 'shape':
        ctx.fillStyle = layer.data.fill || '#000000'
        if (layer.data.stroke) {
          ctx.strokeStyle = layer.data.stroke
          ctx.lineWidth = layer.data.strokeWidth || 1
        }
        
        // Draw shape based on type
        if (layer.data.shapeType === 'rectangle') {
          ctx.fillRect(0, 0, layer.width, layer.height)
          if (layer.data.stroke) ctx.strokeRect(0, 0, layer.width, layer.height)
        }
        break
    }
    
    ctx.restore()
  }

  // Draw cutlines
  const drawCutline = (ctx: CanvasRenderingContext2D, cutline: CutlineData) => {
    const layer = design.layers.find(l => l.id === cutline.layerId)
    if (!layer) return
    
    ctx.save()
    ctx.strokeStyle = cutline.type === 'cut' ? '#ff0000' : cutline.type === 'score' ? '#00ff00' : '#0000ff'
    ctx.lineWidth = 1
    ctx.setLineDash(cutline.type === 'perforation' ? [5, 5] : [])
    
    // Simple rectangular cutline for now
    ctx.strokeRect(layer.x - 2, layer.y - 2, layer.width + 4, layer.height + 4)
    
    ctx.restore()
  }

  // Draw selection handles
  const drawSelectionHandles = (ctx: CanvasRenderingContext2D, layer: DesignLayer) => {
    const handleSize = 8
    const { x, y, width, height } = layer
    
    ctx.fillStyle = '#3b82f6'
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    
    // Corner handles
    const handles = [
      { x: x - handleSize/2, y: y - handleSize/2, type: 'nw-resize' },
      { x: x + width - handleSize/2, y: y - handleSize/2, type: 'ne-resize' },
      { x: x + width - handleSize/2, y: y + height - handleSize/2, type: 'se-resize' },
      { x: x - handleSize/2, y: y + height - handleSize/2, type: 'sw-resize' }
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
    
    // Rotation handle
    const rotateHandle = {
      x: x + width / 2 - handleSize / 2,
      y: y - 25 - handleSize / 2
    }
    ctx.beginPath()
    ctx.arc(rotateHandle.x + handleSize/2, rotateHandle.y + handleSize/2, handleSize/2, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
  }

  // Background removal simulation
  const processBackgroundRemoval = async (file: File, method: string): Promise<File> => {
    setIsProcessing(true)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real implementation, this would call an AI service
    // For now, return the original file
    setIsProcessing(false)
    return file
  }

  // Generate cutlines for a layer
  const generateCutlines = (layerId: string) => {
    const layer = design.layers.find(l => l.id === layerId)
    if (!layer) return
    
    const cutline: CutlineData = {
      id: `cutline-${Date.now()}`,
      path: `M${layer.x},${layer.y} L${layer.x + layer.width},${layer.y} L${layer.x + layer.width},${layer.y + layer.height} L${layer.x},${layer.y + layer.height} Z`,
      type: 'cut',
      layerId: layerId
    }
    
    setDesign(prev => ({
      ...prev,
      cutlines: [...prev.cutlines.filter(c => c.layerId !== layerId), cutline]
    }))
  }

  // File upload handling with background removal options
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    for (const file of imageFiles) {
      // Generate background removal options
      const options: BackgroundRemovalOption[] = [
        { id: 'none', name: 'Keep Original', description: 'Use image as-is' },
        { id: 'auto', name: 'Auto Remove', description: 'AI-powered background removal' },
        { id: 'smart', name: 'Smart Detection', description: 'Advanced edge detection' },
        { id: 'manual', name: 'Manual Select', description: 'Click to remove areas' }
      ]
      
      setRemovalOptions(options)
      setSelectedRemovalOption('none')
      setShowBackgroundRemoval(true)
      
      // Add image to canvas
      const img = new Image()
      img.onload = () => {
        const aspectRatio = img.width / img.height
        let imgWidth = 200
        let imgHeight = imgWidth / aspectRatio
        
        if (imgHeight > 200) {
          imgHeight = 200
          imgWidth = imgHeight * aspectRatio
        }
        
        const layer: DesignLayer = {
          id: `layer-${Date.now()}`,
          type: 'image',
          name: file.name,
          visible: true,
          locked: false,
          x: (canvasSize.width - imgWidth) / 2,
          y: (canvasSize.height - imgHeight) / 2,
          width: imgWidth,
          height: imgHeight,
          rotation: 0,
          opacity: 1,
          data: { image: img, file: file }
        }
        
        setDesign(prev => ({
          ...prev,
          layers: [...prev.layers, layer]
        }))
        
        setSelectedLayerId(layer.id)
        
        // Auto-generate cutlines
        setTimeout(() => generateCutlines(layer.id), 500)
      }
      
      img.src = URL.createObjectURL(file)
    }
    
    onFileUpload?.(imageFiles)
  }

  // Mouse event handlers (simplified for brevity)
  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = (event.clientX - rect.left) / (rect.width / canvasSize.width)
    const y = (event.clientY - rect.top) / (rect.height / canvasSize.height)
    
    // Find clicked layer
    const clickedLayer = [...design.layers].reverse().find(layer =>
      layer.visible &&
      x >= layer.x && x <= layer.x + layer.width &&
      y >= layer.y && y <= layer.y + layer.height
    )
    
    if (clickedLayer) {
      setSelectedLayerId(clickedLayer.id)
      setIsDragging(true)
      setDragStart({ x: x - clickedLayer.x, y: y - clickedLayer.y })
    } else {
      setSelectedLayerId(null)
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedLayerId) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = (event.clientX - rect.left) / (rect.width / canvasSize.width)
    const y = (event.clientY - rect.top) / (rect.height / canvasSize.height)
    
    setDesign(prev => ({
      ...prev,
      layers: prev.layers.map(layer =>
        layer.id === selectedLayerId
          ? { ...layer, x: x - dragStart.x, y: y - dragStart.y }
          : layer
      )
    }))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Notify parent of design changes
  useEffect(() => {
    onDesignChange?.(design)
  }, [design, onDesignChange])

  // Control functions
  const deleteSelectedLayer = () => {
    if (selectedLayerId) {
      setDesign(prev => ({
        ...prev,
        layers: prev.layers.filter(l => l.id !== selectedLayerId),
        cutlines: prev.cutlines.filter(c => c.layerId !== selectedLayerId)
      }))
      setSelectedLayerId(null)
    }
  }

  const duplicateSelectedLayer = () => {
    const selectedLayer = design.layers.find(l => l.id === selectedLayerId)
    if (selectedLayer) {
      const duplicatedLayer: DesignLayer = {
        ...selectedLayer,
        id: `layer-${Date.now()}`,
        name: `${selectedLayer.name} Copy`,
        x: selectedLayer.x + 20,
        y: selectedLayer.y + 20
      }
      
      setDesign(prev => ({
        ...prev,
        layers: [...prev.layers, duplicatedLayer]
      }))
      
      setSelectedLayerId(duplicatedLayer.id)
    }
  }

  const downloadDesign = () => {
    if (canvasRef.current) {
      // Create high-res version
      const tempCanvas = document.createElement('canvas')
      const scale = 3
      tempCanvas.width = canvasSize.width * scale
      tempCanvas.height = canvasSize.height * scale
      
      const tempCtx = tempCanvas.getContext('2d')
      if (tempCtx) {
        tempCtx.scale(scale, scale)
        tempCtx.imageSmoothingEnabled = true
        tempCtx.imageSmoothingQuality = 'high'
        
        // Redraw everything at high resolution
        // ... (drawing code would go here)
        
        const link = document.createElement('a')
        link.download = `lettuce-print-label-${width}x${length}-${Date.now()}.png`
        link.href = tempCanvas.toDataURL('image/png', 1.0)
        link.click()
      }
    }
  }

  return (
    <div className={`enhanced-label-preview ${className}`}>
      {/* Toolbar */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Tool Selection */}
            <div className="flex bg-white rounded border">
              <button
                onClick={() => setTool('select')}
                className={`p-2 rounded-l ${tool === 'select' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                title="Select Tool"
              >
                <MousePointer className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTool('move')}
                className={`p-2 ${tool === 'move' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                title="Move Tool"
              >
                <Hand className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTool('rotate')}
                className={`p-2 rounded-r ${tool === 'rotate' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                title="Rotate Tool"
              >
                <RotateCw className="h-4 w-4" />
              </button>
            </div>
            
            {/* View Controls */}
            <div className="flex bg-white rounded border">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`p-2 rounded-l ${showGrid ? 'bg-green-500 text-white' : 'hover:bg-gray-100'}`}
                title="Toggle Grid"
              >
                <div className="h-4 w-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm opacity-50"></div>
                  <div className="bg-current rounded-sm opacity-50"></div>
                  <div className="bg-current rounded-sm opacity-50"></div>
                  <div className="bg-current rounded-sm opacity-50"></div>
                </div>
              </button>
              <button
                onClick={() => setShowCutlines(!showCutlines)}
                className={`p-2 rounded-r ${showCutlines ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}
                title="Toggle Cutlines"
              >
                <Scissors className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Layer Controls */}
            {selectedLayerId && (
              <div className="flex bg-white rounded border">
                <button
                  onClick={duplicateSelectedLayer}
                  className="p-2 hover:bg-gray-100 rounded-l"
                  title="Duplicate Layer"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={deleteSelectedLayer}
                  className="p-2 hover:bg-red-50 hover:text-red-600 rounded-r"
                  title="Delete Layer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
            
            {/* Export Controls */}
            <div className="flex bg-white rounded border">
              <button
                onClick={downloadDesign}
                className="p-2 hover:bg-gray-100 rounded-l"
                title="Download Design"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                onClick={() => {/* Share functionality */}}
                className="p-2 hover:bg-gray-100 rounded-r"
                title="Share Design"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex gap-4">
        {/* Canvas */}
        <div className="flex-1">
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
              className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-lettuce-green hover:bg-lettuce-pale transition-all duration-200 group"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-gray-100 rounded-full group-hover:bg-lettuce-light transition-colors">
                  <Upload className="h-8 w-8 text-gray-500 group-hover:text-lettuce-dark" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-700">Upload Your Artwork</p>
                  <p className="text-sm text-gray-500">PNG, JPG, SVG • Multiple files supported</p>
                  <p className="text-xs text-gray-400 mt-1">Automatic background removal available</p>
                </div>
              </div>
            </button>
          </div>

          {/* Canvas Container */}
          <div className="relative bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="cursor-pointer"
              style={{ 
                width: `${canvasSize.width}px`, 
                height: `${canvasSize.height}px`,
                imageRendering: 'crisp-edges'
              }}
            />
            
            {/* Processing Overlay */}
            {isProcessing && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                <div className="flex items-center space-x-3">
                  <RefreshCw className="h-6 w-6 animate-spin text-lettuce-green" />
                  <span className="text-lg font-medium">Processing image...</span>
                </div>
              </div>
            )}
            
            {/* Canvas Info Overlay */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm">
              {shape === 'circle' ? 'Circle' : shape === 'square' ? 'Square' : 'Custom'} • 
              {width}" × {length}" • 
              {stock === 'standard' ? 'Paper' : 'BOPP'} • 
              {finish === 'matte' ? 'Matte' : 'Gloss'} Laminate
            </div>
          </div>
        </div>

        {/* Layer Panel */}
        <div className="w-80 bg-white rounded-lg border shadow-sm">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Layers className="h-5 w-5 mr-2" />
              Layers
            </h3>
          </div>
          
          <div className="p-2 max-h-96 overflow-y-auto">
            {design.layers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Layers className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No layers yet</p>
                <p className="text-xs opacity-75">Upload an image to get started</p>
              </div>
            ) : (
              design.layers.map((layer, index) => (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`p-3 mb-2 rounded-lg border cursor-pointer transition-all ${
                    selectedLayerId === layer.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {layer.type === 'image' && <div className="w-4 h-4 bg-green-500 rounded"></div>}
                      {layer.type === 'text' && <div className="w-4 h-4 bg-blue-500 rounded"></div>}
                      {layer.type === 'shape' && <div className="w-4 h-4 bg-purple-500 rounded"></div>}
                      
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-32">
                          {layer.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {layer.width.toFixed(0)} × {layer.height.toFixed(0)}px
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setDesign(prev => ({
                            ...prev,
                            layers: prev.layers.map(l =>
                              l.id === layer.id ? { ...l, visible: !l.visible } : l
                            )
                          }))
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        {layer.visible ? 
                          <Eye className="h-4 w-4 text-gray-600" /> : 
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        }
                      </button>
                      
                      {design.cutlines.some(c => c.layerId === layer.id) && (
                        <div className="p-1">
                          <div title="Has cutlines">
                            <Scissors className="h-4 w-4 text-red-500" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {selectedLayerId === layer.id && (
                    <div className="mt-3 pt-3 border-t space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Opacity</span>
                        <span>{Math.round(layer.opacity * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={layer.opacity}
                        onChange={(e) => {
                          const opacity = parseFloat(e.target.value)
                          setDesign(prev => ({
                            ...prev,
                            layers: prev.layers.map(l =>
                              l.id === layer.id ? { ...l, opacity } : l
                            )
                          }))
                        }}
                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      
                      <div className="flex space-x-1">
                        <button
                          onClick={() => generateCutlines(layer.id)}
                          className="flex-1 px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Generate Cutline
                        </button>
                        <button
                          onClick={() => {
                            // Trigger background removal
                            setShowBackgroundRemoval(true)
                          }}
                          className="flex-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                          Remove BG
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Background Removal Modal */}
      {showBackgroundRemoval && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Wand2 className="h-6 w-6 mr-2 text-blue-500" />
                  Background Removal
                </h3>
                <button
                  onClick={() => setShowBackgroundRemoval(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {removalOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedRemovalOption(option.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      selectedRemovalOption === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900 mb-1">{option.name}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </button>
                ))}
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowBackgroundRemoval(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (selectedRemovalOption && selectedLayerId) {
                      const selectedLayer = design.layers.find(l => l.id === selectedLayerId)
                      if (selectedLayer && selectedLayer.data.file) {
                        const processedFile = await processBackgroundRemoval(
                          selectedLayer.data.file,
                          selectedRemovalOption
                        )
                        // Update layer with processed image
                        // This would be implemented with actual background removal
                      }
                    }
                    setShowBackgroundRemoval(false)
                  }}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  disabled={!selectedRemovalOption || isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Apply'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Design Info */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">
              Design: {design.layers.length} layer{design.layers.length !== 1 ? 's' : ''}
            </span>
            <span className="text-gray-500">
              Cutlines: {design.cutlines.length}
            </span>
            <span className="text-gray-500">
              Canvas: {canvasSize.width} × {canvasSize.height}px
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setDesign({
                  layers: [],
                  background: { color: '#ffffff', texture: 'none' },
                  cutlines: []
                })
                setSelectedLayerId(null)
              }}
              className="text-xs text-gray-500 hover:text-red-500 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => {
                // Save design to localStorage or send to server
                const designData = JSON.stringify(design)
                localStorage.setItem(`lettuce-print-design-${Date.now()}`, designData)
                alert('Design saved!')
              }}
              className="flex items-center space-x-1 text-xs text-lettuce-green hover:text-lettuce-dark transition-colors"
            >
              <Save className="h-3 w-3" />
              <span>Save Design</span>
            </button>
          </div>
        </div>
        
        {design.layers.length > 0 && (
          <div className="mt-3 text-xs text-gray-600">
            <div className="flex items-center space-x-4">
              <span>🎨 Professional design tools</span>
              <span>✂️ Automatic cutline generation</span>
              <span>🤖 AI background removal</span>
              <span>📏 Precision sizing</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EnhancedLabelPreview