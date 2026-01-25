import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { useWindow } from '@/context/WindowContext'
import { useUserStore } from '@/store/userStore'
import Card from '../common/Card'
import Form from '../common/Form'
import Input from '../common/Input'
import Bubble from './Bubble'

const mockAuthor = { name: 'Alice', UUID: '1' }
const mockMessage = 'Hello, this is a sample message!'

export default function ChatCard() {
  const { t } = useTranslation()
  const [chatBubbles, setChatBubbles] = useState([
    { author: mockAuthor, message: mockMessage },
  ])
  const { name, UUID } = useUserStore()
  const { direction } = useWindow()

  const chatListRef = useRef<HTMLDivElement>(null)

  return (
    <Card
      className={twMerge(
        'flex h-full min-h-[240px] flex-col justify-start p-0 md:p-0 lg:p-0',
        direction === 'vertical' ? 'w-auto grow-12' : 'w-fit grow-1',
      )}
    >
      <div
        className='no-scrollbar flex h-[calc(100%-56px)] flex-col overflow-scroll'
        ref={chatListRef}
      >
        {chatBubbles.map(({ author, message }, index) => (
          <Bubble key={index} author={author} message={message} />
        ))}
      </div>
      <Form
        className='mt-auto flex h-[56px] shrink-0 sm:rounded-t-none'
        onSubmit={e => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const message = formData.get('chatMessage') as string
          if (!message.trim()) return
          const newMessage = {
            author: { name, UUID },
            message,
          }
          setChatBubbles(prevBubbles => [...prevBubbles, newMessage])

          e.currentTarget.reset()

          if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight
          }
        }}
      >
        <Input
          placeholder={t('Type your message...')}
          className='h-full w-full shrink-0 rounded-none sm:rounded-t-none'
          name='chatMessage'
        />
      </Form>
    </Card>
  )
}
