import type { Keyword } from '@/types'

interface Props {
  keyword: Keyword
}

export default function CustomWordListItem({ keyword }: Props) {
  return (
    <div className='flex flex-row gap-2 rounded-2xl bg-white px-3 py-1'>
      <p>{keyword.word}</p>
      <p>{keyword.votes}</p>
    </div>
  )
}
