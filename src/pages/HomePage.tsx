import { useNavigate } from 'react-router-dom'
import { Spacing } from 'sam-react-modal'

import chzzkIcon from '@/assets/images/icons/chzzk.png'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Form from '@/components/common/Form'
import Img from '@/components/common/Img'
import Input from '@/components/common/Input'
import { ROUTES } from '@/routes/ROUTES'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <>
      <Card>
        <Form
          onSubmit={() => {}}
          className='flex flex-col items-center gap-4 md:gap-6'
        >
          <p>Guest</p>
          <Input placeholder='Your name?' className='w-full' />
          <Button
            size='sm'
            type='submit'
            onClick={() => {
              navigate(ROUTES.LOBBY)
            }}
          >
            Enter
          </Button>
        </Form>
      </Card>
      <Button icon={<Img width={32} src={chzzkIcon} alt='Chzzk Icon' />}>
        Live Streamer
      </Button>
      <Spacing />
    </>
  )
}
