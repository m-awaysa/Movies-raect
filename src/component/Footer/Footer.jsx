import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
function Footer({translate}) {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer__content row">
                <div className='col-4'>
                  <Link href="https://movie4u.watchindex.html" className="footer__logo pt-2">
                  <img style={{ display: 'block', WebkitUserSelect: 'none', margin: 'auto', backgroundColor: '#2b2b31', transition: 'background-color 300ms' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Movies%21_logo.svg/128px-Movies%21_logo.svg.png" />
                  </Link>
                  <span className="footer__copyright">© 2020 Movie<br />Mohammed Awaysa</span>

                </div>

                <ul className='d-flex ms-auto flex-wrap w-50 '>
                  <li className='m-2 '><Link  className='footer_link' to='/'>{translate('home')}</Link></li>
                  <li className='m-2'> <Link  className='footer_link' to='/about'>{translate('about')}</Link></li>
                  <li className='m-2'> <Link className='footer_link'>{translate('privacy')}</Link></li>
                  <li className='m-2'> <Link className='footer_link'>{translate('information')}</Link></li>
                </ul>

              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer