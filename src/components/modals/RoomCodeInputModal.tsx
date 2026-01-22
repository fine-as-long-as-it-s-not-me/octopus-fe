import { useTranslation } from 'react-i18next'
import { useModal } from 'sam-react-modal'

import { useSocket } from '@/context/SocketContext'
import Button from '../common/Button'
import Form from '../common/Form'
import Input from '../common/Input'
import Modal from '../common/Modal'
import Alert from './Alert'

export default function RoomCodeInputModal() {
  const { t } = useTranslation()

  const { openModal } = useModal()
  const { joinRoom } = useSocket()

  const roomCodeSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const roomCode = formData.get('roomCode') as string
    if (!roomCode.trim())
      return openModal(<Alert>{t('Please enter the room code.')}</Alert>)
    joinRoom(roomCode)
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
          name='roomCode'
        />

        <Button size='md' type='submit'>
          {t('Enter')}
        </Button>
      </Form>
    </Modal>
  )
}
