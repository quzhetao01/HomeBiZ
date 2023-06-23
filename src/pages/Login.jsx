import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RegisterCSS from "../styles/Register.module.css";
import LoginInput from '../components/LoginInput';
import instance from '../axios.config';
import getUser from '../helper/user';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isNewUser, setIsNewUser] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state)

    useEffect(() => {
      if (location.state) {
        setIsNewUser(location.state.justRegistered);
      } else {

        getUser().then(user => {
          if (user) {
            navigate("/");
          }
        })
      }

    }, [])

    const handleLogin = () => {
        instance.post("/login", {"username": username, "password": password})
            .then(res => {
                console.log(res);
                // user is present
                // if (res.data.user) {
                    navigate("/");
                // } else {
                //     setIsNewUser(false);
                //     setError(res.data.error);
                // }
            })
            .catch(err => {
              if(err.response.status === 401) {
                setIsNewUser(false);
                setError("Wrong username or password");
              };
            });
    }
    
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
    
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

   return <section className="h-100 gradient-form">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100 py-5">
      <div className="col-xl-10">
        <div style={{overflow: "hidden"}} className="card text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">
                {/* header */}
                <div className="text-center">
                  <h4 className="mt-1 mb-5 pb-1">Welcome to HomeBiZ</h4>
                </div>

                <form>
                  <h5>Login here</h5>
                    <LoginInput type="username" value={username} onChange={handleUsername}/>
                    <LoginInput type="password" value={password} onChange={handlePassword}/>

                  <div className="text-center pt-1 mb-3 pb-1 d-grid gap-1">
                    <button onClick={handleLogin} className={`btn btn-primary ${RegisterCSS.loginBtn}`} type="button">
                        Login
                    </button>
                  </div>
                  {isNewUser && <p>Welcome to HomeBiZ! Please login with your newly registered account.</p>}
                  {error !== "" && <p className="text-danger">{`${error}. Please try again.` }</p>}
                  <p>Don't have an account? <span className={RegisterCSS.registerRedirect} onClick={() => navigate("/register")}>Register here</span></p>
                </form>

              </div>
            </div>
            {/* we can modularise this also but im abit lazy now ngl */}
            <div className={`col-lg-6 d-flex align-items-center gradient-custom-2 ${RegisterCSS.right}`}>
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
}

export default Login;