import { useContext } from 'react';
import ellipseImg from '../assets/images/Ellipse.png';
import cameraSvg from "../assets/images/camera.svg"
import { LoginContext } from '../contexts/LoginContext';


const Profile = ({handleLogout}) => {
  const {userdata}=useContext(LoginContext)


  
  return (
    <>
      
        <div className='w-full h-[68px] bg-white absolute top-0 left-0'>
          <p className='text-[18px] pl-[15px] pt-[27px]'>Account Settings</p>
        </div>
        <div className="grid grid-cols-[76px_1fr] grid-rows-2 h-[max-content] pt-[78px] gap-5 justify-start relative">
            <div className="w-[76px] h-[76px] rounded-full bg-amber-300 relative">
              <img src={ellipseImg} alt="" />
              <img src={cameraSvg} alt="" className="absolute bottom-0 right-0" />
            </div>
            <div className="flex flex-col">
              <p className="name font-medium text-[15px]">{userdata.name}</p>
              <p className="email text-[14px]">{userdata.email}</p>
            </div>
            <div className="content capitalize col-span-2 w-fit text-[14px]">
              Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
            </div>
        </div>
        <button  className='w-full mt-[14px] bg-[#6C25FF] hover:bg-[#CBCBCB] h-[46px] rounded-[6px] text-white font-medium cursor-pointer' onClick={handleLogout}>Logout</button>
        
      
    </>
  )
}

export default Profile