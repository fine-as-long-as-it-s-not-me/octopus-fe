import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useModal } from 'sam-react-modal'

import { useLogin } from '@/apis/player'
import { useJoinPrivateRoom } from '@/apis/room'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Form from '@/components/common/Form'
import Img from '@/components/common/Img'
import Input from '@/components/common/Input'
import Alert from '@/components/modals/Alert'
import useAvatar from '@/hooks/useAvatar'
import { decode } from '@/lib/code'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'

export default function GuestRoomPage() {
  const { setName, UUID, lang } = useUserStore()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { openModal } = useModal()

  const { mutate: joinPrivateRoom } = useJoinPrivateRoom()
  const { mutate: login } = useLogin()

  const [enteredName, setNameState] = useState('')
  const avatarUrl = useAvatar(enteredName)

  const [params] = useSearchParams()
  const roomCode = decode(params.get('roomCode') ?? '')

  const enterSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    if (!enteredName.trim())
      return openModal(<Alert>{t('Please enter your name.')}</Alert>)

    setName(enteredName)
    login({ name: enteredName, UUID, lang })

    if (roomCode) joinPrivateRoom({ roomCode, UUID })

    navigate(ROUTES.LOBBY)
  }

  return (
    <Card className='shrink-0 flex-col items-center justify-center gap-4 py-6 md:py-8'>
      <Form onSubmit={enterSubmitHandler} className='flex-col gap-3'>
        <p>{t('Guest')}</p>
        <Img
          className='m-[-24px]'
          width={120}
          height={120}
          src={avatarUrl}
          alt='Avatar'
        />
        <div className='flex flex-row items-center gap-2'>
          <Input
            placeholder={t('Your name?')}
            value={enteredName}
            onChange={e => setNameState(e.target.value)}
            maxLength={12}
          />
          <Button size='md' type='submit'>
            {t('Enter')}
          </Button>
        </div>
      </Form>
    </Card>
  )
}
