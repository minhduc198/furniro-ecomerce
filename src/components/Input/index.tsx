type Props = {
  title: string
  isFormError?: boolean
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function Input({ title, isFormError, placeholder, ...rest }: Props) {
  return (
    <label className='title-input'>
      {title}
      <div className={`input-content ${isFormError ? 'form-error' : ''}`}>
        <input {...rest} placeholder={placeholder} />
      </div>
    </label>
  )
}
