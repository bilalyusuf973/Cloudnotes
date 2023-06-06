import React from 'react';
import Navbar from './Navbar'

const About = (props) => {
  return (
    <>
      <Navbar setNote={props.setNote} showAlert={props.showAlert}/>
      <div className="container my-5">
        <h1 className="about my-4">About us --</h1>
        <ul>
          <li>
          Cloudnotes is a comprehensive solution designed to cater to the needs of developers, offering a seamless experience for code management, collaboration, and CRUD (Create, Read, Update, Delete) operations. Powered by the MERN (MongoDB, Express.js, React.js, Node.js) stack and hosted in the cloud, our app combines the best of modern technologies to provide an efficient and scalable code storage and manipulation platform.
          </li>
          <li>
          With our app, developers can securely store their code snippets in the cloud and perform CRUD operations effortlessly. The app's intuitive user interface allows for easy creation, retrieval, modification, and deletion of code snippets, enabling developers to maintain an organized repository and quickly access the code they need.
          </li> 
          <li>
          The MERN stack serves as a robust foundation for our app's development. MongoDB, a highly flexible and scalable NoSQL database, provides efficient data storage for code snippets. Express.js, a minimalistic web application framework, enables the creation of a reliable backend API to handle CRUD operations. React.js, a powerful JavaScript library, facilitates the development of a responsive and interactive frontend, offering developers a smooth and enjoyable user experience. Node.js, a server-side JavaScript runtime environment, ensures high-performance and efficient handling of server logic.
          </li> 
          <li>
          Security is a top priority for us. We implement robust authentication and authorization mechanisms to ensure that only authorized users can access and manipulate code snippets. All data transmissions and storage are encrypted, providing an additional layer of protection for developers' valuable code.
          </li>
          <li>
          Additionally, our app leverages the scalability and availability advantages of cloud computing. By hosting the app in the cloud, we ensure that developers have seamless access to their code snippets from any device with an internet connection. The app automatically scales resources based on demand, ensuring optimal performance during peak usage periods.
          </li>
          <li>
          In summary, our MERN stack and cloud-based code saving web app revolutionizes code management by providing developers with a secure, collaborative, and scalable solution that encompasses CRUD operations. With its intuitive interface, robust functionality, and emphasis on security, our app empowers developers to efficiently manage their code, collaborate effectively, and perform CRUD operations with ease.
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
