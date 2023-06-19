import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const CreateRecipe = () => {
    const[company, setCompany] = useState("")
    const[title, setTitle] = useState("")
    const[status, setStatus] = useState("Pending")
   const navigate = useNavigate();
const onSubmit = async (event) => {
        event.preventDefault();
    axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
    try {
            await axios.post("http://localhost:5000/api/v1/jobs/",{"company": company,"position":title, "status": status})
            alert("Job Created")
        }catch (err){
            console.log(err)
        }
}

    return (
        <div className={'create-recipe'}>
            <form onSubmit={onSubmit}>
                <h2>Create Job </h2>
                <div className={"form-group"}>
                    <label htmlFor={"name"} > Company Name: </label>
                    <input
                        type={"text"}
                        id={"name"}
                        onChange={(event) => {
                            setCompany(event.target.value)
                        }
                        }
                        />
                </div>

                <div className={"form-group"}>
                    <label htmlFor={"description"} > Job Title: </label>
                    <textarea name={"description"}
                           id={"description"}
                              onChange={(event) => {
                                  setTitle(event.target.value)
                              }}
                    />
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"description"} > Status: </label>
                    <select name={"Status"} id={"status"} defaultValue={"pending"} onChange={(event) => {
                        setStatus(event.target.value)
                    }}>
                        <option value="pending">Pending</option>
                        <option value="interview">Interview stage</option>
                        <option value="declined"> declined</option>
                    </select>

                </div>

                <button type={'submit'}> Add Job </button>
            </form>

        </div>

    )
}

