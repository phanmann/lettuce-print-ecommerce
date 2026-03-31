// Production File Generator
// Generates print-ready and cut-ready files for professional printing

export interface ProductionSpecs {
  // Print specifications
  resolution: number // DPI
  colorSpace: 'CMYK' | 'RGB' | 'Pantone'
  bleed: number // mm
  safeZone: number // mm from edge
  
  // Cut specifications  
  cutType: 'die-cut' | 'kiss-cut' | 'through-cut'
  cutOffset: number // mm from artwork
  cutSpeed: number // For plotter settings
  cutPressure: number // For plotter settings
  
  // File formats
  printFormat: 'PDF' | 'PNG' | 'TIFF' | 'EPS'
  cutFormat: 'SVG' | 'DXF' | 'AI' | 'PDF'
  
  // Material specifications
  material: 'paper' | 'vinyl' | 'fabric' | 'plastic'
  thickness: number // mm
  adhesive: 'permanent' | 'removable' | 'none'
}

export interface ProductionFiles {
  printFile: {
    url: string
    format: string
    size: { width: number; height: number }
    resolution: number
    colorProfile: string
  }
  cutFile: {
    url: string
    format: string
    paths: Array<{
      id: string
      type: 'cut' | 'score' | 'perforation'
      path: string
      layerName: string
    }>
  }
  proofFile: {
    url: string
    format: string
    annotations: Array<{
      type: 'dimension' | 'note' | 'warning'
      text: string
      position: { x: number; y: number }
    }>
  }
  metadata: {
    jobId: string
    created: Date
    specs: ProductionSpecs
    estimatedTime: number // minutes
    materialUsage: number // square inches
    costEstimate: number
  }
}

export class ProductionFileGenerator {
  
  /**
   * Generate complete production file package
   */
  static async generateProductionFiles(
    designCanvas: HTMLCanvasElement,
    cutlines: Array<{ path: string; type: string }>,
    specs: ProductionSpecs
  ): Promise<ProductionFiles> {
    const jobId = `LP-${Date.now().toString(36).toUpperCase()}`
    
    // Generate high-resolution print file
    const printFile = await this.generatePrintFile(designCanvas, specs)
    
    // Generate cut file with proper formatting
    const cutFile = await this.generateCutFile(cutlines, specs)
    
    // Generate proof/preview file with annotations
    const proofFile = await this.generateProofFile(designCanvas, cutlines, specs)
    
    // Calculate metadata
    const metadata = this.calculateMetadata(jobId, designCanvas, specs)
    
    return {
      printFile,
      cutFile,
      proofFile,
      metadata
    }
  }
  
  /**
   * Generate high-resolution print-ready file
   */
  private static async generatePrintFile(
    canvas: HTMLCanvasElement,
    specs: ProductionSpecs
  ): Promise<ProductionFiles['printFile']> {
    // Create high-resolution canvas
    const scale = specs.resolution / 72 // Convert DPI to scale factor
    const printCanvas = document.createElement('canvas')
    const printCtx = printCanvas.getContext('2d')
    
    if (!printCtx) {
      throw new Error('Could not create print canvas context')
    }
    
    // Set canvas size with bleed
    const bleedPixels = (specs.bleed / 25.4) * specs.resolution // Convert mm to pixels
    printCanvas.width = (canvas.width * scale) + (bleedPixels * 2)
    printCanvas.height = (canvas.height * scale) + (bleedPixels * 2)
    
    // Configure for high quality
    printCtx.imageSmoothingEnabled = true
    printCtx.imageSmoothingQuality = 'high'
    
    // Add bleed background
    printCtx.fillStyle = '#ffffff'
    printCtx.fillRect(0, 0, printCanvas.width, printCanvas.height)
    
    // Scale and center original design
    printCtx.save()
    printCtx.translate(bleedPixels, bleedPixels)
    printCtx.scale(scale, scale)
    printCtx.drawImage(canvas, 0, 0)
    printCtx.restore()
    
    // Add crop marks if needed
    this.addCropMarks(printCtx, printCanvas.width, printCanvas.height, bleedPixels)
    
    // Add color bars for CMYK
    if (specs.colorSpace === 'CMYK') {
      this.addColorBars(printCtx, printCanvas.width, printCanvas.height)
    }
    
    // Convert to specified format
    const dataUrl = printCanvas.toDataURL('image/png', 1.0)
    
    return {
      url: dataUrl,
      format: specs.printFormat,
      size: {
        width: printCanvas.width,
        height: printCanvas.height
      },
      resolution: specs.resolution,
      colorProfile: specs.colorSpace
    }
  }
  
