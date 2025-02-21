import { useEffect, useState } from 'react'
import HeroBreadCrumb from '../../components/HeroBreadCrumb'
import { IPost } from '../../types'
import { getContactPosts } from '../../services'
import ContactReel from '../../components/ContactReel'
import MoreReel from '../../components/MoreReel'
import { FaMagnifyingGlass } from 'react-icons/fa6'

export default function Contact() {
  const [contactData, setContactData] = useState<IPost[]>([])

  const listCategories = contactData.map((item) => {
    return item.category
  })

  const groupProduct = [...new Set(listCategories)]

  useEffect(() => {
    getContactPosts().then((data) => {
      setContactData(data)
    })
  }, [])

  return (
    <div className='container contact-page'>
      <HeroBreadCrumb page={'Contact'} />
      <div className='contact-wrapper'>
        <div className='contact-reel'>
          {contactData.slice(0, 3).map((item) => (
            <div className='postItem' key={item.id}>
              <ContactReel item={item} />
            </div>
          ))}
        </div>
        <div className='contact-post'>
          <div className='find-post'>
            <div className='input-contact'>
              <label htmlFor='input-find-category' className='find-loop'>
                <FaMagnifyingGlass size={24} />
              </label>
              <input id='input-find-category' className='input-find-category'></input>
            </div>
            <div className='contact-category'>
              <p className='xl-text'>Categories</p>
              <div className='list-category'>
                <div className='each-category'>
                  {groupProduct.map((category) => (
                    <div key={category}>{category}</div>
                  ))}
                </div>
                <div className='category-quantity'>
                  {groupProduct.map((category) => (
                    <div key={category}>{category.length}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='recent-post'>
            <p className='xl-text'>Recent Posts</p>
            <div className='list-mini-post'>
              {contactData.slice(3).map((item) => (
                <MoreReel key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
