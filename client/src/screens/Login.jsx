import React, { useState } from 'react';

const Login = ({ handleLogin,loading }) => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(form);
    // console.log("Logging in with:", form);
  };

  return (
    <div className="flex flex-col h-full gap-[33px] justify-start ">
      <div className="flex flex-col gap-[14px]">

      <div className='text-primary text-[1.75rem] font-medium leading-9 h-[69px] w-[188px] mt-5'>Signin to your PopX account</div>
      <div className="content text-primary opacity-60 text-[18px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</div>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-[23px] h-[max-content] relative'>
        <div className='relative text-[13px]' >
          <input className='border border-[#CBCBCB] rounded-[6px] w-full h-[40px] pl-[17.22px] ' name="email" onChange={handleChange} placeholder='Enter email address' required type="email" />
          <p className='absolute -top-1/2 translate-y-1/2 left-[9px] pl-[5px] w-[96px] h-[17px] bg-[#F7F8F9] text-[#6C25FF]'>Email address</p>
        </div>
        <div className='relative text-[13px]' >
          <input className='border border-[#CBCBCB] rounded-[6px] w-full h-[40px] pl-[17.22px] ' name="password" onChange={handleChange} placeholder='Enter password' required type="password" minLength={8} />
          <p className='absolute -top-1/2 translate-y-1/2 left-[9px] pl-[5px] w-[96px] h-[17px] bg-[#F7F8F9] text-[#6C25FF]'>Password</p>
        </div>
        <button  className='w-full bg-[#6C25FF] hover:bg-[#CBCBCB] h-[46px] rounded-[6px] text-white font-medium cursor-pointer' type="submit">
          {loading ? "Logging you in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