  /**
   * Generate cut file in professional format
   */
  private static async generateCutFile(
    cutlines: Array<{ path: string; type: string }>,
    specs: ProductionSpecs
  ): Promise<ProductionFiles['cutFile']> {
    const paths = cutlines.map((cutline, index) => ({
      id: `path-${index + 1}`,
      type: cutline.type as 'cut' | 'score' | 'perforation',
      path: this.scaleCutlinePath(cutline.path, specs.resolution / 72),
      layerName: `${cutline.type.toUpperCase()}_${index + 1}`
    }))
    
    let fileContent: string
    
    switch (specs.cutFormat) {
      case 'SVG':
        fileContent = this.generateSVGCutFile(paths, specs)
        break
      case 'DXF':
        fileContent = this.generateDXFCutFile(paths, specs)
        break
      case 'PDF':
        fileContent = this.generatePDFCutFile(paths, specs)
        break
      default:
        fileContent = this.generateSVGCutFile(paths, specs)
    }
    
    const blob = new Blob([fileContent], { 
      type: specs.cutFormat === 'SVG' ? 'image/svg+xml' : 'text/plain' 
    })
    
    return {
      url: URL.createObjectURL(blob),
      format: specs.cutFormat,
      paths
    }
  }
  
  /**
   * Generate proof file with annotations
   */
  private static async generateProofFile(
    canvas: HTMLCanvasElement,
    cutlines: Array<{ path: string; type: string }>,
    specs: ProductionSpecs
  ): Promise<ProductionFiles['proofFile']> {
    const proofCanvas = document.createElement('canvas')
    const proofCtx = proofCanvas.getContext('2d')
    
    if (!proofCtx) {
      throw new Error('Could not create proof canvas context')
    }
    
    // Set proof canvas size (slightly larger for annotations)
    proofCanvas.width = canvas.width + 200
    proofCanvas.height = canvas.height + 200
    
    // White background
    proofCtx.fillStyle = '#ffffff'
    proofCtx.fillRect(0, 0, proofCanvas.width, proofCanvas.height)
    
    // Draw original design centered
    proofCtx.drawImage(canvas, 100, 100)
    
    // Draw cutlines in red
    proofCtx.strokeStyle = '#ff0000'
    proofCtx.lineWidth = 2
    proofCtx.setLineDash([5, 5])
    
    cutlines.forEach(cutline => {
      const path2D = new Path2D(cutline.path)
      proofCtx.save()
      proofCtx.translate(100, 100)
      proofCtx.stroke(path2D)
      proofCtx.restore()
    })
    
    proofCtx.setLineDash([])
    
    // Add annotations
    const annotations = [
      {
        type: 'dimension' as const,
        text: `${canvas.width}" × ${canvas.height}"`,
        position: { x: 100 + canvas.width / 2, y: 80 }
      },
      {
        type: 'note' as const,
        text: `Material: ${specs.material}`,
        position: { x: 20, y: 30 }
      },
      {
        type: 'note' as const,
        text: `Cut Type: ${specs.cutType}`,
        position: { x: 20, y: 50 }
      },
      {
        type: 'note' as const,
        text: `Resolution: ${specs.resolution} DPI`,
        position: { x: 20, y: 70 }
      }
    ]
    
    // Draw annotations
    proofCtx.font = '14px Arial'
    proofCtx.fillStyle = '#333333'
    
    annotations.forEach(annotation => {
      proofCtx.fillText(annotation.text, annotation.position.x, annotation.position.y)
    })
    
    // Add legend
    this.addProofLegend(proofCtx, proofCanvas.width - 180, 100)
    
    return {
      url: proofCanvas.toDataURL('image/png', 1.0),
      format: 'PNG',
      annotations
    }
  }
  
