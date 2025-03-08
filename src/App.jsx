import { useEffect, useState } from 'react'
import UserComp from './UserComp'
import axios from 'axios'
import Todos from './Todos'
import AddUserComp from './AddUserComp'
import Posts from './Posts'
import './stylesheet.css'

function App() {
  const [posts, setPosts]= useState([])
  const [todos, setTodos]= useState([])
  const [users, setUsers]= useState([])
  const [usersSearch, setUsersSearch]= useState([])
  const [addUserClicked,setAddUserClicked]= useState(false)
  const [showTodosAndPosts , setShowTodosAndPosts] = useState(false)
  const [saveUserIdClicked,setSaveUserIdClicked]=useState('')
  const [userPosts,setUserPosts]=useState([])
  const [userTodos,setUserTodos]= useState([])

  useEffect(()=>{
    console.log('get data effect')
      async function getData(){
        let users= await axios.get(`https://jsonplaceholder.typicode.com/users`)
        let posts = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
        let todos = await axios.get(`https://jsonplaceholder.typicode.com/todos`)

        setUsersSearch(users.data)
        setPosts(posts.data)
        setTodos(todos.data)
        setUsers(users.data)
      }
      getData()
  },[])

  useEffect(()=>{ // Update the Copy Of Users for searching every time users is chainging
    setUsersSearch(users)
  },[users])


  const searchFunc= (e)=>{ // show users by search withput chnaging the real state of users 
    let val= e.target.value
    setUsersSearch(users.filter((user)=> (user.name.includes(val) || user.email.includes(val))))
           
  }

  // Update User Data
  function UpdateData(newData){ 
      let index= users.findIndex(user=> user.id===newData.id)
      let updatedUser= [...users]
      updatedUser[index].name=newData.name
      updatedUser[index].email=newData.email
      updatedUser[index].address=newData.address
     
      setUsers(updatedUser)
  }

  function DeleteUser(obj){
      let usersAfterDel= users.filter(user => user.id !== obj.id)
      let todosAfterDel= todos.filter(todo => todo.userId !== obj.id)
      let postsAfterDel= posts.filter(post => post.userId !== obj.id)

      setUsers(usersAfterDel)   
      setTodos(todosAfterDel)  
      setPosts(postsAfterDel)
      if(obj.id===saveUserIdClicked){
        setShowTodosAndPosts(false)
      }
  }

  function AddTodo(obj){
    let newId
    if(todos.length>0){
      newId= Number(todos[todos.length-1].id) + 1 
    }
    else{
      newId= 1;
    }
      obj.id= newId
      setTodos([...todos, obj])
  }

  function AddPosts(obj){
    // console.log("new post added")
    let newId
    if(posts.length>0){
      newId= Number(posts[posts.length-1].id) + 1 
    }
    else{
      newId= 1;
    }
    obj.id= newId
    setPosts([...posts, obj])

  }

  function AddNewUser(newUser){
    let id;
    if(users.length>0){
       id= Number(users[users.length-1].id) + 1 
    }
    else{
       id= 1;
    }
    newUser.id=id
    setUsers([...users,newUser])
  }

  //close 'add user' page from AddUserComp
  function addUserClickedFunc(bool){
    setAddUserClicked(bool)
  }

  function setTodoAsComplete(id){
    let index= todos.findIndex(todo => todo.id===id)
    let newToDo= [...todos]
    newToDo[index].completed=true
    setTodos(newToDo)
  }
  
  //show user todos and post after clicking ID on UserComp by send the userId
  function showUserTodosAndPosts(userId){
    setSaveUserIdClicked(userId)
    if(saveUserIdClicked===userId){ //if the same user button is clicked- we want to close the right page
      setShowTodosAndPosts(false)
      setSaveUserIdClicked('')
    }
    //else- we want to filter todos and posts by userId
    else{ 
      setShowTodosAndPosts(true)
      let userTodosFilter= todos.filter(todo => todo.userId===userId)
      let userPostssFilter= posts.filter(post => post.userId===userId)
      setUserTodos(userTodosFilter)
      setUserPosts(userPostssFilter)
    }
  }


//Update user todos&posts lists after add a new todo or post
useEffect(()=>{
  let userTodosFilter= todos.filter(todo => todo.userId===saveUserIdClicked)
  let userPostssFilter= posts.filter(post => post.userId===saveUserIdClicked)
  setUserTodos(userTodosFilter)
  setUserPosts(userPostssFilter)
   
},[todos,posts])

//Toggled between the right page- users&posts or add user
function AddUserIsClicked(){
    setAddUserClicked(true)
    setShowTodosAndPosts(false)
    setSaveUserIdClicked('')
}

//Toggled between the right page- users&posts or add user
useEffect(()=>{
    if(!showTodosAndPosts){
      setUserTodos([])
      setUserPosts([])
    }
    else{
      setAddUserClicked(false)
    }
},[showTodosAndPosts])

  return (
    <div className='FlowCotainer'>
      <div className= {addUserClicked||showTodosAndPosts? 'leftPage floatLeft' :'leftPage'}>
        <div className='leftPageContent'>
          <div className='leftPageHeaderSearch'>Search &nbsp;&nbsp;<input  type="text" onChange={searchFunc}></input> </div> <div style={{width:'20%'}} className='FloatRightbutton'> <button className='RightButton' onClick={()=>AddUserIsClicked()}>Add</button><br /> </div>
          
          {
            usersSearch.map((user)=> <div key={user.id} style={{ backgroundColor:(saveUserIdClicked===user.id)&&showTodosAndPosts? '#FFDAB9' : null }}>
                                      <UserComp showUserTodosAndPosts={showUserTodosAndPosts}  updateData={UpdateData} DeleteUser={DeleteUser} userData={user} todos={todos.filter((todo)=>todo.userId===user.id)} /> </div>)
                              
          }                            
        </div>   
      </div>
     
      <div className='RightPage' >
          {
            showTodosAndPosts? <> <Todos userId={saveUserIdClicked} todos={userTodos} AddTodo={AddTodo} setTodoAsComplete={setTodoAsComplete} /> <br/>
                                  <Posts userId={saveUserIdClicked} posts={userPosts} AddPosts={AddPosts} /> </>
            : null
          }
      </div>
      
      <div className='RightPage'>
          {
            addUserClicked?  <AddUserComp AddNewUser={AddNewUser} addUserClickedFunc={addUserClickedFunc} /> : null
                      
          }
      </div>
    </div>
  )
}

export default App


