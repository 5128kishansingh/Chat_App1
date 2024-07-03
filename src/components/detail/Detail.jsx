import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useChatStore } from '../../lib/chatStore'
import { auth, db } from '../../lib/firebase'
import { useUserStore } from '../../lib/userStore'
import './detail.css'
import React from 'react'

const Detail = () => {
  const {chatId, user,isCurrentUserBlocked,isReceiverBlocked,changeBlock}=useChatStore();
  const {currentUser}=useUserStore();

  const handleBlock=async ()=>{

      if(!user)return ;

      const userDocRef=doc(db,"users",currentUser.id)

      try{
          await updateDoc(userDocRef,{
            blocked:isReceiverBlocked?arrayRemove(user.id):arrayUnion(user.id),
          })

          changeBlock()
      }catch(err){
        console.log(err)
      }
  }
  return (
    <div className='detail'>
      <div className='user'>
        <img src={user?.avatar||"./avatar.png"} alt='' />
        <h2>{user?.username}</h2>
        <p>lorem epsum sgo geo...</p>
      </div>
      <div className='info'>
        <div className='option'>
          <div className='title'>
            <span>Chat Settings</span>
            <img src='./arrowUp.png' alt='' />
          </div>
        </div>



        <div className='option'>
          <div className='title'>
            <span>Privacy & help</span>
            <img src='./arrowUp.png' alt='' />
          </div>
        </div>

        <div className='option'>
          <div className='title'>
            <span>Shared Photos</span>
            <img src='./arrowDown.png' alt='' />
          </div>

          <div className='photos'>
            <div className='photoItem'>
              <div className='photoDetail'>
                {/* <img src='https://static.toiimg.com/photo/57330877.cms?imgsize=117846' alt='' /> */}
                <span>photo_2024_2.png</span>
              </div>
              <img src='./download.png' alt='' className='icon'/>
            </div>
            <div className='photoItem'>
              <div className='photoDetail'>
                {/* <img src='https://static.toiimg.com/photo/57330877.cms?imgsize=117846' alt='' /> */}
                <span>photo_2024_2.png</span>
              </div>
              <img src='./download.png' alt='' className='icon'/>
            </div>
            
          </div>
        </div>
        <div className='option'>
          <div className='title'>
            <span>Shared File</span>
            <img src='./arrowUp.png' alt='' />
          </div>
        </div>
        <button onClick={handleBlock}>
          {
            isCurrentUserBlocked?
            "Your are Blocked"
            :isReceiverBlocked
            ?"User Blocked"
            :"Block User"
          }
          </button>
        <button className='logout' onClick={()=>auth.signOut()}>Log Out</button>
      </div>
    </div>
  )
}

export default Detail

