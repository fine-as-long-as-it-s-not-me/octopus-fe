interface Props {
  src: string
  alt?: string
  width?: number | string
  height?: number | string
  className?: string
}

export default function Img({ src, alt = '', width, height, className }: Props) {
  return <img src={src} alt={alt} width={width} height={height} className={className} />
}
