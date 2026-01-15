import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Form from '@/components/common/Form'
import Icon from '@/components/common/Icon'
import Input from '@/components/common/Input'
import KeywordListItem from '@/components/game/KeywordListItem'
import type { Keyword } from '@/types'

export default function CustomWordPage() {
  const { t } = useTranslation()

  const [keywords, setKeywords] = useState<Keyword[]>([])

  const addKeywordHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const word = formData.get('customWord') as string
    if (!word) return
    const newKeyword: Keyword = {
      id: crypto.randomUUID(),
      word,
      votes: 1,
    }
    setKeywords(prevKeywords => [...prevKeywords, newKeyword])
    e.currentTarget.reset()
  }

  return (
    <div className='flex flex-col sm:flex-row sm:gap-4 md:gap-6'>
      <Card className='flex h-fit min-h-[30dvh] flex-col items-center justify-between gap-4 sm:w-1/2'>
        {t('Custom Word List')}
        <div className='no-scrollbar flex max-h-[calc(70dvh-120px)] flex-row flex-wrap justify-center gap-2 overflow-scroll p-4'>
          {keywords.length ? (
            keywords.map(keyword => (
              <KeywordListItem key={keyword.id} keyword={keyword} />
            ))
          ) : (
            <p className='text-black/50'>{t('No custom words added yet.')}</p>
          )}
        </div>
        <Form
          onSubmit={addKeywordHandler}
          className='flex flex-row items-center gap-2'
        >
          <Input
            shape='sm'
            placeholder={t('Enter new custom word')}
            name='customWord'
          ></Input>
          <Button type='submit' size='sm'>
            {t('Add')}
          </Button>
        </Form>
      </Card>
      <div className='flex h-full flex-col sm:h-auto sm:w-1/2 sm:gap-4'>
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
          <Button size='md' cardClassName='gap-2 px-4 py-3 md:px-6 md:py-4'>
            <p>{t('Copy vote link')}</p>
            <Icon name='content_copy' />
          </Button>
        </Card>
        <Card className='justify-center'>
          <Form onSubmit={() => {}} className='flex flex-col gap-2'>
            <h2>{t('Minimum votes to get registered')}</h2>
            <Input
              shape='sm'
              type='number'
              min={0}
              defaultValue={0}
              onChange={e => {
                e.currentTarget.value = Math.max(
                  0,
                  parseInt(e.currentTarget.value) || 0,
                ).toString()
              }}
            ></Input>
          </Form>
        </Card>
      </div>
    </div>
  )
}
