
import Menu from '../components/Menu'
import Profile from '../components/Profile'
import Navbar from '../components/Navbar'
import Loader from '../components/loading/Loader'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/useAuth'


// const key = localStorage.getItem('restaurant');
// const value = JSON.parse(key);
// console.log(value)

const Dashboard = () => {

    const { restaurant } = useAuth();

    


 

    const [activeComponent, setActiveComponent] = useState("menu");

  return (
    <div className='antialiased bg-gradient-to-br from-green-200 to-white min-h-screen'>
        <Navbar setActiveComponent={setActiveComponent}/>
        <div className='flex justify-center'>
            {activeComponent === "menu" && <Menu />}
            {activeComponent === "profile" && <Profile restaurant={restaurant} />}
        </div>
        
        
    
    </div>
  )
}

export default Dashboard
