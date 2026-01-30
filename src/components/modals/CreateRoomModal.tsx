import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Spacing, useModal } from 'sam-react-modal'

import { useChangeRoomSettings, useCreateRoom } from '@/apis/room'
import type { ChangeableSettings } from '@/types'
import Button from '../common/Button'
import Checkbox from '../common/Checkbox'
import Form from '../common/Form'
import Icon from '../common/Icon'
import Input from '../common/Input'
import Modal from '../common/Modal'
import SettingInputWrapper from '../room/SettingInputWrapper'

const settingOptions = {
  rounds: [1, 3, 5, 7],
  drawingTimes: [5, 10, 15, 30],
}

interface Props {
  action: 'create' | 'change'
}

export default function CreateRoomModal({ action }: Props) {
  // ! TODO: action에 따른 초기값 설정
  const { t } = useTranslation()
  const { closeModal } = useModal()
  const [rounds, setRounds] = useState(3)
  const { mutate: createRoom } = useCreateRoom()
  const [drawingTime, setDrawingTime] = useState(10)
  const { mutate: changeSettings } = useChangeRoomSettings()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const settings: ChangeableSettings = {
      rounds,
      maxPlayers: Number(e.currentTarget.maxPlayers.value) || 8,
      drawingTime,
      useCustomWord: !!e.currentTarget.useCustomWord.checked,
      isCustomWordVoteOpen: false,
      customWordMinVotes: 1,
      isPublic: e.currentTarget.roomType.value === 'public',
    }
    if (action === 'create') createRoom({ settings })
    else if (action === 'change') changeSettings({ settings })
    closeModal()
  }

  return (
    <Modal>
      <Form onSubmit={submitHandler} className='flex flex-col gap-4 p-4 md:p-8'>
        <p>{t(`${action === 'create' ? 'Create' : 'Change'} Room`)}</p>
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
                type='button'
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
            onChange={e => {
              e.currentTarget.value = Math.max(
                0,
                parseInt(e.currentTarget.value) || 0,
              ).toString()
            }}
            className='w-32'
            shape='sm'
            defaultValue={8}
            name='maxPlayers'
          />
        </SettingInputWrapper>
        <SettingInputWrapper
          icon={<Icon name='timer' />}
          label={t('Drawing Time')}
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
                type='button'
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
          <Checkbox type='checkbox' name='useCustomWord' />
        </SettingInputWrapper>
        <SettingInputWrapper icon={<Icon name='lock' />} label={t('Room Type')}>
          <select name='roomType'>
            <option value='public'>{t('Public')}</option>
            <option value='private'>{t('Private')}</option>
          </select>
        </SettingInputWrapper>
        <Button size='lg' type='submit'>
          {t(action === 'create' ? 'Create' : 'Change')}
        </Button>
      </Form>
    </Modal>
  )
}
