import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {

  return (
    <div className="container my-5">
      <h1 className="about my-2">About</h1>
      <ol>

      </ol>
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

      <h5 className="my-4">
        Contact us --
      </h5>
      <p>
        Email ID - bilalyusuf973@gmail.com <br />
        LinkedIn - <Link to="https://www.linkedin.com/in/bilal-yusuf-8a72a31b8/">linkedin.com/in/bilal-yusuf-8a72a31b8/</Link><br />
        Github - <Link to="https://github.com/bilalyusuf973">github.com/bilalyusuf973</Link><br />
        Instagram - <Link to="https://www.instagram.com/bilalyusuf973/">instagram.com/bilalyusuf973/</Link><br />
        Twitter - <Link to="https://twitter.com/bilalyusuf973">twitter.com/bilalyusuf973</Link><br />
      </p>
    </div>
  )
}

export default About
