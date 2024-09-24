"use client"

import style from '../styles/home.css'
import Image from 'next/image'
function Logo(){

    return(
        <div style={{width:'100%'}}>
            <div className='logo-container'>
                <h1>vejaomundo.com</h1>
                <p>Busque o pais que deseja e veja suas principais informações!</p>
            </div>
        </div>
        
    )
}

export default Logo