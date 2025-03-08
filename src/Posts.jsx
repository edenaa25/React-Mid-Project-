import { useEffect, useState } from 'react'
import AddPostComp from './AddPostComp'

export default function Posts({userId, posts, AddPosts}) {
const [addPostClicked, setAddPostClick]=useState(false)

function cancelIsClicked(){
  setAddPostClick(false)
}

return (
    <div> {addPostClicked? 

            <AddPostComp userId={userId} cancelIsClicked={cancelIsClicked} AddPosts={AddPosts} />
            :

            (<><div className='FlowCotainer'>Posts- User {userId} <button className='FloatRightbutton RightButton' onClick={()=>setAddPostClick(true)}>ADD</button></div>
              <div style={{border : posts.length? '2px solid' : null}}>         
              {posts?.map((post)=>{
                  return <div className='TodoAndPostBorder' key={post.id} >
                    Titel: {post.title} <br />
                    Body: {post.body}
                  </div>
                })  } 
                </div> 
            </> ) 
     
            
          }
    </div>
  )
}

    