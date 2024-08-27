import React, { useState } from 'react'
import {object, string,ref} from 'yup';

export const Register = () => {
    //store the error .............................
    const [error , setError] = useState({
        uName:"",
        passwd:"",
        rePasswd:""
    });
    const [loginError, setLoginError] = useState({
        uName:"",
        passwd:""
    })
    //define schma ........................
    const userSchema = object({
        uName:string().required("the user name is required").matches(/^[A-Za-z]+$/, "Username must only contain letters"),
        passwd:string().required("password is required").min(6,"password must be 6 character"),
        rePasswd:string().oneOf([ref('passwd'),null],"password must match")
    });

    const [user, setUser] = useState({
        uName:"",
        passwd:"",
        rePasswd:""
    })
    const [loginUser, setLoginUser] = useState({
        uName:"",
        passwd:"",
        rePasswd:""
    })
    const [toggle, setToggle] = useState(false)

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]:value
        })   

        setLoginUser({
            ...loginUser,
            [name]:value
        })
    }
    const handleSubmit =async (e) =>{
        e.preventDefault();
        console.log("workign....")
        try{
            //validate the schema>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            await userSchema.validate(user,  {abortEarly:false});
            console.log(user,">>>>>>>>the user")
            setError({})
        }catch (err) {
        const formError = err.inner.reduce((acc, error) =>{
            acc[error.path] = error.message
            return acc;
        },{})
       setError(formError)
        }
    }

    const handleLogin = async(e) =>{
        e.preventDefault();
        console.log("workign...............")
        try{
            await userSchema.validate(loginUser, {abortEarly:false});
            setLoginError({});
        }catch(err){
            const formErrors = err.inner.reduce((acc, error) =>{
                acc[error.path] = error.message
                return acc;
            },{});
            setLoginError(formErrors)
        }
    }

  return (
    <>
       
        {toggle? <form onSubmit={handleLogin}    className='border h-[500px]: w-[20%] flex justify-center items-center flex-col gap-7 mt-7 mb-7 pb-6' >
            <h1 className='text-bold text-xl p-2'>Company name</h1>

             <input name ='uName' onChange={handleChange} className='p-2 border rounded-sm' type="text" value={loginUser.uName} placeholder='username'/>
             {loginError.uName && <div className='text-red-500'>{loginError.uName}</div>}

            <input name='passwd' onChange={handleChange} className='p-2 border rounded-sm' type="password" value={loginUser.passwd} placeholder='password'/>
            {loginError.passwd && <div className='text-red-500'>{loginError.passwd}</div>}

            <button className='p-2 bg-sky-500 text-white w-32' >Login</button>
            <p>not register ? <a className='cursor-pointer' onClick={()=>setToggle(!toggle)}>signUp</a></p>
        </form>: 
        <form  onSubmit={handleSubmit} className='border h-[500px]: w-[20%] flex justify-center items-center flex-col gap-7 mt-7 mb-7 pb-6' >
            <h1 className='text-bold text-xl p-2'>Company name</h1>
            <input  name ='uName' onChange={handleChange}  className='p-2 border rounded-sm' type="text" value={user.uName} placeholder='username'/>
            {error.uName && <div className='text-red-500'>{error.uName}</div>}

            <input  name ='passwd' onChange={handleChange} className='p-2 border rounded-sm' type="password" value={user.passwd} placeholder='password'/>
            {error.passwd && <div className='text-red-500'>{error.passwd}</div>}

            <input  name ='rePasswd' onChange={handleChange} className='p-2 border rounded-sm' type="password" value={user.rePasswd} placeholder='reenter password'/>
            {error.rePasswd && <div className='text-red-500'>{error.rePasswd}</div>}

            <button className='p-2 bg-sky-500 text-white w-32'>signUp</button>
            <p>already register ? <a className='cursor-pointer' onClick={()=>setToggle(!toggle)}>signIn</a></p>
        </form>}
    </>
  )
}
