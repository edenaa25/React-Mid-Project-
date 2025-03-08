import { useEffect, useState } from 'react'

export default function OtherDataComp({userAddress , updateOtherData}) {
  const [street,setStreet]= useState(userAddress.street)
  const [city,setCity]=useState(userAddress.city)
  const [zip, setZip]= useState(userAddress.zipcode)
  
  //update parent comp on changes - UserComp
  useEffect(()=>{
    let obj= {...userAddress, street: street, city: city, zipcode: zip}
    updateOtherData(obj)
  },[street,city,zip])
  

  return (
    <div className='otherDataComp'>
      Street: <input onChange={(e)=> setStreet(e.target.value)} type="text" defaultValue={street}></input> <br />
      City: <input onChange={(e)=> setCity(e.target.value)} type="text" defaultValue={city}></input> <br />
      Zip Code: <input onChange={(e)=> setZip(e.target.value)} type="text" defaultValue={zip}></input> <br />
    </div>
  )
}
