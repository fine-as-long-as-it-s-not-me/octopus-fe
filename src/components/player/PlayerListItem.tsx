import { twMerge } from 'tailwind-merge'

import Card from '../common/Card'
import Icon from '../common/Icon'
import Profile from './Profile'

interface Props {
  name: string
  host?: boolean
  drawing?: boolean
  nextDrawer?: boolean
}

export default function PlayerListItem({
  name,
  host,
  drawing,
  nextDrawer,
}: Props) {
  return (
    <div className={twMerge(`m-[-2px] flex w-full items-center`)}>
      <Card
        size='sm'
        className='flex w-full items-center justify-between py-0 pr-2 md:pr-4'
      >
        <Profile name={name} />
        <Card
          size='sm'
          className='items-center gap-2 border-none bg-transparent'
        >
          {drawing && <Icon name='edit' />}
          {nextDrawer && <p>next</p>}
          {host && <Icon name='crown' />}
        </Card>
      </Card>
    </div>
  )
}
