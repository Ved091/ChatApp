'use client'
import * as React from 'react';
import "./Register.css"
import {useState} from "react"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
interface IAppProps {
}

const Register: React.FunctionComponent<IAppProps> = (props) => {
  const router = useRouter()
    const [details, setDetails] = useState({
        username: "",
        email:"",
        password:"",
        confirmPassword: ""
      });
    
    const handleChange = (e:any)=>{
        setDetails({ ...details, [e.target.name]: e.target.value });
    }
    const handleSubmit = async(e:any)=>{
      
      e.preventDefault();
      try {
        if(details.confirmPassword!==details.password){
          return console.log("Password not matching")
        }
        const res = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: details.username,email:details.email, password: details.password }),
        });
        if (res.ok) {
          const users =await res.clone().json()
        const id = users.user._id
         localStorage.setItem("userId", JSON.stringify(id));
          router.push("/userlist");
        }
      } catch (error) {
        console.log(error);
      }
    }
  return(
    <div>
      <div className="container_register">
        <div className="forms-container">
          <div className="signin-signup">
            <div className="flex_register">
              <form
                className="sign-in-form"
                onSubmit={handleSubmit}
              >
                <h2 className="title">Sign Up</h2>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    name='username'
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {/* <Web3Button contractAddress={contractAddress} action={(contract) => handleSignUpClick(contract)} >Sign Up</Web3Button> */}
                <button type='submit' className='p-4 bg-green-500 rounded-xl'>Add Contact</button>
                <div>Already registered? <Link href="/login">Login</Link></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) ;
};

export default Register;
