import { useEffect, useState } from 'react'

function AddUserComp({AddNewUser,addUserClickedFunc}) {
  const [name,setName]= useState('')
  const [email,setEmail] = useState('')
  const [cancel,setCancel]= useState(true)

  //close add user page from parent
  useEffect(()=>{
    addUserClickedFunc(cancel)
  },[cancel])

  function sendUserData(){
      let obg={id:'', name: name, username:'', email: email,
                address:{city:'', geo:{},street:'',suite:'',zipcode:''} }
      AddNewUser(obg)
  }
  
  return (
    <div>
      <p>Add New User</p>
      <div className='AddUserComp' >         
          Name: <input onChange={(e)=> setName(e.target.value)} type="text"></input><br/><br/>
          Email: <input onChange={(e)=> setEmail(e.target.value)} type="text"></input><br/>
          <div className='FloatRightbutton' style={{marginTop:'7%'}}>
            <button className='RightButton' onClick={()=>setCancel(false)}>Cancel</button> 
            <button className='RightButton' onClick={sendUserData}>Add</button>
          </div>
      </div>
    </div>
  )
}

export default AddUserComp
