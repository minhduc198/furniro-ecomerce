import { ISelectOption } from '../../types'

interface Props {
  options: ISelectOption[]
  handleData: (e: React.ChangeEvent<HTMLSelectElement>) => void
  defaultValue: number | string
}

export default function Select({ options, handleData, defaultValue }: Props) {
  return (
    <select value={defaultValue} onChange={handleData}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  )
}
