import Card from '@/components/common/Card'

export default function KeywordPage() {
  return (
    <Card className='flex h-[45%] w-auto grow-16 flex-col items-center justify-center gap-6 sm:h-auto'>
      <p className='text-2xl'>Your given word is...</p>
      <p className='text-[80px]'>Fish</p>
      <p className='text-2xl'>The liar gets different word</p>
    </Card>
  )
}
