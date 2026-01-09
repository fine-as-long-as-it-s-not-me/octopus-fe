import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Spacing } from 'sam-react-modal'

import { ROUTES } from '@/routes/ROUTES'
import Button from '../common/Button'
import Checkbox from '../common/Checkbox'
import Icon from '../common/Icon'
import Input from '../common/Input'
import Modal from '../common/Modal'
import SettingInputWrapper from '../game/SettingInputWrapper'

const settingOptions = {
  rounds: [1, 3, 5, 7],
  drawingTimes: [3, 5, 10, 15],
}

export default function CreateRoomModal() {
  const [rounds, setRounds] = useState(3)
  const [maxPlayers, setMaxPlayers] = useState(5)
  const [drawingTime, setDrawingTime] = useState(10)
  const [useCustomWords, setUseCustomWords] = useState(false)
  const [roomType, setRoomType] = useState<'public' | 'private'>('public')

  const { t } = useTranslation()
  const navigate = useNavigate()

  const createClickHandler = () => {
    navigate(ROUTES.ROOM('new'))
  }

  return (
    <Modal className='p-4 md:p-8'>
      <p>{t('Create Room')}</p>
      <Spacing />
      <SettingInputWrapper
        icon={<Icon name='change_circle' />}
        label={t('Rounds')}
      >
        <div className='flex gap-2'>
          {settingOptions.rounds.map(option => (
            <Button
              key={option}
              onClick={() => setRounds(option)}
              size='sm'
              active={rounds === option}
              cardClassName='aspect-square w-[48px] p-0 md:p-0'
            >
              {option}
            </Button>
          ))}
        </div>
      </SettingInputWrapper>
      <SettingInputWrapper
        icon={<Icon name='people' />}
        label={t('Max Players')}
      >
        <Input
          type='number'
          value={maxPlayers}
          onChange={e => setMaxPlayers(Number(e.target.value))}
          className='w-32'
          shape='sm'
        />
      </SettingInputWrapper>
      <SettingInputWrapper
        icon={<Icon name='timer' />}
        label={t('Drawing Time (seconds)')}
      >
        <div className='flex gap-2'>
          {settingOptions.drawingTimes.map(option => (
            <Button
              className='aspect-square'
              key={option}
              onClick={() => setDrawingTime(option)}
              size='sm'
              active={drawingTime === option}
              cardClassName='aspect-square w-[48px] p-0 md:p-0'
            >
              {option}
            </Button>
          ))}
        </div>
      </SettingInputWrapper>
      <SettingInputWrapper
        icon={<Icon name='abc' />}
        label={t('Use Custom Words')}
      >
        <Checkbox
          type='checkbox'
          checked={useCustomWords}
          onChange={e => setUseCustomWords(e.target.checked)}
        />
      </SettingInputWrapper>
      <SettingInputWrapper icon={<Icon name='lock' />} label={t('Room Type')}>
        <select
          value={roomType}
          onChange={e => setRoomType(e.target.value as 'public' | 'private')}
        >
          <option value='public'>{t('Public')}</option>
          <option value='private'>{t('Private')}</option>
        </select>
      </SettingInputWrapper>
      <Button size='lg' onClick={createClickHandler}>
        {t('Create')}
      </Button>
    </Modal>
  )
}
