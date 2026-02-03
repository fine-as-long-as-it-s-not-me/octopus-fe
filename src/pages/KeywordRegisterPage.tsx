import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'

import {
  useJoinRoomAnonymous,
  useVoteCustomKeywordAnonymous,
} from '@/apis/room'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Form from '@/components/common/Form'
import Input from '@/components/common/Input'
import CustomKeywordListItem from '@/components/room/CustomKeywordListItem'
import { useToast } from '@/context/ToastContext'
import { decode } from '@/lib/code'
import { ROUTES } from '@/routes/ROUTES'
import { useRoomStore } from '@/store/roomStore'
import { useUserStore } from '@/store/userStore'

export default function KeywordRegisterPage() {
  const { t } = useTranslation()
  const { toast } = useToast()

  const { mutate: joinRoomAnonymous } = useJoinRoomAnonymous()
  const { mutate: voteCustomKeywordAnonymous } = useVoteCustomKeywordAnonymous()

  const [params] = useSearchParams()
  const roomCode = decode(params.get('roomCode') ?? '')
  const navigate = useNavigate()

  const { settings, customKeywords } = useRoomStore()
  const { UUID } = useUserStore()

  const enabledCount = customKeywords.filter(
    ({ voteCount }) => voteCount >= settings.customKeywordMinVotes,
  ).length

  const addKeywordHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const keyword = formData.get('customKeyword') as string
    if (!keyword?.trim()) return

    if (roomCode == null) {
      toast('Invalid room code.')
      navigate(ROUTES.HOME)
      return
    }

    voteCustomKeywordAnonymous({ roomCode, keyword, UUID })

    e.currentTarget.reset()
  }

  useEffect(() => {
    if (roomCode == null) {
      toast('Invalid room code.')
      navigate(ROUTES.HOME)
      return
    }

    joinRoomAnonymous({ roomCode })
  }, [roomCode, navigate, toast, joinRoomAnonymous])

  return (
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
          <p className='text-black/50'>{t('No custom keywords added yet.')}</p>
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
  )
}
