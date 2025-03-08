import { useEffect, useState } from 'react'
import OtherDataComp from './OtherDataComp'

export default function UserComp({showUserTodosAndPosts, userData,updateData,DeleteUser, todos}) {
  const [uncompelted, setUncompleted] =useState(true)
  const [otherDataShow, setOtherDataShow]= useState(false)
  const [name,setName]=useState(userData.name)
  const [email,setEmail]= useState(userData.email)
  const [otherData,setOtherData]=useState(userData.address)  

  //check if all todos is complete 
  useEffect(()=>{
    let notcompleted= todos.find((todo)=> todo.completed===false)
    if(notcompleted){
      setUncompleted(false)
    }
    else{
      setUncompleted(true)
    }
  },[todos])

  const UpdateUserData = ()=>{
    let obj={id : userData.id ,name : name, email : email, address : otherData}
    
    updateData(obj)
  }

  //save changes from chiled OtherDataComp
  function updateOtherData(obj){
    setOtherData(obj)
  }

  //open posts and todos from parent- App comp
  function IdIsClicked(){
    showUserTodosAndPosts(userData.id)
  }

  return (
    <>
    <div className='userComp' style={{border: '1px solid', borderColor: uncompelted? 'green': 'red'}}>
        <label onClick={()=> IdIsClicked()} >ID:</label>  {userData.id} <br />
        Name: <input type="text" onChange={(e)=> setName(e.target.value)} defaultValue={userData.name}></input>  <br /> 
        Email: <input type="text" onChange={(e)=> setEmail(e.target.value)} defaultValue={userData.email}></input>  <br /><br />
        <button className='otherDataButton' onClick={()=> setOtherDataShow(false)} onMouseOver={()=> setOtherDataShow(true)}>Other Data</button>
        {
          otherDataShow? <OtherDataComp  updateOtherData={updateOtherData} userAddress={userData.address}  /> : null
        }
        <div className='FloatRightbutton'>
          <button className='RightButton' onClick={UpdateUserData}>Update</button>
          <button className='RightButton' onClick={()=> DeleteUser(userData)}>Delete</button>
        </div>
    </div>  
    
    </>
  )
}
