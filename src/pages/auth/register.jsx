import React, { useState } from 'react'
import logo from "../../assets/logo.jpg";
import { IoIosEye , IoIosEyeOff} from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import user_img from "../../assets/User_img.png";
import { useDispatch } from 'react-redux';
// import { registerUser } from '@/store/auth-slice';
// import GoogleLoginButton from '@/components/common/googleBtn';
import { toast } from "react-toastify"; 
import { signupUser } from '../../api/authapi';

const initialState = {
  tenant_id: 1,
  name: "",
  email: "",
  password: "",
  role: ""
};


const Register = () => {

  const [openEye,setOpenEye] = useState(false);
  const [formData,setFormData] = useState(initialState);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidUsername = (name) => /^[a-zA-Z0-9_]{3,}$/.test(name);
  const isValidPassword = (password) => password.length >= 6;

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.role) {
            return "All fields are required.";
        }

        if (!isValidUsername(formData.name)) {
            return "Name must be at least 3 characters and contain only letters, numbers, or underscores.";
        }

        if (!isValidEmail(formData.email)) {
            return "Invalid email format.";
        }

        if (!isValidPassword(formData.password)) {
            return "Password must be at least 6 characters.";
        }

        return "";
    };

//   const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();

    if (error) {
        setAlertMessage(error);
        return;
    }

    setAlertMessage("");

    console.log("Form Submitted:", formData);

    try {
        const res = await signupUser(formData);
        toast.success("Registration successful!");
    }catch(error) {
        toast.error("Registration failed!");
    }

//     dispatch(registerUser(formData))
//   .unwrap()
//   .then((data) => {
//     toast.success("Registration Successful", { theme: "dark" });
//     navigate("/main/home");
//   })
//   .catch((err) => {
//     toast.error(err.message || "User already exists", { theme: "dark" });
//   });
  }

  return (
    <div className='mx-auto lg:w-[60%] md:w-[50%] sm:w-[60%] w-[100%] max-w-md space-y-6 text-center flex flex-col items-center justify-center font-poppins overflow-y-scroll scrollbar-hide mb-10'>
      
      <div className='flex flex-col items-center justify-center'>
        <img src={logo} alt="Root-Ed" className='lg:[60%] md:[50%] sm:[40%] w-[30%]'/>
      </div>
      
      <div className='flex flex-col items-center justify-center gap-2'>
        <h2 className='text-sm text-black mt-3'>Join over  <span className='text-[#40B47C] font-bold ml-1 mr-1'>2M</span> global social users</h2>
        <img src={user_img} alt="Motren-connect" className='w-[4rem]'/>
      </div>

      <div className='flex flex-col items-center justify-center gap-3'>
        <h2 className='font-medium lg:text-[1.2rem] md:text-[1rem] sm:text-[1rem] text-[1rem] text-[#626262]'>SignUp Account</h2>
        <div className='flex items-center justify-center gap-2'>
          <p className='font-medium lg:text-[1rem] md:text-[.8rem] sm:text-[.8rem] text-[.8rem]'>Already have an aacount ?</p>
          <p className='font-medium lg:text-[1rem] md:text-[.8rem] sm:text-[.8rem] text-[.8rem] text-[#40B47C] cursor-pointer' onClick={()=>navigate("/auth/login")}>Link to your account</p>
        </div>
      </div>
      <div className='bg-white/100 rounded-2xl p-6 w-[90%] max-w-md flex flex-col items-center justify-center border border-[#ccc]'>
          <div>
          <div className='flex flex-col items-center justify-center gap-3 mt-5 w-full'>
              <input 
                  type="text" 
                  className='bg-[#f4f3f3] lg:w-[80%] md:w-[90%] sm:w-[95%] w-[100%] lg:p-3 md:p-3 sm:p-3 p-3 rounded-[.5rem] outline-none border-none font-poppins font-light lg:text-[1rem] md:text-[1rem] sm:text-[1rem] text-[.8rem]' 
                  placeholder='Name' 
                  name="name"
                  value={formData.name} 
                  onChange={handleChange}/>

              <input 
                  type="text" 
                  className='bg-[#f4f3f3] lg:w-[80%] md:w-[90%] sm:w-[95%] w-[100%] lg:p-3 md:p-3 sm:p-3 p-3 rounded-[.5rem] outline-none border-none font-poppins font-light lg:text-[1rem] md:text-[1rem] sm:text-[1rem] text-[.8rem]' 
                  placeholder='Email' 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}/>

              <div className='relative w-full'>
                <input 
                  type={openEye ? "text" : "password"} 
                  name="password"
                  className='bg-[#f4f3f3] lg:w-[80%] md:w-[90%] sm:w-[95%] w-[100%] lg:p-3 md:p-3 sm:p-3 p-3 rounded-[.5rem] outline-none border-none font-poppins font-light lg:text-[1rem] md:text-[1rem] sm:text-[1rem] text-[.8rem]' 
                  placeholder='password'
                  value={formData.password} 
                  onChange={handleChange}/>

                <div className='absolute top-4 lg:right-12 md:right-12 sm:right-11 right-5 text-gray-400'>{openEye ? <span onClick={()=>setOpenEye(false)}><IoIosEye /></span> : <span onClick={()=>{setOpenEye(true)}}><IoIosEyeOff /></span>}</div>
              </div>

               <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className='bg-[#f4f3f3] lg:w-[80%] md:w-[90%] sm:w-[95%] w-[100%] lg:p-3 md:p-3 sm:p-3 p-3 rounded-[.5rem] outline-none border-none font-poppins font-light lg:text-[1rem] md:text-[1rem] sm:text-[1rem] text-[.8rem]'
                >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
            </select>

              {alertMessage && (
                <div className='text-red-400 w-[90%]font-poppins text-sm'>
                  {alertMessage}
                </div>
              )}

           
              <div className='lg:w-[100%] md:w-[95%] sm:[100%] w-[130%] mt-3 flex flex-col items-center justify-center gap-2'>
                <button className='bg-[#40B47C] lg:p-[.6rem] ms:p-[.5rem] sm:p-[.5rem] p-[.5rem] rounded-[.5rem] lg:w-[80%] md:w-[85%] sm:[80%] w-[70%] lg:text-[1rem] md:text-[1rem] sm:text-[1rem] text-[1rem] text-white cursor-pointer' onClick={(e)=>{handleSubmit(e)}}>Sign Up</button>
                
              </div>
              
              <h2 className='text-gray-400 text-sm '>Already have an account? <Link className='text-[#40B47C]' to="/auth/login">Sign In</Link>. connect now!</h2>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Register;