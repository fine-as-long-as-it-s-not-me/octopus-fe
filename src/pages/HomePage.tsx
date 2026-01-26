import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Spacing, useModal } from 'sam-react-modal'

import { useLogin } from '@/apis/room'
// import chzzkIcon from '@/assets/images/icons/chzzk.png'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Form from '@/components/common/Form'
import Img from '@/components/common/Img'
import Input from '@/components/common/Input'
import Alert from '@/components/modals/Alert'
import useAvatar from '@/hooks/useAvatar'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'

export default function HomePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { name, setName } = useUserStore()
  const { openModal } = useModal()
  const { mutate: login } = useLogin()

  const avatarUrl = useAvatar(name)

  const enterSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const name = (formData.get('name') as string) || ''

    if (!name.trim())
      return openModal(<Alert>{t('Please enter your name.')}</Alert>)

    setName(name)
    login(name)
    navigate(ROUTES.LOBBY)
  }

  return (
    <>
      <Card className='shrink-0 justify-center'>
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
            <Input placeholder={t('Your name?')} name='name' maxLength={12} />
          </div>
          <Button size='md' type='submit'>
            {t('Enter')}
          </Button>
        </Form>
      </Card>
      {/* <Button icon={<Img width={32} src={chzzkIcon} alt='Chzzk Icon' />}>
        {t('Live Streamer')}
      </Button> */}
      <Spacing />
    </>
  )
}
