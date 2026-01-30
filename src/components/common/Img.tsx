interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt?: string
  width?: number | string
  height?: number | string
  className?: string
  ref?: React.Ref<HTMLImageElement>
}

export default function Img({
  src,
  alt = '',
  width,
  height,
  className,
  ref,
  ...rest
}: Props) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      ref={ref}
      draggable='false'
      {...rest}
    />
  )
}
