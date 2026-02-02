interface Props {
  value: number
  onChange: (value: number) => void
  className?: string
}

export default function VolumeControl({ value, onChange, className }: Props) {
  return (
    <div>
      <input
        type='range'
        min={0}
        max={1}
        step={0.05}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className={className}
      />
    </div>
  )
}
