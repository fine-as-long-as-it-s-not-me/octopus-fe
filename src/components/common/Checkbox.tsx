import type { InputHTMLAttributes } from 'react'

import './Checkbox.css'

export default function Checkbox(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='scale-150 mr-3 mt-3'>
      <div className='checkbox-wrapper-2'>
        <input type='checkbox' className='sc-gJwTLC ikxBAC' {...props} />
      </div>
    </div>
  )
}
