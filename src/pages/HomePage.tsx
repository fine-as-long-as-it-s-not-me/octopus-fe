import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Spacing, useModal } from 'sam-react-modal'

import { useLogin } from '@/apis/player'
import { useTest } from '@/apis/test'
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
  const { name, setName, UUID, lang } = useUserStore()
  const { openModal } = useModal()
  const { mutate: login } = useLogin()

  const avatarUrl = useAvatar(name)

  const enterSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const enteredName = (formData.get('name') as string) || ''

    if (!enteredName.trim())
      return openModal(<Alert>{t('Please enter your name.')}</Alert>)

    setName(enteredName)
    login({ name: enteredName, UUID, lang })
    navigate(ROUTES.LOBBY)
  }

  const { mutate } = useTest()
  useEffect(() => {
    mutate()
  })

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
      <Spacing />
    </>
  )
}
