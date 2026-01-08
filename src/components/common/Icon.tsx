interface Props {
  name: string
  size?: number
  color?: string
}
export default function Icon({ name, size = 24, color }: Props) {
  return (
    <span
      className='material-symbols-rounded'
      style={{ fontSize: size, color: color }}
    >
      {name}
    </span>
  )
}
