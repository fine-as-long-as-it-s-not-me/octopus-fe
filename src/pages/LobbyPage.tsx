import { useTranslation } from 'react-i18next'
import { Spacing } from 'sam-react-modal'

import chzzkIcon from '@/assets/images/icons/chzzk.png'
import Button from '@/components/common/Button'
import Img from '@/components/common/Img'

export default function LobbyPage() {
  const { t } = useTranslation()
  return (
    <>
      <Spacing />
      <Button>{t('Random Room')}</Button>
      <Button>{t('Use Room Code')}</Button>
      <Button>{t('Create Room')}</Button>
      <Button icon={<Img width={32} src={chzzkIcon} alt='Chzzk Icon' />}>
        {t('Leaderboard')}
      </Button>
      <Spacing />
    </>
  )
}
