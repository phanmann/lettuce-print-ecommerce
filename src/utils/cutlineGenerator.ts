// Cutline Generation Utility
// Professional-grade cutline generation for die-cut products

export interface CutlineOptions {
  type: 'cut' | 'score' | 'perforation' | 'kiss-cut'
  offset: number // Offset from image boundary in pixels
  simplification: number // Path simplification level (0-1)
  smoothing: number // Corner smoothing (0-1)
  accuracy: 'low' | 'medium' | 'high' | 'ultra'
}

export interface GeneratedCutline {
  id: string
  path: string // SVG path data
  type: CutlineOptions['type']
  bounds: {
    x: number
    y: number
    width: number
    height: number
  }
  length: number // Total path length in pixels
  area: number // Enclosed area in square pixels
  metadata: {
    generated: Date
    accuracy: string
    processingTime: number
  }
}

export class CutlineGenerator {
  
  /**
   * Generate cutlines from image data
   */
  static async generateFromImage(
    imageUrl: string,
    options: CutlineOptions = {
      type: 'cut',
      offset: 2,
      simplification: 0.1,
      smoothing: 0.3,
      accuracy: 'high'
    }
  ): Promise<GeneratedCutline[]> {
    const startTime = Date.now()
    
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        if (!ctx) {
          resolve([])
          return
        }
        
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        
        const cutlines = this.extractCutlines(ctx, img.width, img.height, options)
        
        const result: GeneratedCutline[] = cutlines.map((cutline, index) => ({
          id: `cutline-${Date.now()}-${index}`,
          path: cutline.path,
          type: options.type,
          bounds: cutline.bounds,
          length: this.calculatePathLength(cutline.path),
          area: this.calculatePathArea(cutline.path),
          metadata: {
            generated: new Date(),
            accuracy: options.accuracy,
            processingTime: Date.now() - startTime
          }
        }))
        
        resolve(result)
      }
      
