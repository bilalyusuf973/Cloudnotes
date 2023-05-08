import React from 'react';
import Navbar from './Navbar'

const About = (props) => {
  return (
    <>
      <Navbar setNote={props.setNote} showAlert={props.showAlert}/>
      <div className="container my-5">
        <h1 className="about my-4">About</h1>
        <ul>
          <li>
            Cloudnotes is a web app made by using latest technologies like - React, NodeJS, ExpressJS and MongoDB.
          </li>
          <li>
            This app is made for keeping important notes of a user on cloud storage so that they can be accessed from anywhere in the world.
          </li> 
          <li>
            The user can also perform CRUD (Create, Read, Update, Delete) operations in the app.
          </li> 
          <li>
            All the essentail features like authorization, authentication and interactive UI were taken into account.
          </li>
        </ul>

        <h2 className="my-4">
          Contact us --
        </h2>
        <ul>
          <li>
            Email ID - bilalyusuf973@gmail.com
          </li>
          <li>
            LinkedIn - <a href="https://www.linkedin.com/in/bilal-yusuf-8a72a31b8/">linkedin.com/in/bilal-yusuf-8a72a31b8/</a>
          </li>
          <li>
            Github - <a href="https://github.com/bilalyusuf973">github.com/bilalyusuf973</a>
          </li>
          <li>
            Instagram - <a href="https://www.instagram.com/bilalyusuf973/">instagram.com/bilalyusuf973/</a>
          </li>
          <li>
            Twitter - <a href="https://twitter.com/bilalyusuf973">twitter.com/bilalyusuf973</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default About
