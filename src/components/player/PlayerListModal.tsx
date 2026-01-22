import { useRoomStore } from '@/store/roomStore'
import Modal from '../common/Modal'
import PlayerListItem from './PlayerListItem'

export default function PlayerListModal() {
  const { players } = useRoomStore()
  return (
    <Modal>
      {players.map(player => (
        <PlayerListItem key={player.id} {...player} />
      ))}
    </Modal>
  )
}