  /**
   * Add crop marks to print file
   */
  private static addCropMarks(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    bleed: number
  ): void {
    const markLength = 20
    const markOffset = 10
    
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 1
    
    // Corner crop marks
    const corners = [
      { x: bleed, y: bleed }, // Top-left
      { x: width - bleed, y: bleed }, // Top-right
      { x: width - bleed, y: height - bleed }, // Bottom-right
      { x: bleed, y: height - bleed } // Bottom-left
    ]
    
    corners.forEach((corner, index) => {
      // Horizontal marks
      ctx.beginPath()
      if (index === 0 || index === 3) { // Left side
        ctx.moveTo(corner.x - markOffset - markLength, corner.y)
        ctx.lineTo(corner.x - markOffset, corner.y)
      } else { // Right side
        ctx.moveTo(corner.x + markOffset, corner.y)
        ctx.lineTo(corner.x + markOffset + markLength, corner.y)
      }
      ctx.stroke()
      
      // Vertical marks
      ctx.beginPath()
      if (index === 0 || index === 1) { // Top
        ctx.moveTo(corner.x, corner.y - markOffset - markLength)
        ctx.lineTo(corner.x, corner.y - markOffset)
      } else { // Bottom
        ctx.moveTo(corner.x, corner.y + markOffset)
        ctx.lineTo(corner.x, corner.y + markOffset + markLength)
      }
      ctx.stroke()
    })
  }
  
