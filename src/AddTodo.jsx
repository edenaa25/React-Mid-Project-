import { useState } from 'react'

export default function AddTodoComp({userId,AddTodo, addTodoClickedFunction}) {
const [newToDo,setNewToDo]= useState('')

function AddnewTodo(){ 
  if(newToDo){
    let obj= {userId: userId ,id: '', title: newToDo , completed: false }
    AddTodo(obj)
  }
 else{console.log('titel is empty')}
}

  return (
    <div > New Todo- User {userId}         
      <div className='AddTodoAndPost'><div> Titel: <input onChange={(e)=> setNewToDo(e.target.value)}></input></div>  <br/>      
        <div className='FloatRightbutton'>
              <button className='RightButton' onClick={()=> addTodoClickedFunction()}>Cancel</button>
              &nbsp; <button className='RightButton' onClick={AddnewTodo}>Add</button>
        </div>
      </div> 
           
    </div>
  )
}
