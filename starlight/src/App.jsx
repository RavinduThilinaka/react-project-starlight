

import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Banner from './components/Bannner/Banner'
import BannerText from './components/Bannner/BannerText'
import Blog from './components/Blog/Blog'
import Footer from './components/Navbar/Footer'
import { UpdateFollower } from 'react-mouse-follower'

export default function App() {
  

  return (
   
      <main className='overflow-x-hidden'>
        <UpdateFollower 
          mouseOptions={{
            backgroundColor:"white",
            zIndex:999,
            followSpeed:1.5
          }}>
          <Navbar/>
          <Hero/>
        </UpdateFollower>

        <UpdateFollower
         mouseOptions={{
          backgroundColor:"black",
          zIndex:999,
          followSpeed:1.5
        }}>
           <Services/>
           <Banner/>
           <BannerText/>
           <Blog/>
           <Footer/>
        </UpdateFollower>
       
       
      </main>
   
  )
}

