import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>

      <div className="footerBrand">
        <img src="cloudNotesIcon.png" width="60" height="40" className="d-inline-block align-top" alt="Cloudnotes"/>
        <span className='footerTitle'>Cloudnotes</span>
        <span className="copyright">
          Copyright &#169; 2022 Cloudnotes
        </span>
      </div>

      <div className="contactIcons">
        <a href="https://github.com/bilalyusuf973">
          <i className="contactIcon fa-brands fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/bilal-yusuf-8a72a31b8/">
          <i className="contactIcon fa-brands fa-linkedin"></i>
        </a>
        <a href="https://www.instagram.com/bilalyusuf973/">
          <i className="contactIcon fa-brands fa-instagram"></i>
        </a>
        <a href="https://twitter.com/bilalyusuf973">
          <i className="contactIcon fa-brands fa-twitter"></i>
        </a>
      </div>
      
    </div>
  )
}

export default Footer
