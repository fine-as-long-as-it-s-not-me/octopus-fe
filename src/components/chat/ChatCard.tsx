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
  const [message, setMessage] = useState('')
  const { name, id } = useUser()

  const chatListRef = useRef<HTMLDivElement>(null)

  return (
    <Card className='flex h-full w-[320px] grow-1 flex-col p-0 md:p-0 lg:p-0'>
      <div className='no-scrollbar h-full overflow-scroll' ref={chatListRef}>
        {chatBubbles.map(({ author, message }, index) => (
          <Bubble key={index} author={author} message={message} />
        ))}
      </div>
      <Form
        className='mt-auto w-full rounded-t-none'
        onSubmit={() => {
          if (message.trim() === '') return
          setChatBubbles([
            ...chatBubbles,
            { author: { name, id }, message: message },
          ])
          setMessage('')
          if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight
          }
        }}
      >
        <Input
          placeholder={t('Type your message...')}
          className='w-full rounded-t-none'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </Form>
    </Card>
  )
}
