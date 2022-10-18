import React from 'react';

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
        Email - bilalyusuf973@gmail.com <br />
        Linked In - <a href="https://www.linkedin.com/in/bilal-yusuf-8a72a31b8/">linkedin.com/in/bilal-yusuf-8a72a31b8/</a><br />
        Github - <a href="https://github.com/bilalyusuf973">github.com/bilalyusuf973</a>
      </p>

    </div>
  )
}

export default About
