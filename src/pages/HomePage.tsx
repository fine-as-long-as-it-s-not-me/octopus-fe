import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Spacing, useModal } from 'sam-react-modal'

import chzzkIcon from '@/assets/images/icons/chzzk.png'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Form from '@/components/common/Form'
import Img from '@/components/common/Img'
import Input from '@/components/common/Input'
import Alert from '@/components/modals/Alert'
import { useUser } from '@/context/UserContext'
import useAvatar from '@/hooks/useAvatar'
import { ROUTES } from '@/routes/ROUTES'

export default function HomePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { name, setName } = useUser()
  const { openModal } = useModal()

  const avatarUrl = useAvatar(name)
  const enterSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim())
      return openModal(<Alert>{t('Please enter your name.')}</Alert>)

    localStorage.setItem('name', name)
    navigate(ROUTES.LOBBY)
  }

  return (
    <>
      <Card className='justify-center'>
        <Form onSubmit={enterSubmitHandler} className='flex-col gap-3'>
          <p>{t('Guest')}</p>
          <div className='flex flex-col items-center gap-2 md:flex-row md:gap-4'>
            <Img
              className='m-[-24px]'
              width={120}
              height={120}
              src={avatarUrl}
              alt='Avatar'
            />
            <Input
              placeholder={t('Your name?')}
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={12}
            />
          </div>
          <Button size='md' type='submit'>
            {t('Enter')}
          </Button>
        </Form>
      </Card>
      <Button icon={<Img width={32} src={chzzkIcon} alt='Chzzk Icon' />}>
        {t('Live Streamer')}
      </Button>
      <Spacing />
    </>
  )
}
