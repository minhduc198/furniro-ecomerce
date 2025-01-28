interface Props {
  title: string
  placeholder?: string
  handleData: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export default function Input({ title, placeholder, handleData }: Props) {
  return (
    <form>
      <label className='title-input' htmlFor={title}>
        {title}
        <div className='input-content'>
          <input type='text' id={title} placeholder={placeholder} onChange={handleData} />
        </div>
      </label>
    </form>
  )
}
