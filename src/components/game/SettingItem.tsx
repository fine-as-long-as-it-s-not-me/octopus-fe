import Button from '../common/Button'
import Card from '../common/Card'

interface Props {
  icon: React.ReactNode
  label: string
  value: string | number
  onClick?: () => void
}
export default function SettingItem({ icon, label, value, onClick }: Props) {
  if (onClick) {
    return (
      <Button cardClassName='justify-between' onClick={onClick}>
        <div className='flex flex-row items-center justify-start gap-4'>
          {icon}
          <span className='font-medium'>{label}</span>
        </div>
        <span className='text-gray-600'>{value}</span>
      </Button>
    )
  }
  return (
    <Card className={`flex justify-between`}>
      <div className='flex flex-row items-center justify-start gap-4'>
        {icon}
        <span className='font-medium'>{label}</span>
      </div>
      <span className='text-gray-600'>{value}</span>
    </Card>
  )
}
