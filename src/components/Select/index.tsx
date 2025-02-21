import { ISelectOption } from '../../types'

interface Props extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options: ISelectOption[]
}

export default function Select({ options, ...rest }: Props) {
  return (
    <select {...rest}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  )
}
