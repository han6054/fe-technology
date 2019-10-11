import React, {useState} from 'react'

const Index = () => {
    let [count, setCount] = useState(1)
   return (
       <div>
          <h1>home page {count}</h1>
           <button onClick={()=>setCount(count+1)}>累加</button>
       </div>
   )
}

export default Index