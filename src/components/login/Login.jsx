import './login.css'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import upload from '../../lib/upload'


const Login = () => {

  const [avatar, setAvatar] = useState({
    file: null,
    url: '',
  })

    const [loading,setLoading]=useState(false)

  const handleAvatar = e => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })

    }
  }

    const handleLogin=async (e)=>{
        e.preventDefault()
        setLoading(true);

        const formData=new FormData(e.target);
          const {email,password}=Object.fromEntries(formData);
        try{
          
            await signInWithEmailAndPassword(auth,email,password)
        }
        catch(err){
          console.log(err)
          toast.error(err.message)
        }
        finally{
          setLoading(false)
        }

    }

    const handleRegister= async (e)=>{
      // to prevent reloading of page on submitting form
      e.preventDefault() 
      setLoading(true)
      const formData=new FormData(e.target);
      const {username,email,password}=Object.fromEntries(formData);
      console.log(username,email,password)

      try{
            // authentication of user is done and user is created successfully
          const res=await createUserWithEmailAndPassword(auth,email,password) 

          // image of the user who is registering is uploaded below
          const imgUrl=await upload(avatar.file)

          // data of logined user such as username,email,id,password is stored in the database
          await setDoc(doc(db, "users", res.user.uid), {
            username,
            email,
            avatar:imgUrl,       // image url returned from above , will be stored in db
            id:res.user.uid,      // unique user id is stored in db to create unique user 
            password,
            blocked:[],           // incase we want to block/unblock user 
          });


          // all the chats of the particular user with unique user id is stored in database
          await setDoc(doc(db, "userchats", res.user.uid), {
            chats: [],
          });


          // this message will pop as notification when a user is successfully created
          toast.success("Account created successfully! You can login now!",{autoClose:3000})
      }
      catch(err){

        // if any error occurs during creation of user then this catch block is executed and the corresponding error will  pop as notification
        console.log(err)
        toast.error(err.message)
      } finally{
        setLoading(false)
      }

  }

  return (

    <div className='login'>
      <div className='item'>
        <h2>Welcome back,</h2>
        {/* Login section  of user Authentication is below  */}
        <form onSubmit={handleLogin}>
          <input type='text' placeholder='Email' name='email' />
          <input type='password' placeholder='Password' name='password' />
          <button disabled={loading}>{loading ? "Loading..":"Sign In"}</button>
        </form>
      </div>
      <div className='seperator'></div>
      <div className='item'>
        {/* Register User   */}
        <h2>Create an account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor='file'>
            <img src={avatar.url||"./avatar.png"} alt=''/>
            Upload an image</label>
          <input type='file' id='file' style={{ display: "none" }} onChange={handleAvatar} />
          <input type='text' placeholder='Username' name='username' />
          <input type='text' placeholder='Email' name='email' />
          <input type='password' placeholder='Password' name='password' />
          <button disabled={loading}>{loading ? "Loading..":"Sign Up"}</button>
        </form>
      </div>
    </div>
  )
}

export default Login
