import useAvatar from '@/hooks/useAvatar'
import Card from '../common/Card'
import Img from '../common/Img'

interface Props {
  name: string
}

export default function Profile({ name }: Props) {
  const avatarUrl = useAvatar(name)
  return (
    <div className='flex grow items-center rounded-full w-fit gap-2'>
      <Card size='sm' className='p-0 md:p-0'>
        <Img src={avatarUrl} alt={`${name}'s avatar`} className='w-16 h-16' />
      </Card>
      {name}
    </div>
  )
}
