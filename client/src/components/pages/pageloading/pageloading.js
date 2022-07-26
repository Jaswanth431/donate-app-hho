import React from 'react'
import MAIN from '../../utilities/main'
import {ReactComponent as LOADINGRING } from '../../../resources/whiteloadingspinner.svg'
import './pageloading.css'

const PAGELOADING = () => {
  return (
    <MAIN>
            <div className="pageloading-box">
                    <LOADINGRING/>
            </div>
       
    </MAIN>
    
  )
}

export default PAGELOADING