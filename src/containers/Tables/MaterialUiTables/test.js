import React  from 'react';
import {useSelector} from 'react-redux'

export default function Test () {
    const data = useSelector((state)=> state.searchValue.data)
    
    return(
      <>
      <h1>{data}</h1>
      </>
    )
  }