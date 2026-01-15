import { useRoom } from '@/context/RoomContext'
import Modal from '../common/Modal'
import PlayerListItem from './PlayerListItem'

export default function PlayerListModal() {
  const { players } = useRoom()
  return (
    <Modal>
      {players.map(player => (
        <PlayerListItem {...player} />
      ))}
    </Modal>
  )
}
