export default function RoomHeaderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex w-full flex-row flex-wrap sm:gap-2'>{children}</div>
  )
}
