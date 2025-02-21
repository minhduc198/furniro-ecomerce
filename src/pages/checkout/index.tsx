/* eslint-disable @typescript-eslint/no-explicit-any */
import emailjs from 'emailjs-com'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Banner from '../../components/Banner'
import HeroBreadCrumb from '../../components/HeroBreadCrumb'
import Input from '../../components/Input'
import Select from '../../components/Select'
import useCart from '../../hooks/useCart'
import { formatCurrency } from '../../utils'

export default function CheckoutPage() {
  const { cartState } = useCart()
  const [option, setOption] = useState(0)

  const countryOption = [
    {
      value: 'Viet Nam',
      label: 'Viet Nam'
    },

    {
      value: 'USA',
      label: 'America'
    },

    {
      value: 'French',
      label: 'French'
    },

    {
      value: 'England',
      label: 'England'
    }
  ]

  const provinceOption = [
    { value: 'Western Province', label: 'Western Province' },
    { value: 'Northern Province', label: 'Northern Province' },
    { value: 'Eastern Province', label: 'Eastern Province' },
    { value: 'Southern Province', label: 'Southern Province' }
  ]

  const [allInfo, setAllInfo] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    address: '',
    city: '',
    province: '',
    zip: '',
    phone: '',
    email: '',
    moreInfo: ''
  })

  const [isFullInfo, setIsFullInfo] = useState(true)

  const [formError, setFormError] = useState<{
    email: string
    phone: string
    zipCode: string
  }>({
    email: '',
    phone: '',
    zipCode: ''
  })

  const getMethod = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = Number(e.target.value)
    setOption(value)
  }

  const changeOption = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault()
    const { value, name } = e.target
    setAllInfo((prev) => ({
      ...prev,
      [name]: value
    }))

    if (name === 'email') {
      setFormError({ ...formError, email: '' })
    }

    if (name === 'phone') {
      setFormError({ ...formError, phone: '' })
    }

    if (name === 'zip') {
      setFormError({ ...formError, zipCode: '' })
    }
  }
  // const changeOption = (name: keyof typeof allInfo) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   e.preventDefault()
  //   const value = e.target.value
  //   setAllInfo((prev) => ({
  //     ...prev,
  //     [name]: value
  //   }))
  // }

  useEffect(() => {
    if (allInfo.email && allInfo.phone) {
      setIsFullInfo(false)
    } else {
      setIsFullInfo(true)
    }
  }, [allInfo.zip, allInfo.email, allInfo.phone])

  const sendEmail = (data: Record<string, unknown>) => {
    let validForm = true
    const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!strictEmailRegex.test(allInfo.email)) {
      setFormError((prev) => ({ ...prev, email: 'Email không đúng định dạng.' }))
      validForm = false
    }

    const phoneRegex = /^(\+?\d{1,3})?[-.\s]?(\(?\d{3}\)?)?[-.\s]?\d{3}[-.\s]?\d{4}$/
    if (!phoneRegex.test(allInfo.phone)) {
      setFormError((prev) => ({ ...prev, phone: 'Số điện thoại không đúng định dạng.' }))
      validForm = false
    }

    if (!allInfo.zip.trim()) {
      setFormError((prev) => ({ ...prev, zipCode: 'Zip code không được để trống' }))
      validForm = false
    }

    if (validForm) {
      emailjs.send('service_z030q34', 'template_q5y4ltk', data, 'pQy_Diuo7Dv0EfIBm').then(
        (result) => {
          toast.success('Send email!' + result.text)
        },
        (error) => {
          toast.error('Cannot send email!' + error.text)
        }
      )
    }
  }

  return (
    <div className='container checkout'>
      <HeroBreadCrumb page={'Checkout'} />
      <div className='checkout-content'>
        <div className='billing-details'>
          <div className='all-info'>
            <h2>Billing details</h2>
            <div className='full-name'>
              <Input title='First name' type='text' name='firstName' onChange={changeOption} />
              <Input title='Last name' type='text' name='lastName' onChange={changeOption} />
            </div>
            <Input title='Company Name (Optional)' type='text' name='companyName' onChange={changeOption} />
            <div>
              <div className='title-select'>Country / Region</div>
              <div className='select-info'>
                <Select options={countryOption} defaultValue={allInfo.country} name='country' onChange={changeOption} />
              </div>
            </div>
            <Input title='Street address' type='text' name='address' onChange={changeOption} />
            <Input title='Town / City' type='text' name='city' onChange={changeOption} />
            <div>
              <div className='title-select'>Province</div>
              <div className='select-info'>
                <Select options={provinceOption} value={allInfo.province} name='province' onChange={changeOption} />
              </div>
            </div>
            <div>
              <Input
                title='ZIP code'
                type='text'
                name='zip'
                isFormError={!!formError.zipCode}
                onChange={changeOption}
              />
              {formError.zipCode && <div className='help-text'>{formError.zipCode}</div>}
            </div>
            <div>
              <Input
                title='Email address'
                type='email'
                name='email'
                isFormError={!!formError.email}
                onChange={changeOption}
              />
              {formError.email && <div className='help-text'>{formError.email}</div>}
            </div>
            <div>
              <Input
                title='Phone'
                type='text'
                name='phone'
                className='no-spinner'
                isFormError={!!formError.phone}
                onChange={changeOption}
              />
              {formError.phone && <div className='help-text'>{formError.phone}</div>}
            </div>
            <Input title='' type='text' placeholder='Additional information' name='moreInfo' onChange={changeOption} />
          </div>
        </div>
        <div className='checkout-product'>
          <div className='product-detail'>
            <div className='checkout-detail'>
              <p>Product</p>
              <p>Subtotal</p>
            </div>

            <div className='checkout-name'>
              <div className='checkout-name-product'>
                {cartState.items.map((item) => {
                  return (
                    <p key={item.id}>
                      {item.name} x {item.quantity}
                    </p>
                  )
                })}
              </div>
              <div className='checkout-name-price'>
                {cartState.items.map((item) => {
                  return <p key={item.id}>Rs. {formatCurrency(item.price)}</p>
                })}
              </div>
            </div>

            <div className='checkout-subtotal'>
              <p>Subtotal</p>
              <p>Rs. {formatCurrency(cartState.total)}</p>
            </div>

            <div className='checkout-total'>
              <p>Total</p>
              <p>Rs. {formatCurrency(cartState.total)}</p>
            </div>
          </div>
          <form className='payment-method'>
            <div className='method-option'>
              <div className='option'>
                <input type='radio' id='1' value={1} name='method' onChange={getMethod} />
                <label htmlFor='1'>Direct Bank Transfer</label>
              </div>
              {option === 1 && (
                <p>
                  Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                  Your order will not be shipped until the funds have cleared in our account.
                </p>
              )}
            </div>

            <div className='method-option'>
              <div className='option'>
                <input type='radio' id='2' value={2} name='method' onChange={getMethod} />
                <label htmlFor='2'>Direct Visa Transfer</label>
              </div>
              {option === 2 && (
                <p>
                  Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                </p>
              )}
            </div>

            <div className='method-option'>
              <div className='option'>
                <input type='radio' id='3' value={3} name='method' onChange={getMethod} />
                <label htmlFor='3'>Cash On Delivery</label>
              </div>
              {option === 3 && <p>Your order will not be shipped until the funds have cleared in our account.</p>}
            </div>
          </form>
          <div className='checkout-note'>
            Your personal data will be used to support your experience throughout this website, to manage access to your
            account, and for other purposes described in our <span>privacy policy.</span>
          </div>
          <button
            className={`btn-order ${isFullInfo && 'btn-disable'}`}
            onClick={() => sendEmail(allInfo)}
            disabled={isFullInfo}
          >
            Place order
          </button>
        </div>
      </div>
      <Banner />
    </div>
  )
}
