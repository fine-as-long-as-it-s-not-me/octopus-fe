import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useUser } from '@/context/UserContext'
import Card from '../common/Card'
import Form from '../common/Form'
import Input from '../common/Input'
import Bubble from './Bubble'

const mockAuthor = { name: 'Alice', id: '1' }
const mockMessage = 'Hello, this is a sample message!'

export default function ChatCard() {
  const { t } = useTranslation()
  const [chatBubbles, setChatBubbles] = useState([
    { author: mockAuthor, message: mockMessage },
  ])
  const { name, id } = useUser()

  const chatListRef = useRef<HTMLDivElement>(null)

  return (
    <Card className='flex h-[40dvh] grow-4 flex-col justify-start p-0 sm:h-auto sm:w-fit md:p-0 lg:p-0'>
      <div
        className='no-scrollbar flex h-[calc(100%-56px)] flex-col overflow-scroll'
        ref={chatListRef}
      >
        {chatBubbles.map(({ author, message }, index) => (
          <Bubble key={index} author={author} message={message} />
        ))}
      </div>
      <Form
        className='mt-auto flex h-[56px] shrink-0 rounded-t-none'
        onSubmit={e => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const message = formData.get('chatMessage') as string
          if (!message.trim()) return
          const newMessage = {
            author: { name, id },
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
          className='h-full w-full shrink-0 sm:rounded-t-none'
          name='chatMessage'
        />
      </Form>
    </Card>
  )
}
