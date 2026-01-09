interface Props {
  icon: React.ReactNode
  label: string
  value: string | number
  onClick?: () => void
}
export default function SettingItem({ icon, label, value, onClick }: Props) {
  return (
    <button
      className='w-full flex flex-row items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-100'
      onClick={onClick}
      disabled={!onClick}
    >
      <div className='flex flex-row items-center gap-4'>
        {icon}
        <span className='font-medium'>{label}</span>
      </div>
      <span className='text-gray-600'>{value}</span>
    </button>
  )
}
