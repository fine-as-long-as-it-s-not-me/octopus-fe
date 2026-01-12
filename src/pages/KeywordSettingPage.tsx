import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Form from '@/components/common/Form'
import Icon from '@/components/common/Icon'
import Input from '@/components/common/Input'
import { useRoom } from '@/context/RoomContext'

export default function KeywordSettingPage() {
  const navigate = useNavigate()
  const { setCloseButton } = useRoom()
  const { t } = useTranslation()

  useEffect(() => {
    setCloseButton(
      <Button size='md' onClick={() => navigate(-1)}>
        <Icon name={'arrow_back'} />
      </Button>,
    )
  }, [navigate, setCloseButton])
  return (
    <div className='flex flex-row gap-4 md:gap-6'>
      <div className='flex w-1/2 grow flex-col gap-4'>
        <Card className='flex flex-col items-center gap-4'>
          {t('Custom Word List')}
          <Form
            onSubmit={() => {}}
            className='flex flex-row items-center gap-2'
          >
            <Input shape='sm'></Input>
            <Button type='submit' size='sm'>
              {t('Add')}
            </Button>
          </Form>
        </Card>
      </div>
      <div className='flex w-1/2 grow flex-col gap-4'>
        <Button size='lg'>{t('Close Vote')}</Button>
        <Card className='flex flex-col items-center gap-4'>
          <p className='text-center text-xl'>
            {t('Public Vote (for streamers)')}
          </p>
          <p>
            {t(
              `Anyone with the link can vote words to register. This feature is recommended to use with setting ‘Minimum votes to get registered’ to more than 0 to prevent trolls.`,
            )}
          </p>
          <Button size='sm' cardClassName='gap-2 px-4 py-3 md:px-6 md:py-4'>
            <p>{t('Copy vote link')}</p>
            <Icon name='content_copy' />
          </Button>
        </Card>
        <Card>
          <Form onSubmit={() => {}} className='flex flex-col gap-2'>
            <h2>{t('Minimum votes to get registered')}</h2>
            <Input shape='sm' type='number' min={0} defaultValue={0}></Input>
          </Form>
        </Card>
      </div>
    </div>
  )
}
