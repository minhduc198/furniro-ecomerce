import { IPost } from '../../types'

interface Props {
  item: IPost
}

export default function MoreReel({ item }: Props) {
  return (
    <div className='mini-post'>
      <div className='mini-post-image'>
        <img src={item.image} alt='' />
      </div>
      <div className='mini-post-info'>
        <div className='mini-post-title'>{item.title}</div>
        <div className='mini-post-create'>{item.createdAt}</div>
      </div>
    </div>
  )
}
