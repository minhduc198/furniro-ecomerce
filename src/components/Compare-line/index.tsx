import { SIZE } from '../../constants'

interface Props {
  title: string
  rightValue?: string | number | boolean
  leftValue?: string | number | SIZE
  titleClassName?: string
}
export default function CompareLine({ title, rightValue, leftValue, titleClassName = 'compare-label' }: Props) {
  return (
    <div className='compare-line'>
      <div className={titleClassName}>{title}</div>
      {<div className='left-value'>{leftValue}</div>}
      {<div className='right-value'>{rightValue}</div>}
    </div>
  )
}
