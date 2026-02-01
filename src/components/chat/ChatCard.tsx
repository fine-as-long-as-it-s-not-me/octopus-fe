import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { useSendChat } from '@/apis/chat'
import { useWindow } from '@/context/WindowContext'
import { useRoomStore } from '@/store/roomStore'
import Card from '../common/Card'
import Form from '../common/Form'
import Input from '../common/Input'
import Bubble from './Bubble'

export default function ChatCard() {
  const { t } = useTranslation()
  const { chats } = useRoomStore()
  const { direction } = useWindow()
  const { mutate: sendChat } = useSendChat()

  const chatListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight
    }
  }, [chats])

  return (
    <Card
      className={twMerge(
        'flex min-h-[400px] shrink-0 flex-col p-0 md:p-0 lg:p-0',
        direction === 'vertical' ? 'w-full grow-1' : 'w-[320px]',
      )}
    >
      <div
        className='no-scrollbar flex h-[calc(100%-56px)] flex-col overflow-y-scroll'
        ref={chatListRef}
      >
        {chats.map((chat, index) => (
          <Bubble key={index} {...chat} />
        ))}
      </div>
      <Form
        className='flex h-[56px] shrink-0 sm:rounded-t-none'
        onSubmit={e => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const message = formData.get('chatMessage') as string
          if (!message.trim()) return

          sendChat({ text: message })

          e.currentTarget.reset()
        }}
      >
        <Input
          placeholder={t('Type your message...')}
          className='h-full w-full shrink-0 rounded-none sm:rounded-t-none'
          name='chatMessage'
          autoComplete='off'
        />
      </Form>
    </Card>
  )
}
