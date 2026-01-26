import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useAddStroke } from '@/apis/canvas'
import { useWindow } from '@/context/WindowContext'
import { useGameStore } from '@/store/gameStore'
import { useUserStore } from '@/store/userStore'
import { Phase, type Point } from '@/types'
import Card from '../common/Card'

const CANVAS_SIZE = 480

export default function Canvas() {
  const { direction } = useWindow()
  const { strokes, canvasColor, painterUUID, strokeColor, phase } =
    useGameStore()
  const { UUID } = useUserStore()
  const { mutate: addStroke } = useAddStroke()

  const lastStrokeId = strokes.reduce(
    (max, stroke) => Math.max(max, stroke.id),
    -1,
  )
  const strokeIdRef = useRef<number>(lastStrokeId + 1)
  const sequenceRef = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])

  const [brushType] = useState<'pen' | 'eraser'>('pen')
  const [strokeWidth] = useState(4)

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
        color: strokeColor,
        tool: brushType,
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
    if (UUID == painterUUID && phase === Phase.DRAWING) {
      canvas.onpointerdown = e => {
        e.preventDefault()
        canvas.setPointerCapture(e.pointerId)

        startNewStroke()
        pointsRef.current = [getNewPoint(e)]
        sendCurrentStroke()
      }
      canvas.onpointermove = e => {
        if (!strokeIdRef.current) return
        if (!canvas.hasPointerCapture(e.pointerId)) return
        e.preventDefault()
        pointsRef.current.push(getNewPoint(e))

        if (pointsRef.current.length >= 4) sendCurrentStroke()
      }
      canvas.onpointerup = e => {
        if (!strokeIdRef.current) return
        e.preventDefault()
        canvas.releasePointerCapture(e.pointerId)

        sendCurrentStroke({ flush: true })

        strokeIdRef.current++
        sequenceRef.current = 0
      }
    }

    return () => {
      canvas.onpointerdown = null
      canvas.onpointermove = null
      canvas.onpointerup = null
    }
  }, [
    UUID,
    painterUUID,
    brushType,
    strokeColor,
    strokeWidth,
    lastStrokeId,
    phase,
    addStroke,
  ])

  return (
    <Card
      className={twMerge(
        'flex items-center justify-center',
        direction === 'vertical' ? '' : '',
      )}
      style={{
        backgroundColor: canvasColor,
        padding: '0px',
        minWidth: 'min(100vw, 440px)',
      }}
    >
      <canvas className='block aspect-square w-full' ref={canvasRef} />
    </Card>
  )
}
