import React from 'react'
import { Oval} from 'react-loader-spinner'

const Loader = () => {
  localStorage.setItem('hello', "hi sexy lady");

  return (
    <div>
    <Oval
    height = "60"
    width = "60"
    radius = "10"
    color = 'cyan'
    ariaLabel = 'pink'     
    wrapperStyle
    wrapperClass
  />
    </div>
  )
}

export default Loader
