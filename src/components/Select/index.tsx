import { ISelectOption } from '../../types'

interface Props extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options: ISelectOption[]
  handleData: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Select({ options, handleData, ...rest }: Props) {
  return (
    <select {...rest}>
      {options.map((item) => (
        <option key={item.value} value={item.value} onChange={() => handleData}>
          {item.label}
        </option>
      ))}
    </select>
  )
}
