import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useRoom } from '@/context/RoomContext'
import { useUser } from '@/context/UserContext'
import { useWindow } from '@/context/WindowContext'
import type { Point } from '@/types'
import Card from '../common/Card'

const CANVAS_SIZE = 480

export default function Canvas() {
  const { direction } = useWindow()
  const { strokes, bgColor, painterId, addStroke } = useRoom()
  const { id } = useUser()
  console.log(id, painterId)
  const lastStrokeId = strokes.reduce(
    (max, stroke) => Math.max(max, stroke.id),
    -1,
  )
  const strokeIdRef = useRef<number>(lastStrokeId + 1)
  const sequenceRef = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])

  const [brushType, setBrushType] = useState<'pen' | 'eraser'>('pen')
  const [color, setColor] = useState('#000000')
  const [strokeWidth, setStrokeWidth] = useState(4)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    // Set canvas dimensions
    canvas.width = CANVAS_SIZE
    canvas.height = CANVAS_SIZE

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height)

    // Set drawing styles
    context.lineCap = 'round'
    context.lineJoin = 'round'

    // Draw each stroke
    strokes.forEach(stroke => {
      context.strokeStyle = stroke.color
      context.lineWidth = stroke.strokeWidth
      context.beginPath()
      stroke.points.forEach((point, index) => {
        if (index === 0) {
          context.moveTo(point.x, point.y)
        } else {
          context.lineTo(point.x, point.y)
        }
      })
      context.stroke()
    })
  }, [strokes])

  useEffect(() => {
    function startNewStroke() {
      pointsRef.current = []
      strokeIdRef.current = lastStrokeId + 1
      sequenceRef.current = 0
    }

    function sendCurrentStroke({ flush = false } = {}) {
      if (strokeIdRef.current === null) return
      addStroke({
        id: strokeIdRef.current,
        sequence: sequenceRef.current++,
        type: brushType,
        color: color,
        strokeWidth: strokeWidth,
        points: [...pointsRef.current],
      })
      pointsRef.current = flush
        ? []
        : [pointsRef.current[pointsRef.current.length - 1]]
    }

    function getNewPoint(e: PointerEvent): Point {
      let x = e.layerX
      let y = e.layerY
      if (e.target instanceof HTMLCanvasElement) {
        const widthRatio = e.target.width / e.target.offsetWidth
        const heightRatio = e.target.height / e.target.offsetHeight
        x = x * widthRatio
        y = y * heightRatio

        x -= e.target.offsetLeft
        y -= e.target.offsetTop
      }
      return { x, y }
    }

    const canvas = canvasRef.current
    if (!canvas) return

    canvas.onpointerdown = e => {
      if (id !== painterId) return
      e.preventDefault()
      canvas.setPointerCapture(e.pointerId)

      startNewStroke()
      pointsRef.current = [getNewPoint(e)]
      sendCurrentStroke()
    }
    canvas.onpointermove = e => {
      console.log(e.layerX, e.layerY)
      if (id !== painterId || strokeIdRef.current === null) return
      if (!canvas.hasPointerCapture(e.pointerId)) return
      e.preventDefault()
      pointsRef.current.push(getNewPoint(e))

      if (pointsRef.current.length >= 4) sendCurrentStroke()
    }
    canvas.onpointerup = e => {
      if (id !== painterId || strokeIdRef.current === null) return
      e.preventDefault()
      canvas.releasePointerCapture(e.pointerId)

      sendCurrentStroke({ flush: true })

      strokeIdRef.current++
      sequenceRef.current = 0
    }
  }, [id, painterId, brushType, color, strokeWidth, addStroke, lastStrokeId])
  return (
    <Card
      className={twMerge(
        'flex min-w-[480px] grow items-center justify-center p-0 sm:p-0 md:p-0 lg:p-0',
        direction === 'vertical' ? '' : '',
        `bg-[${bgColor}]`,
      )}
    >
      <canvas className='block aspect-square w-full' ref={canvasRef} />
    </Card>
  )
}
