import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useCookies} from 'react-cookie'
export const Auth = () => {
    return (
        <div className={"auth"}>
            <Login />
            <Register />
        </div>
    )
}

const Register = () => {
    const[username, setuserName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const onSubmit = async (event) => {
      event.preventDefault();  //prevent the page from refreshing prior to submitting

        try{
            await axios.post("http://localhost:5000/api/v1/auth/register",
                {"name": username,"email":email,"password":password});
            alert("Registration complete")
        }catch (err){
console.error(err)
        }

    }

    return(  <div className={'auth-container'}>
            <form onSubmit={onSubmit}>
                <h2>Register </h2>
                <div className={"form-group"}>
                    <label htmlFor={"username"} > Name: </label>
                    <input
                        type={""}
                        id={"username"}
                        value={username}
                        onChange={(event) => {
                            setuserName(event.target.value)
                        }
                        }/>
                </div>

                <div className={"form-group"}>
                    <label htmlFor={"email"} > email: </label>
                    <input type={"email"}
                           id={"username"}
                           value={email}
                           onChange={(event) => {
                               setEmail(event.target.value)
                           }
                           }/>
                </div>

                <div className={"form-group"}>
                    <label htmlFor={"password"} > Password: </label>
                    <input
                        type={"password"}
                        id={"password"}
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }
                        }/>
                </div>
                <button type={'submit'}> Register </button>
            </form>
            `<p className={'notMember'}> Not a member? <button className={'signUp'}> <Link to={"/auth"} className={'signUp'}> Login </Link> </button> </p> `


        </div>


    )
}

const Login = () => {

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const [_,setCookies] = useCookies(["access_token"])
    const Navigate =   useNavigate();
    const onSubmit = async (event) => {
        event.preventDefault();  //prevent the page from refreshing prior to submitting

        try{
          const response=  await axios.post("http://localhost:5000/api/v1/auth/login",
                {"email":email,"password":password});
            setCookies("access_token",response.data.token)  // set cookies
            window.localStorage.setItem("userID",response.data.user.id)
            window.localStorage.setItem("token",response.data.token)
        //redirect them to the home page for now
          Navigate("/")
        }catch (err){
            console.error(err)
        }

    }
    return(  <div className={'auth-container'}>
            <form onSubmit={onSubmit}>
                <h2>Login </h2>


                <div className={"form-group"}>
                    <label htmlFor={"email"} > email: </label>
                    <input type={"email"}
                           id={"username"}
                           value={email}
                           onChange={(event) => {
                               setEmail(event.target.value)
                           }
                           }/>
                </div>

                <div className={"form-group"}>
                    <label htmlFor={"password"} > Password: </label>
                    <input
                        type={"password"}
                        id={"password"}
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }
                        }/>
                </div>
                <button type={'submit'}> Login </button>
            </form>
            `<p className={'notMember'}> Not a member? <button className={'signUp'}> <Link to={"/auth"} className={'signUp'}> Login </Link> </button> </p> `


        </div>


    )
}


const Form = ({userName,setUserName,email,setEmail,password,setPassword,label, onSubmit}) =>{

//passing them as props
    return (
        <div className={'auth-container'}>
            <form onSubmit={onSubmit}>
                <h2> {label}</h2>
                <div className={"form-group"}>
                    <label htmlFor={"username"} > Name: </label>
                    <input
                        type={""}
                        id={"username"}
                        value={userName}
                        onChange={(event) => {
                            setUserName(event.target.value)
                        }
                        }/>
                </div>

                <div className={"form-group"}>
                    <label htmlFor={"email"} > email: </label>
                    <input type={"email"}
                           id={"username"}
                           value={email}
                           onChange={(event) => {
                               setEmail(event.target.value)
                           }
                           }/>
                </div>

                <div className={"form-group"}>
                    <label htmlFor={"password"} > Password: </label>
                    <input
                        type={"password"}
                        id={"password"}
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }
                        }/>
                </div>
                <button type={'submit'}>{label} </button>
            </form>
            `<p className={'notMember'}> Not a member? <button className={'signUp'}> <Link to={"/auth"} className={'signUp'}> {label} </Link> </button> </p> `


        </div>
    )
}

