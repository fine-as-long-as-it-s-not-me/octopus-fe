export default function RoomWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='relative flex h-lvh w-full max-w-[1600px] flex-col overflow-hidden sm:gap-4 sm:p-4 md:p-8 lg:p-16'>
      {children}
    </div>
  )
}
