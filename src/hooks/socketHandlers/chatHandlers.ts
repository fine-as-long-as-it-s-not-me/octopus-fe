import { SYSTEM } from '@/consts'
import type { ChatResponse, MessageHandlers, SystemChatResponse } from '@/types'

type ChatHandlersDeps = {
  t: (key: string) => string
  addChat: (chat: ChatResponse) => void
}

const createSystemChatHandler = (
  t: ChatHandlersDeps['t'],
  addChat: ChatHandlersDeps['addChat'],
): MessageHandlers['system_chat'] => {
  const addSystemChat = (text: string) => {
    addChat({ player: SYSTEM, text })
  }

  return ({ type, variable }: SystemChatResponse) => {
    switch (type) {
      case 'player_joined':
        addSystemChat(
          `${(variable as { name: string }).name} ${t('joined the game')}.`,
        )
        break
      case 'player_left':
        addSystemChat(
          `${(variable as { name: string }).name} ${t('left the game')}.`,
        )
        break
      case 'discussion_time_changed': {
        const { name, amount } = variable as {
          amount: number
          name: string
        }
        addSystemChat(
          `${name} ${t(`has ${amount > 0 ? 'extended' : 'shortened'} the remaining time`)}.`,
        )
        break
      }
      case 'player_voted': {
        const { voterName } = variable as { voterName: string }
        addSystemChat(`${voterName} ${t('has voted')}.`)
        break
      }
      case 'revote': {
        addSystemChat(
          t(
            'Revote has been initiated due to a tie. If tie occurs again, octopus wins.',
          ),
        )
        break
      }
      case 'octopus_guessed': {
        const { name, word } = variable as { name: string; word: string }
        addSystemChat(`${name} ${t('guessed the code :')} '${word}'`)
        break
      }
      default:
        break
    }
  }
}

export const createChatHandlers = ({
  t,
  addChat,
}: ChatHandlersDeps): Pick<MessageHandlers, 'chat_added' | 'system_chat'> => ({
  chat_added: ({ player, text }: ChatResponse) => {
    // Handled in Chat component
    const chat = { player, text }
    addChat(chat)
  },
  system_chat: createSystemChatHandler(t, addChat),
})
