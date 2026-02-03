import { useTranslation } from 'react-i18next'
import { useModal } from 'sam-react-modal'

import { useChangeRoomSettings, useVoteCustomKeyword } from '@/apis/room'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Form from '@/components/common/Form'
import Icon from '@/components/common/Icon'
import Input from '@/components/common/Input'
import Alert from '@/components/modals/Alert'
import CustomKeywordListItem from '@/components/room/CustomKeywordListItem'
import { encode } from '@/lib/code'
import { useRoomStore } from '@/store/roomStore'

export default function CustomKeywordPage() {
  const { t } = useTranslation()
  const { openModal } = useModal()
  const { settings, customKeywords, roomCode } = useRoomStore()
  const enabledCount = customKeywords.filter(
    ({ voteCount }) => voteCount >= settings.customKeywordMinVotes,
  ).length

  const { mutate: fetchSettings } = useChangeRoomSettings()
  const { mutate: voteCustomKeyword } = useVoteCustomKeyword()

  const addKeywordHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const keyword = formData.get('customKeyword') as string
    if (!keyword?.trim()) return

    voteCustomKeyword({ keyword })

    e.currentTarget.reset()
  }

  return (
    <>
      <Card className='flex min-h-[30dvh] grow flex-col items-center justify-between gap-2'>
        <div className='text-center'>
          {t('Custom Keyword List')}
          <p>
            {enabledCount} {t('words enabled')} ( &ge;{' '}
            {settings.customKeywordMinVotes} {t('votes')} )
          </p>
        </div>
        <div className='no-scrollbar flex max-h-[calc(70dvh-120px)] flex-row flex-wrap justify-center gap-2 overflow-scroll p-4'>
          {customKeywords.length ? (
            customKeywords.map(({ keyword, voteCount }) => (
              <CustomKeywordListItem
                key={keyword}
                word={keyword}
                votes={voteCount}
              />
            ))
          ) : (
            <p className='text-black/50'>
              {t('No custom keywords added yet.')}
            </p>
          )}
        </div>
        <Form
          onSubmit={addKeywordHandler}
          className='flex flex-row items-center gap-2'
        >
          <Input
            shape='sm'
            placeholder={
              settings.isCustomKeywordVoteOpen
                ? t('Enter new custom keyword')
                : t('Voting is closed')
            }
            name='customKeyword'
            className='h-full'
            disabled={!settings.isCustomKeywordVoteOpen}
          ></Input>
          <Button type='submit' size='sm' cardClassName='rounded-xl'>
            {t('Add')}
          </Button>
        </Form>
      </Card>
      <div className='flex h-full grow flex-col sm:h-auto sm:gap-2'>
        <Card className='grow-1 flex-col items-center justify-center gap-4'>
          {settings.isCustomKeywordVoteOpen ? (
            <p className='text-md text-gray-700'>
              {t('The vote is currently open.')}
            </p>
          ) : (
            <p className='text-md text-gray-700'>
              {t('The vote is currently closed.')}
            </p>
          )}
          <Button
            size='md'
            cardClassName='rounded-xl'
            onClick={() => {
              fetchSettings({
                settings: {
                  isCustomKeywordVoteOpen: !settings.isCustomKeywordVoteOpen,
                },
              })
            }}
          >
            {settings.isCustomKeywordVoteOpen
              ? t('Close Vote')
              : t('Open Vote')}
          </Button>
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
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/room/keyword-register?roomCode=${encode(roomCode)}`,
              )
              openModal(<Alert>{t('Vote link copied to clipboard!')}</Alert>)
            }}
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
                  customKeywordMinVotes: Number(minVote),
                },
              })
            }}
            className='flex flex-col gap-2'
          >
            <h2>{t('Minimum votes to get registered')}</h2>
            <div className='flex justify-center gap-2'>
              <Input
                shape='sm'
                type='number'
                min={0}
                defaultValue={settings.customKeywordMinVotes}
                name='minVotes'
                onChange={e => {
                  e.target.value = Math.max(
                    0,
                    Number(e.target.value),
                  ).toString()
                }}
              />
              <Button type='submit' size='sm' cardClassName='rounded-xl'>
                {t('Apply')}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  )
}
