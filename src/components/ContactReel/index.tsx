import { FaCalendar, FaTag, FaUser } from 'react-icons/fa6'
import { IPost } from '../../types'
import { useState } from 'react'
import { formatDate } from '../../utils'

interface Props {
  item: IPost
}

export default function ContactReel({ item }: Props) {
  const [btnShow, setBtnShow] = useState(false)

  return (
    <>
      <div className='post-image'>
        <img src={item.image} alt='' />
      </div>
      <div className='post-info'>
        <div className='info-item'>
          <FaUser size={20} />
          <p>{item.author}</p>
        </div>

        <div className='info-item'>
          <FaCalendar size={20} />
          <p>{formatDate(item.createdAt)}</p>
        </div>

        <div className='info-item'>
          <FaTag size={20} />
          <p>{item.category}</p>
        </div>
      </div>
      <div className='post-title'>{item.title}</div>
      <div className={`post-content ${btnShow && 'more-content'}`}>{item.content}</div>
      <div className={`btn-read-more`} onClick={() => setBtnShow(!btnShow)}>
        {btnShow ? 'Read less' : 'Read more'}
      </div>
    </>
  )
}