      img.src = imageUrl
    })
  }
  
  /**
   * Generate cutlines for standard shapes
   */
  static generateForShape(
    shape: 'circle' | 'square' | 'rectangle' | 'rounded-rectangle',
    dimensions: { width: number; height: number },
    options: CutlineOptions
  ): GeneratedCutline {
    const startTime = Date.now()
    let path: string
    
    switch (shape) {
      case 'circle':
        const radius = Math.min(dimensions.width, dimensions.height) / 2 - options.offset
        const centerX = dimensions.width / 2
        const centerY = dimensions.height / 2
        path = `M ${centerX + radius} ${centerY} A ${radius} ${radius} 0 1 0 ${centerX - radius} ${centerY} A ${radius} ${radius} 0 1 0 ${centerX + radius} ${centerY} Z`
        break
        
      case 'square':
        const size = Math.min(dimensions.width, dimensions.height) - (options.offset * 2)
        const x = (dimensions.width - size) / 2
        const y = (dimensions.height - size) / 2
        path = `M ${x} ${y} L ${x + size} ${y} L ${x + size} ${y + size} L ${x} ${y + size} Z`
        break
        
      case 'rectangle':
        const rectX = options.offset
        const rectY = options.offset
        const rectW = dimensions.width - (options.offset * 2)
        const rectH = dimensions.height - (options.offset * 2)
        path = `M ${rectX} ${rectY} L ${rectX + rectW} ${rectY} L ${rectX + rectW} ${rectY + rectH} L ${rectX} ${rectY + rectH} Z`
        break
        
      case 'rounded-rectangle':
        const rX = options.offset
        const rY = options.offset
        const rW = dimensions.width - (options.offset * 2)
        const rH = dimensions.height - (options.offset * 2)
        const cornerRadius = Math.min(rW, rH) * 0.1 * options.smoothing
        path = this.createRoundedRectPath(rX, rY, rW, rH, cornerRadius)
        break
        
      default:
        path = `M 0 0 L ${dimensions.width} 0 L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z`
    }
    
    return {
      id: `cutline-${Date.now()}`,
      path,
      type: options.type,
      bounds: {
        x: 0,
        y: 0,
        width: dimensions.width,
        height: dimensions.height
      },
      length: this.calculatePathLength(path),
      area: this.calculatePathArea(path),
      metadata: {
        generated: new Date(),
        accuracy: options.accuracy,
        processingTime: Date.now() - startTime
      }
    }
  }
  
  /**
   * Extract cutlines from canvas image data
   */
  private static extractCutlines(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    options: CutlineOptions
  ): Array<{ path: string; bounds: { x: number; y: number; width: number; height: number } }> {
    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data
    
    // Find all non-transparent regions
    const regions = this.findRegions(data, width, height)
    
    // Generate cutlines for each region
    return regions.map(region => {
      const boundary = this.traceBoundary(region, width, height, options)
      const simplifiedPath = this.simplifyPath(boundary, options.simplification)
      const smoothedPath = this.smoothPath(simplifiedPath, options.smoothing)
      
      return {
        path: this.pathToSVG(smoothedPath),
        bounds: this.calculateBounds(smoothedPath)
      }
    })
  }
  
  /**
   * Find connected regions of non-transparent pixels
   */
  private static findRegions(
    data: Uint8ClampedArray,
    width: number,
    height: number
  ): Array<Set<number>> {
    const visited = new Set<number>()
    const regions: Array<Set<number>> = []
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = y * width + x
        const alpha = data[index * 4 + 3]
        
        if (alpha > 128 && !visited.has(index)) { // Non-transparent pixel
          const region = new Set<number>()
          this.floodFill(data, width, height, x, y, visited, region)
          if (region.size > 100) { // Filter out noise
            regions.push(region)
          }
        }
      }
    }
    
    return regions
  }
  
  /**
   * Flood fill algorithm to find connected regions
   */
  private static floodFill(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    startX: number,
    startY: number,
    visited: Set<number>,
    region: Set<number>
  ): void {
    const stack = [{ x: startX, y: startY }]
    
    while (stack.length > 0) {
      const { x, y } = stack.pop()!
      
      if (x < 0 || x >= width || y < 0 || y >= height) continue
      
      const index = y * width + x
      if (visited.has(index)) continue
      
      const alpha = data[index * 4 + 3]
      if (alpha <= 128) continue // Transparent pixel
      
      visited.add(index)
      region.add(index)
      
      // Add neighbors
      stack.push(
        { x: x + 1, y },
        { x: x - 1, y },
        { x, y: y + 1 },
        { x, y: y - 1 }
      )
    }
  }
  
  /**
   * Trace boundary of a region using Moore neighborhood
   */
  private static traceBoundary(
    region: Set<number>,
    width: number,
    height: number,
    options: CutlineOptions
  ): Array<{ x: number; y: number }> {
    // Find starting point (leftmost pixel of topmost row)
    let startIndex = -1
    for (let y = 0; y < height && startIndex === -1; y++) {
      for (let x = 0; x < width; x++) {
        const index = y * width + x
        if (region.has(index)) {
          startIndex = index
          break
        }
      }
    }
    
    if (startIndex === -1) return []
    
    const startX = startIndex % width
    const startY = Math.floor(startIndex / width)
    const boundary: Array<{ x: number; y: number }> = []
    
    // Moore neighborhood directions (8-connected)
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, 1], [1, 1], [1, 0],
      [1, -1], [0, -1]
    ]
    
    let currentX = startX
    let currentY = startY
    let direction = 7 // Start looking in the up direction
    
    do {
      boundary.push({ 
        x: currentX + options.offset * Math.cos(direction * Math.PI / 4),
        y: currentY + options.offset * Math.sin(direction * Math.PI / 4)
      })
      
      // Find next boundary pixel
      let found = false
      for (let i = 0; i < 8 && !found; i++) {
        const nextDir = (direction + i) % 8
        const dx = directions[nextDir][0]
        const dy = directions[nextDir][1]
        const nextX = currentX + dx
        const nextY = currentY + dy
        
        if (nextX >= 0 && nextX < width && nextY >= 0 && nextY < height) {
          const nextIndex = nextY * width + nextX
          if (region.has(nextIndex)) {
            currentX = nextX
            currentY = nextY
            direction = (nextDir + 6) % 8 // Turn left
            found = true
          }
        }
      }
      
      if (!found) break
      
    } while (!(currentX === startX && currentY === startY) && boundary.length < width * height)
    
    return boundary
  }
  
  /**
   * Simplify path using Douglas-Peucker algorithm
   */
  private static simplifyPath(
    points: Array<{ x: number; y: number }>,
    tolerance: number
  ): Array<{ x: number; y: number }> {
    if (points.length <= 2) return points
    
    const epsilon = tolerance * 10 // Scale tolerance
    
    return this.douglasPeucker(points, epsilon)
  }
  
  /**
   * Douglas-Peucker path simplification algorithm
   */
  private static douglasPeucker(
    points: Array<{ x: number; y: number }>,
    epsilon: number
  ): Array<{ x: number; y: number }> {
    if (points.length <= 2) return points
    
    // Find the point with maximum distance from line between start and end
    let maxDistance = 0
    let maxIndex = 0
    const start = points[0]
    const end = points[points.length - 1]
    
    for (let i = 1; i < points.length - 1; i++) {
      const distance = this.pointToLineDistance(points[i], start, end)
      if (distance > maxDistance) {
        maxDistance = distance
        maxIndex = i
      }
    }
    
    if (maxDistance > epsilon) {
      // Recursively simplify
      const left = this.douglasPeucker(points.slice(0, maxIndex + 1), epsilon)
      const right = this.douglasPeucker(points.slice(maxIndex), epsilon)
      
      return left.slice(0, -1).concat(right)
    } else {
      return [start, end]
    }
  }
  
  /**
   * Calculate distance from point to line
   */
  private static pointToLineDistance(
    point: { x: number; y: number },
    lineStart: { x: number; y: number },
    lineEnd: { x: number; y: number }
  ): number {
    const A = point.x - lineStart.x
    const B = point.y - lineStart.y
    const C = lineEnd.x - lineStart.x
    const D = lineEnd.y - lineStart.y
    
    const dot = A * C + B * D
    const lenSq = C * C + D * D
    
    if (lenSq === 0) return Math.sqrt(A * A + B * B)
    
    const param = dot / lenSq
    let xx, yy
    
    if (param < 0) {
      xx = lineStart.x
      yy = lineStart.y
    } else if (param > 1) {
      xx = lineEnd.x
      yy = lineEnd.y
    } else {
      xx = lineStart.x + param * C
      yy = lineStart.y + param * D
    }
    
    const dx = point.x - xx
    const dy = point.y - yy
    return Math.sqrt(dx * dx + dy * dy)
  }
  
  /**
   * Smooth path using bezier curves
   */
  private static smoothPath(
    points: Array<{ x: number; y: number }>,
    smoothing: number
  ): Array<{ x: number; y: number; cp1?: { x: number; y: number }; cp2?: { x: number; y: number } }> {
    if (points.length < 3) return points
    
    const smoothed = []
    const factor = smoothing * 0.2
    
    for (let i = 0; i < points.length; i++) {
      const current = points[i]
      const prev = points[i - 1] || points[points.length - 1]
      const next = points[i + 1] || points[0]
      
      if (smoothing > 0 && i > 0) {
        // Calculate control points for bezier curve
        const cp1 = {
          x: current.x - (next.x - prev.x) * factor,
          y: current.y - (next.y - prev.y) * factor
        }
        const cp2 = {
          x: current.x + (next.x - prev.x) * factor,
          y: current.y + (next.y - prev.y) * factor
        }
        
        smoothed.push({ ...current, cp1, cp2 })
      } else {
        smoothed.push(current)
      }
    }
    
    return smoothed
  }
  
  /**
   * Convert path points to SVG path string
   */
  private static pathToSVG(
    points: Array<{ x: number; y: number; cp1?: { x: number; y: number }; cp2?: { x: number; y: number } }>
  ): string {
    if (points.length === 0) return ''
    
    let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`
    
    for (let i = 1; i < points.length; i++) {
      const point = points[i]
      const prev = points[i - 1]
      
      if (prev.cp2 && point.cp1) {
        // Bezier curve
        path += ` C ${prev.cp2.x.toFixed(2)} ${prev.cp2.y.toFixed(2)} ${point.cp1.x.toFixed(2)} ${point.cp1.y.toFixed(2)} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`
      } else {
        // Straight line
        path += ` L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`
      }
    }
    
    path += ' Z' // Close path
    return path
  }
  
  /**
   * Calculate bounding box of path
   */
  private static calculateBounds(
    points: Array<{ x: number; y: number }>
  ): { x: number; y: number; width: number; height: number } {
    if (points.length === 0) return { x: 0, y: 0, width: 0, height: 0 }
    
    let minX = points[0].x
    let maxX = points[0].x
    let minY = points[0].y
    let maxY = points[0].y
    
    for (const point of points) {
      minX = Math.min(minX, point.x)
      maxX = Math.max(maxX, point.x)
      minY = Math.min(minY, point.y)
      maxY = Math.max(maxY, point.y)
    }
    
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    }
  }
  
  /**
   * Calculate approximate path length
   */
  private static calculatePathLength(path: string): number {
    // Simple approximation - in a real implementation, this would parse SVG path
    const matches = path.match(/[ML]\s*([0-9.-]+)\s*([0-9.-]+)/g) || []
    let length = 0
    let prevX = 0
    let prevY = 0
    
    for (const match of matches) {
      const [, x, y] = match.match(/([0-9.-]+)\s*([0-9.-]+)/)!
      const nx = parseFloat(x)
      const ny = parseFloat(y)
      
      if (match.startsWith('L')) {
        length += Math.sqrt(Math.pow(nx - prevX, 2) + Math.pow(ny - prevY, 2))
      }
      
      prevX = nx
      prevY = ny
    }
    
    return length
  }
  
  /**
   * Calculate approximate path area using shoelace formula
   */
  private static calculatePathArea(path: string): number {
    const matches = path.match(/[ML]\s*([0-9.-]+)\s*([0-9.-]+)/g) || []
    const points: Array<{ x: number; y: number }> = []
    
    for (const match of matches) {
      const [, x, y] = match.match(/([0-9.-]+)\s*([0-9.-]+)/)!
      points.push({ x: parseFloat(x), y: parseFloat(y) })
    }
    
    if (points.length < 3) return 0
    
    let area = 0
    for (let i = 0; i < points.length; i++) {
      const current = points[i]
      const next = points[(i + 1) % points.length]
      area += current.x * next.y - next.x * current.y
    }
    
    return Math.abs(area) / 2
  }
  
  /**
   * Create rounded rectangle path
   */
  private static createRoundedRectPath(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ): string {
    const r = Math.min(radius, width / 2, height / 2)
    
    return `
      M ${x + r} ${y}
      L ${x + width - r} ${y}
      Q ${x + width} ${y} ${x + width} ${y + r}
      L ${x + width} ${y + height - r}
      Q ${x + width} ${y + height} ${x + width - r} ${y + height}
      L ${x + r} ${y + height}
      Q ${x} ${y + height} ${x} ${y + height - r}
      L ${x} ${y + r}
      Q ${x} ${y} ${x + r} ${y}
      Z
    `.replace(/\s+/g, ' ').trim()
  }
}

/**
 * Preset cutline configurations
 */
export const CUTLINE_PRESETS = {
  precise: {
    type: 'cut' as const,
    offset: 1,
    simplification: 0.05,
    smoothing: 0.1,
    accuracy: 'ultra' as const
  },
  standard: {
    type: 'cut' as const,
    offset: 2,
    simplification: 0.1,
    smoothing: 0.3,
    accuracy: 'high' as const
  },
  fast: {
    type: 'cut' as const,
    offset: 3,
    simplification: 0.2,
    smoothing: 0.5,
    accuracy: 'medium' as const
  },
  kisscut: {
    type: 'kiss-cut' as const,
    offset: 0.5,
    simplification: 0.03,
    smoothing: 0.1,
    accuracy: 'ultra' as const
  }
}