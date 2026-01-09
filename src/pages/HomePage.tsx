import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Spacing } from 'sam-react-modal'

import chzzkIcon from '@/assets/images/icons/chzzk.png'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Form from '@/components/common/Form'
import Img from '@/components/common/Img'
import Input from '@/components/common/Input'
import useAvatar from '@/hooks/useAvatar'
import { ROUTES } from '@/routes/ROUTES'

export default function HomePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const avatarUrl = useAvatar(name)

  const enterSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(ROUTES.LOBBY)
  }

  return (
    <>
      <Card>
        <Form
          onSubmit={enterSubmitHandler}
          className='flex flex-col items-center gap-3'
        >
          <p>{t('Guest')}</p>
          <div className='flex md:flex-row flex-col gap-2 md:gap-4 items-center'>
            <Img
              className='rounded-full m-[-24px]'
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
          <Button size='sm' type='submit'>
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
