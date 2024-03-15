"use client";
import * as React from "react";
import "./Login.css";
import { useState,useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Login: React.FunctionComponent = (props) => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name, password: password }),
      });
      
      if ( res.ok) {
        const users =await res.clone().json()
        const id = users.user._id
         localStorage.setItem("userId", JSON.stringify(id));
         router.push('/userlist')
         
      }
      // console.log(await res.clone().json())
      return await res.json()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login_login">
      <div className="center">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span></span>
            <label>Password</label>
          </div>
          <button type="submit" className="btn_login">Login</button>
          {/* <div className="pass">Forgot Password?</div> */}
          {/* <input type="submit" value="Login" className="button_login"/> */}

          <div className="signup_link">
            Not registered? <Link href="/register">Signup</Link>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Login;
