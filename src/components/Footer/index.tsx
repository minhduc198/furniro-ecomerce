export default function Footer() {
  return (
    <footer className='container footer'>
      <div className='footer-wrapper'>
        <div className='footer-address'>
          <div className='footer-logo font-700'>Funiro.</div>
          <div className='footer-title'>
            #400 University Drive Suite 200 Coral Gables, <br /> FL 33134 USA
          </div>
        </div>
        <div className='footer-inform'>
          <div className='footer-content'>
            <div className='inform-links'>
              <div className='links-title font-500'>Links</div>
              <div className='links-content'>
                <p className='font-500'>Home</p>
                <p className='font-500'>Shop</p>
                <p className='font-500'>About</p>
                <p className='font-500'>Contact</p>
              </div>
            </div>
            <div className='inform-help'>
              <div className='links-title font-500'>Help</div>
              <div className='links-content'>
                <p className='font-500'>Payment Options</p>
                <p className='font-500'>Returns</p>
                <p className='font-500'>Privacy Policies</p>
              </div>
            </div>
          </div>
          <div className='inform-newsletter'>
            <div className='links-title font-500'>Newsletter</div>
            <div className='input'>
              <div className='input-form'>
                <input type='text' placeholder='Enter Your Email Address' />
                <p>SUBSCRIBE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
