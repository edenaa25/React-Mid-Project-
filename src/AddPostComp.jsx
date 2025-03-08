import { useEffect, useState } from 'react'

export default function AddPostComp({userId, cancelIsClicked, AddPosts}) {

const [newTitel,setNewTitel]= useState('')
const [newBody, setNewBody]=useState('')

function AddNewPost(){
  if(newTitel && newBody) {
    const obj={userId: userId, id:'', title: newTitel, body: newBody}
    AddPosts(obj)
  }
  else{
    console.log("titel and body is empty")
  }

}

return (
    <div > New Post- User {userId}  
        <div className='AddTodoAndPost'>
        Titel: <input onChange={(e)=> setNewTitel(e.target.value)}></input>  <br/>
        Body: <input type='text' onChange={(e)=> setNewBody(e.target.value)}></input>
        <div className='FloatRightbutton'>
            <button className='RightButton' onClick={()=>cancelIsClicked()}>Cancel</button> &nbsp;
            <button className='RightButton' onClick={AddNewPost}>Add</button> </div>
        </div>
    </div>
  )
}
