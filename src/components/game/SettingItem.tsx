import Button from '../common/Button'
import Card from '../common/Card'
import Icon from '../common/Icon'

interface Props {
  icon: React.ReactNode
  label: string
  value: string | number
  onClick?: () => void
}

export default function SettingItem({ icon, label, value, onClick }: Props) {
  return (
    <Parent onClick={onClick}>
      <div className='flex flex-row items-center gap-4'>
        {icon}
        <span className='font-medium'>{label}</span>
      </div>
      <span className='ml-auto text-gray-600'>{value}</span>
    </Parent>
  )
}

function Parent({
  onClick,
  children,
}: {
  onClick?: () => void
  children: React.ReactNode
}) {
  const commonClass =
    'w-fit sm:w-auto break-keep rounded-[24px] gap-4 pr-4 shrink-0'
  if (onClick) {
    return (
      <Button cardClassName={commonClass} onClick={onClick}>
        {children}
        <div className='ml-[-8px] flex items-center justify-center'>
          <Icon name='chevron_forward' />
        </div>
      </Button>
    )
  }
  return <Card className={commonClass}>{children}</Card>
}
