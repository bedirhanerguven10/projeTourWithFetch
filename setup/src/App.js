import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading, setLoading] = useState(true);
  const[tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newtours = tours.filter ((tour) => tour.id !== id)
    setTours(newtours)
  }

  const fetchTours = async () => {

    try{
      const response = await fetch(url)
      const data = await response.json()
      setLoading(false)
      setTours(data)

    } catch (error){
      setLoading(false)
    }
   
  }

  useEffect(()=>{
    fetchTours()

  },[])


  if(loading){
    return <main><Loading/></main>
  }

  if(tours.length === 0){
    return(
      <main>

        <div className="title">
          <h2>No Tours Left</h2>
          <button className='btn' onClick={()=> fetchTours()}>Refresh</button>
        </div>
      </main>
    )
  }

  return <main><Tours tours = {tours} removeTour = {removeTour}/></main>


}

export default App
