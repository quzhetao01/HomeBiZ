import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterCSS from "../styles/Register.module.css";
import LoginInput from '../components/LoginInput';
import instance from '../axios.config';
import getUser from '../helper/user';


const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    })

    useEffect(() => {
      getUser().then((user) => {
        
        console.log(user);
        if (user !== "No user found") {
          navigate("/");
        }
      })
    }, [])

    const handleRegister = () => {
        instance.post("/register", userInfo)
            .then(res => {
                console.log(res);
                // user is present
                if (res.data.user) {
                    setError(""); //reset error message jic
                    navigate("/selectInterests", {state: {justRegistered: true, id: res.data.user.id}});
                } else {
                    setError(res.data.error);
                }
            });
    }
    
    const handleUsername = (event) => {
    
        // setUsername(event.target.value);
        setUserInfo(prev => {
          return {
            ...prev, 
            ["username"]: event.target.value
          }
        })
    };
    
    const handlePassword = (event) => {
        // setPassword(event.target.value);
        setUserInfo(prev => {
          return {
            ...prev, 
            ["password"]: event.target.value
          }
        })
    };

    const handleFirstName = (event) => {
        setUserInfo(prev => {
          return {
            ...prev, 
              ["firstName"]: event.target.value
          }
        })
    };

    const handleLastName = (event) => {
        setUserInfo(prev => {
          return {
            ...prev, 
              ["lastName"]: event.target.value
          }
        })
    };

   return <section className="h-100 gradient-form">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100 py-5">
      <div className="col-8">
        <div style={{overflow: "hidden"}} className="card text-black">
          <div className="row justify-content-center g-0">
            <div className="col-10">
              <div className="card-body p-md-5 mx-md-4">
                <div className="text-center">
                  <h4 className="mt-1 mb-5 pb-1">Welcome to HomeBiZ!</h4>
                </div>

                <form>
                  <h5 className="mb-3"></h5>
                    <div className="d-flex mb-2">
                      <div className="form-floating" style={{flex: 2}}>
                        <input className="form-control" value={userInfo.firstName} onChange={handleFirstName}/>
                        <label>First name</label>
                      </div>
                      <div className="form-floating" style={{flex: 1}}>
                        <input className="form-control" value={userInfo.lastName} onChange={handleLastName}/>
                        <label>Last name</label>
                      </div>
                    </div>
                    <LoginInput type="username" value={userInfo.username} onChange={handleUsername}/>
                    <LoginInput type="password" value={userInfo.password} onChange={handlePassword}/>

                  <div className="text-center pt-1 mb-3 pb-1 d-grid gap-1">
                    <button onClick={handleRegister} className={`btn btn-primary ${RegisterCSS.loginBtn}`} type="button">
                        Register
                        </button>
                  </div>
                  {error !== "" && <p className="text-danger">{`${error}. Please try again.` }</p>}

                </form>

              </div>
            </div>
            {/* we can modularise this also but im abit lazy now ngl */}
            {/* <div className={`col-lg-6 d-flex align-items-center gradient-custom-2 ${RegisterCSS.right}`}>
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
}

export default Register;