/* eslint-disable @typescript-eslint/no-explicit-any */
import emailjs from 'emailjs-com'
import { useState } from 'react'
import HeroBreadCrumb from '../../components/HeroBreadCrumb'
import Input from '../../components/Input'
import Select from '../../components/Select'
import useCart from '../../hooks/useCart'
import { formatCurrency } from '../../utils'
import Banner from '../../components/Banner'

export default function CheckOut() {
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

  const getMethod = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = Number(e.target.value)
    setOption(value)
  }

  const changeOption =
    (
      name:
        | 'firstName'
        | 'lastName'
        | 'companyName'
        | 'country'
        | 'address'
        | 'city'
        | 'province'
        | 'zip'
        | 'phone'
        | 'email'
        | 'moreInfo'
    ) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      e.preventDefault()
      const value = e.target.value
      setAllInfo((prev) => ({
        ...prev,
        [name]: value
      }))
    }

  const sendEmail = (data: any) => {
    emailjs.send('service_z030q34', 'template_q5y4ltk', data, 'pQy_Diuo7Dv0EfIBm').then(
      (result) => {
        alert('Email đã được gửi!' + result.text)
      },
      (error) => {
        alert('Gửi email thất bại!' + error.text)
      }
    )
  }

  return (
    <div className='container checkout'>
      <HeroBreadCrumb page={'Checkout'} />
      <div className='checkout-content'>
        <div className='billing-details'>
          <div className='all-info'>
            <h2>Billing details</h2>
            <div className='full-name'>
              <Input title='First name' handleData={changeOption('firstName')} />
              <Input title='Last name' handleData={changeOption('lastName')} />
            </div>
            <Input title='Company Name (Optional)' handleData={changeOption('companyName')} />
            <div>
              <div className='title-select'>Country / Region</div>
              <div className='select-info'>
                <Select options={countryOption} defaultValue={allInfo.country} handleData={changeOption('country')} />
              </div>
            </div>
            <Input title='Street address' handleData={changeOption('address')} />
            <Input title='Town / City' handleData={changeOption('city')} />
            <div>
              <div className='title-select'>Province</div>
              <div className='select-info'>
                <Select
                  options={provinceOption}
                  defaultValue={allInfo.province}
                  handleData={changeOption('province')}
                />
              </div>
            </div>
            <Input title='ZIP code' handleData={changeOption('zip')} />
            <Input title='Email address' handleData={changeOption('email')} />
            <Input title='Phone' handleData={changeOption('phone')} />
            <Input title='' placeholder='Additional information' handleData={changeOption('moreInfo')} />
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
          <button className='btn-order' onClick={() => sendEmail(allInfo)} disabled={false}>
            Place order
          </button>
        </div>
      </div>
      <Banner />
    </div>
  )
}
