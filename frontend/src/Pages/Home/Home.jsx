import React from 'react'
import Today from '../../Component/Today/Today';
import "./Home.css"
import Hero from '../../Component/Hero/Hero';


function Home() {
  return (
    <div className="home-section">
          <Hero />
     <div className='t-heading'>
      <h2>Today's Special Deal</h2>
      </div>
      <div className="today-wrapper">
        <div> <Today /></div>
        <div id='offer-image-tod'>
          <img src="https://img.freepik.com/free-photo/online-fashion-shopping-collage_23-2150535821.jpg?w=740&t=st=1702391075~exp=1702391675~hmac=39695ce9e7de830209ea6fc1ad7b9ea989be3f750c70e05a558938567df23dd2" alt="dsf" />
        </div>

      </div>
     
    </div>

  )
}

export default Home