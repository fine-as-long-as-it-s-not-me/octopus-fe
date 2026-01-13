import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useModal } from 'sam-react-modal'

import { ROUTES } from '@/routes/ROUTES'
import Button from '../common/Button'
import Form from '../common/Form'
import Input from '../common/Input'
import Modal from '../common/Modal'
import Alert from './Alert'

export default function RoomCodeInputModal() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [roomCode, setRoomCode] = useState('')
  const { openModal } = useModal()

  const roomCodeSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (!roomCode.trim())
      return openModal(<Alert>{t('Please enter the room code.')}</Alert>)
    navigate(ROUTES.ROOM(roomCode))
  }
  return (
    <Modal>
      <Form
        onSubmit={roomCodeSubmitHandler}
        className='flex w-full flex-col items-center gap-4'
      >
        <Input
          placeholder={t('Enter the room code.')}
          className='w-full'
          value={roomCode}
          onChange={e => setRoomCode(e.target.value)}
        />

        <Button size='sm' type='submit'>
          {t('Enter')}
        </Button>
      </Form>
    </Modal>
  )
}
