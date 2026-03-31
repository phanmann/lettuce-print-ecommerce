'use client'

import React from 'react'
import { Grid3X3, Info, Maximize, Copy } from 'lucide-react'

interface SheetArrangement {
  stickers: number
  layout: { cols: number; rows: number }
  stickerSize: { width: number; height: number }
  spacing: { x: number; y: number }
}

interface SheetLayout {
  id: string
  name: string
  sheetSize: { width: number; height: number }
  arrangements: SheetArrangement[]
}

interface SheetLayoutVisualizerProps {
  sheetLayout: SheetLayout
  selectedArrangement: number
  stickerShape: 'circle' | 'square' | 'custom'
  onArrangementChange: (index: number) => void
  className?: string
}

const SheetLayoutVisualizer: React.FC<SheetLayoutVisualizerProps> = ({
  sheetLayout,
  selectedArrangement,
  stickerShape,
  onArrangementChange,
  className = ''
}) => {
  const currentArrangement = sheetLayout.arrangements[selectedArrangement]
  
  // Calculate scale for visualization
  const maxDisplayWidth = 400
  const maxDisplayHeight = 500
  const scaleX = maxDisplayWidth / sheetLayout.sheetSize.width
  const scaleY = maxDisplayHeight / sheetLayout.sheetSize.height
  const scale = Math.min(scaleX, scaleY) * 0.8 // 80% to leave some margin
  
  const displayWidth = sheetLayout.sheetSize.width * scale
  const displayHeight = sheetLayout.sheetSize.height * scale

  return (
    <div className={`sheet-layout-visualizer ${className}`}>
      {/* Arrangement Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Stickers per Sheet
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {sheetLayout.arrangements.map((arrangement, index) => (
            <button
              key={index}
              onClick={() => onArrangementChange(index)}
              className={`p-3 rounded-lg border-2 transition-all text-center ${
                selectedArrangement === index
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="font-bold text-lg">{arrangement.stickers}</div>
              <div className="text-xs opacity-75">
                {arrangement.layout.cols}×{arrangement.layout.rows}
              </div>
              <div className="text-xs opacity-75">
                {arrangement.stickerSize.width.toFixed(1)}" × {arrangement.stickerSize.height.toFixed(1)}"
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sheet Visualization */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900 flex items-center">
            <Grid3X3 className="h-4 w-4 mr-2" />
            Sheet Preview
          </h3>
          <div className="text-sm text-gray-500">
            {currentArrangement.stickers} stickers per sheet
          </div>
        </div>
        
        <div className="flex justify-center bg-gray-50 rounded-lg p-6">
          <div className="relative">
            {/* Sheet */}
            <div 
              className="bg-white border-2 border-gray-300 shadow-lg relative rounded"
              style={{
                width: `${displayWidth}px`,
                height: `${displayHeight}px`
              }}
            >
              {/* Grid of stickers */}
              <div 
                className="grid gap-px h-full w-full p-2"
                style={{ 
                  gridTemplateColumns: `repeat(${currentArrangement.layout.cols}, 1fr)`,
                  gridTemplateRows: `repeat(${currentArrangement.layout.rows}, 1fr)`,
                  gap: `${Math.max(1, currentArrangement.spacing.x * scale / 4)}px`
                }}
              >
                {Array.from({ length: currentArrangement.stickers }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200 flex items-center justify-center text-xs font-medium text-blue-600 relative overflow-hidden"
                    style={{
                      borderRadius: stickerShape === 'circle' ? '50%' : '4px'
                    }}
                  >
                    {/* Sticker content representation */}
                    <div 
                      className="bg-blue-200 flex items-center justify-center text-blue-800 font-bold"
                      style={{
                        width: stickerShape === 'circle' ? '70%' : '80%',
                        height: stickerShape === 'circle' ? '70%' : '80%',
                        borderRadius: stickerShape === 'circle' ? '50%' : '2px'
                      }}
                    >
                      {index + 1}
                    </div>
                    
                    {/* Cut lines indicator */}
                    <div 
                      className="absolute inset-0 border border-red-400 border-dashed opacity-40"
                      style={{
                        borderRadius: stickerShape === 'circle' ? '50%' : '4px'
                      }}
                    ></div>
                  </div>
                ))}
              </div>
              
              {/* Corner marks */}
              <div className="absolute -top-3 -left-3 w-2 h-2 border-l-2 border-t-2 border-gray-400"></div>
              <div className="absolute -top-3 -right-3 w-2 h-2 border-r-2 border-t-2 border-gray-400"></div>
              <div className="absolute -bottom-3 -left-3 w-2 h-2 border-l-2 border-b-2 border-gray-400"></div>
              <div className="absolute -bottom-3 -right-3 w-2 h-2 border-r-2 border-b-2 border-gray-400"></div>
            </div>
            
            {/* Sheet dimensions */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
              {sheetLayout.sheetSize.width}" × {sheetLayout.sheetSize.height}" sheet
            </div>
            
            {/* Scale reference */}
            <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
              <div className="text-xs text-gray-400 writing-mode-vertical rotate-180">
                Scale: {Math.round(scale * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">{currentArrangement.stickers}</div>
          <div className="text-sm text-gray-600">Stickers</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">
            {currentArrangement.stickerSize.width.toFixed(1)}"
          </div>
          <div className="text-sm text-gray-600">Width</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {currentArrangement.stickerSize.height.toFixed(1)}"
          </div>
          <div className="text-sm text-gray-600">Height</div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {(currentArrangement.stickerSize.width * currentArrangement.stickerSize.height).toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Sq. In.</div>
        </div>
      </div>

      {/* Layout Details */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Info className="h-4 w-4 text-blue-500 mr-2" />
          <span className="font-medium text-gray-900">Layout Details</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="flex justify-between">
              <span className="text-gray-600">Grid layout:</span>
              <span className="font-medium">{currentArrangement.layout.cols} × {currentArrangement.layout.rows}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sticker spacing:</span>
              <span className="font-medium">{currentArrangement.spacing.x}" margins</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sheet utilization:</span>
              <span className="font-medium">
                {Math.round((currentArrangement.stickers * currentArrangement.stickerSize.width * currentArrangement.stickerSize.height) / (sheetLayout.sheetSize.width * sheetLayout.sheetSize.height) * 100)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Material waste:</span>
              <span className="font-medium">
                {Math.round((1 - (currentArrangement.stickers * currentArrangement.stickerSize.width * currentArrangement.stickerSize.height) / (sheetLayout.sheetSize.width * sheetLayout.sheetSize.height)) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Efficiency Tips */}
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Info className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <div className="font-medium mb-1">Efficiency Tips:</div>
            {currentArrangement.stickers <= 4 && (
              <p>• Consider smaller individual sizes to fit more stickers per sheet</p>
            )}
            {currentArrangement.stickers >= 20 && (
              <p>• Great efficiency! This layout minimizes material waste</p>
            )}
            {(currentArrangement.stickerSize.width * currentArrangement.stickerSize.height) / (sheetLayout.sheetSize.width * sheetLayout.sheetSize.height) < 0.3 && (
              <p>• Low sheet utilization - consider adjusting sticker size or layout</p>
            )}
            <p>• Die-cut stickers work best with at least 0.125" spacing between elements</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button 
          onClick={() => {
            // Copy layout info to clipboard
            const layoutInfo = `${sheetLayout.name}: ${currentArrangement.stickers} stickers (${currentArrangement.stickerSize.width.toFixed(1)}" × ${currentArrangement.stickerSize.height.toFixed(1)}" each)`
            navigator.clipboard.writeText(layoutInfo)
          }}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Copy className="h-3 w-3" />
          <span>Copy Layout Info</span>
        </button>
        
        <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Maximize className="h-3 w-3" />
          <span>Fullscreen Preview</span>
        </button>
      </div>
    </div>
  )
}

export default SheetLayoutVisualizer