  /**
   * Add CMYK color bars
   */
  private static addColorBars(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void {
    const barWidth = 20
    const barHeight = 100
    const colors = [
      '#00ffff', // Cyan
      '#ff00ff', // Magenta  
      '#ffff00', // Yellow
      '#000000'  // Black
    ]
    
    colors.forEach((color, index) => {
      ctx.fillStyle = color
      ctx.fillRect(
        width - 50,
        height - 150 - (index * 25),
        barWidth,
        20
      )
    })
    
    // Add labels
    ctx.font = '10px Arial'
    ctx.fillStyle = '#000000'
    ctx.fillText('C M Y K', width - 48, height - 25)
  }
  
  /**
   * Add legend to proof file
   */
  private static addProofLegend(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ): void {
    // Legend box
    ctx.fillStyle = '#f8f9fa'
    ctx.fillRect(x, y, 160, 120)
    ctx.strokeStyle = '#dee2e6'
    ctx.strokeRect(x, y, 160, 120)
    
    // Title
    ctx.font = 'bold 12px Arial'
    ctx.fillStyle = '#212529'
    ctx.fillText('LEGEND', x + 10, y + 20)
    
    // Cut line example
    ctx.strokeStyle = '#ff0000'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(x + 10, y + 35)
    ctx.lineTo(x + 40, y + 35)
    ctx.stroke()
    ctx.setLineDash([])
    
    ctx.font = '10px Arial'
    ctx.fillText('Cut Lines', x + 50, y + 38)
    
    // Bleed area
    ctx.fillStyle = 'rgba(255, 0, 0, 0.1)'
    ctx.fillRect(x + 10, y + 50, 30, 15)
    ctx.strokeStyle = '#ff0000'
    ctx.lineWidth = 1
    ctx.strokeRect(x + 10, y + 50, 30, 15)
    
    ctx.fillStyle = '#212529'
    ctx.fillText('Bleed Area', x + 50, y + 60)
    
    // Safe zone
    ctx.strokeStyle = '#00ff00'
    ctx.lineWidth = 1
    ctx.setLineDash([3, 3])
    ctx.strokeRect(x + 10, y + 75, 30, 15)
    ctx.setLineDash([])
    
    ctx.fillText('Safe Zone', x + 50, y + 85)
    
    // Notes
    ctx.font = '8px Arial'
    ctx.fillStyle = '#6c757d'
    ctx.fillText('All measurements in inches', x + 10, y + 105)
  }
  
  /**
   * Scale cutline path for production resolution
   */
  private static scaleCutlinePath(path: string, scale: number): string {
    return path.replace(/([0-9.-]+)/g, (match) => {
      const num = parseFloat(match)
      return (num * scale).toFixed(2)
    })
  }
  
  /**
   * Generate SVG cut file
   */
  private static generateSVGCutFile(
    paths: Array<{ id: string; type: string; path: string; layerName: string }>,
    specs: ProductionSpecs
  ): string {
    const svg = `
      <?xml version="1.0" encoding="UTF-8"?>
      <svg xmlns="http://www.w3.org/2000/svg" 
           width="100%" height="100%" 
           viewBox="0 0 1000 1000">
        <defs>
          <style>
            .cut-path { fill: none; stroke: #ff0000; stroke-width: 0.25pt; }
            .score-path { fill: none; stroke: #00ff00; stroke-width: 0.25pt; }
            .perforation-path { fill: none; stroke: #0000ff; stroke-width: 0.25pt; stroke-dasharray: 2,2; }
          </style>
        </defs>
        ${paths.map(path => 
          `<path id="${path.id}" 
                 class="${path.type}-path" 
                 d="${path.path}" 
                 data-layer="${path.layerName}" />`
        ).join('\n        ')}
      </svg>
    `.trim()
    
    return svg
  }
  
  /**
   * Generate DXF cut file
   */
  private static generateDXFCutFile(
    paths: Array<{ id: string; type: string; path: string; layerName: string }>,
    specs: ProductionSpecs
  ): string {
    // Simplified DXF generation
    let dxf = `
      0
      SECTION
      2
      HEADER
      9
      $ACADVER
      1
      AC1015
      0
      ENDSEC
      0
      SECTION
      2
      ENTITIES
    `.trim()
    
    paths.forEach(path => {
      // Convert SVG path to DXF entities (simplified)
      dxf += `\n0\nPOLYLINE\n8\n${path.layerName}\n62\n1\n70\n1`
    })
    
    dxf += `\n0\nENDSEC\n0\nEOF`
    
    return dxf
  }
  
  /**
   * Generate PDF cut file (simplified)
   */
  private static generatePDFCutFile(
    paths: Array<{ id: string; type: string; path: string; layerName: string }>,
    specs: ProductionSpecs
  ): string {
    // This would require a proper PDF library like jsPDF
    // For now, return SVG embedded in PDF structure
    return this.generateSVGCutFile(paths, specs)
  }
  
  /**
   * Calculate job metadata
   */
  private static calculateMetadata(
    jobId: string,
    canvas: HTMLCanvasElement,
    specs: ProductionSpecs
  ): ProductionFiles['metadata'] {
    const widthInches = canvas.width / specs.resolution
    const heightInches = canvas.height / specs.resolution
    const materialUsage = widthInches * heightInches
    
    // Estimated production time based on complexity
    const baseTime = 5 // minutes
    const cutTime = materialUsage * 0.5 // 30 seconds per square inch
    const estimatedTime = Math.round(baseTime + cutTime)
    
    // Cost estimate (simplified)
    const materialCost = materialUsage * 0.15 // $0.15 per square inch
    const laborCost = (estimatedTime / 60) * 25 // $25/hour
    const costEstimate = Math.round((materialCost + laborCost) * 100) / 100
    
    return {
      jobId,
      created: new Date(),
      specs,
      estimatedTime,
      materialUsage: Math.round(materialUsage * 100) / 100,
      costEstimate
    }
  }
}

/**
 * Production presets for common scenarios
 */
export const PRODUCTION_PRESETS: Record<string, ProductionSpecs> = {
  stickers_standard: {
    resolution: 300,
    colorSpace: 'CMYK',
    bleed: 3, // 3mm bleed
    safeZone: 3,
    cutType: 'kiss-cut',
    cutOffset: 1,
    cutSpeed: 50,
    cutPressure: 80,
    printFormat: 'PDF',
    cutFormat: 'SVG',
    material: 'vinyl',
    thickness: 0.1,
    adhesive: 'permanent'
  },
  
  labels_paper: {
    resolution: 300,
    colorSpace: 'CMYK',
    bleed: 2,
    safeZone: 2,
    cutType: 'die-cut',
    cutOffset: 0.5,
    cutSpeed: 40,
    cutPressure: 60,
    printFormat: 'PDF',
    cutFormat: 'SVG',
    material: 'paper',
    thickness: 0.08,
    adhesive: 'permanent'
  },
  
  decals_outdoor: {
    resolution: 300,
    colorSpace: 'CMYK',
    bleed: 3,
    safeZone: 4,
    cutType: 'through-cut',
    cutOffset: 2,
    cutSpeed: 30,
    cutPressure: 100,
    printFormat: 'PDF',
    cutFormat: 'DXF',
    material: 'vinyl',
    thickness: 0.15,
    adhesive: 'permanent'
  }
}