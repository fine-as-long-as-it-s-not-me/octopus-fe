import { useTranslation } from 'react-i18next'

import { useChangeRoomSettings, useVoteCustomWord } from '@/apis/room'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Form from '@/components/common/Form'
import Icon from '@/components/common/Icon'
import Input from '@/components/common/Input'
import CustomWordListItem from '@/components/room/CustomWordListItem'
import { useRoomStore } from '@/store/roomStore'

export default function CustomWordPage() {
  const { t } = useTranslation()
  const { settings, customWords } = useRoomStore()

  const { mutate: fetchSettings } = useChangeRoomSettings()
  const { mutate: voteCustomWord } = useVoteCustomWord()

  const addKeywordHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const keyword = formData.get('customWord') as string
    if (!keyword?.trim()) return

    voteCustomWord({ keyword })

    e.currentTarget.reset()
  }

  const enabledCount = customWords.filter(
    ({ voteCount }) => voteCount >= settings.customWordMinVotes,
  ).length

  return (
    <>
      <Card className='flex min-h-[30dvh] grow flex-col items-center justify-between gap-2'>
        <div>
          {t('Custom Word List')}
          <p>
            {enabledCount} {t('words enabled')} ( &ge;{' '}
            {settings.customWordMinVotes} {t('votes')} )
          </p>
        </div>
        <div className='no-scrollbar flex max-h-[calc(70dvh-120px)] flex-row flex-wrap justify-center gap-2 overflow-scroll p-4'>
          {customWords.length ? (
            customWords.map(({ keyword, voteCount }) => (
              <CustomWordListItem
                key={keyword}
                word={keyword}
                votes={voteCount}
              />
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
            placeholder={
              settings.isCustomWordVoteOpen
                ? t('Enter new custom word')
                : t('Voting is closed')
            }
            name='customWord'
            disabled={!settings.isCustomWordVoteOpen}
          ></Input>
          <Button type='submit' size='sm'>
            {t('Add')}
          </Button>
        </Form>
      </Card>
      <div className='flex h-full grow flex-col sm:h-auto sm:gap-2'>
        <Card className='grow-1 flex-col items-center justify-center gap-4'>
          {settings.isCustomWordVoteOpen ? (
            <>
              <p className='text-md text-gray-700'>
                {t('The vote is currently open.')}
              </p>
              <Button
                size='md'
                onClick={() => {
                  fetchSettings({ settings: { isCustomWordVoteOpen: false } })
                }}
              >
                {t('Close Vote')}
              </Button>
            </>
          ) : (
            <>
              <p className='text-md text-gray-700'>
                {t('The vote is currently closed.')}
              </p>
              <Button
                size='md'
                onClick={() => {
                  fetchSettings({ settings: { isCustomWordVoteOpen: true } })
                }}
              >
                {t('Open Vote')}
              </Button>
            </>
          )}
        </Card>
        <Card className='flex grow-2 flex-col items-center justify-center gap-4'>
          <p className='text-center text-xl'>
            {t('Public Vote (for streamers)')}
          </p>
          <p>
            {t(
              `Anyone with the link can vote words to register. This feature is recommended to use with settings ‘Minimum votes to get registered’ to more than 1 to prevent trolls.`,
            )}
          </p>
          <Button
            size='md'
            cardClassName='gap-2 px-4 py-3 md:px-6 md:py-4 rounded-xl'
          >
            <p>{t('Copy vote link')}</p>
            <Icon name='content_copy' />
          </Button>
        </Card>
        <Card className='grow-1 items-center justify-center'>
          <Form
            onSubmit={e => {
              const minVote = new FormData(e.currentTarget).get('minVotes')
              fetchSettings({
                settings: {
                  customWordMinVotes: Number(minVote),
                },
              })
            }}
            className='flex flex-col gap-2'
          >
            <h2>{t('Minimum votes to get registered')}</h2>
            <Input
              shape='sm'
              type='number'
              min={0}
              defaultValue={settings.customWordMinVotes}
              name='minVotes'
              onChange={e => {
                e.target.value = Math.max(0, Number(e.target.value)).toString()
              }}
            />
            <Button type='submit' size='md'>
              {t('Apply')}
            </Button>
          </Form>
        </Card>
      </div>
    </>
  )
}
