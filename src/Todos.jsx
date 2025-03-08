import { useState } from 'react'
import AddTodoComp from './AddTodo'

export default function Todos({userId, todos, AddTodo, setTodoAsComplete}) {
const [addTodoClicked, setAddTodoClicked]= useState(false)

function addTodoClickedFunction(){
  setAddTodoClicked(false)
}

  return (
    <div > {addTodoClicked ? null : (<div className='FlowCotainer' >Todos- User {userId} <button className='FloatRightbutton RightButton' onClick={()=> setAddTodoClicked(true)}>ADD</button></div>) } 
          {
            addTodoClicked?  

              <AddTodoComp userId={userId} AddTodo={AddTodo} addTodoClickedFunction={addTodoClickedFunction}/>
              : 
            
              (<div style={{border:todos.length? '2px solid' : null}}> {todos?.map((todo)=>{
                return <div key={todo.id} className='TodoAndPostBorder'>
                  Titel: {todo.title} <br />
                  Completed: {todo.completed? 'True': 'False'} <br />
                  {
                    todo.completed? null : <button onClick={()=> setTodoAsComplete(todo.id)} style={{}} className='FloatRightbutton RightButton' >Mark Completed</button> 
                  }
                </div> 
              })} </div> )
          }
    </div>
  )
}
