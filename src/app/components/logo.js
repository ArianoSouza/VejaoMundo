import style from '../styles/home.css'
import Image from 'next/image'

function Logo(){

    return(
        <div >
            <div className='logo-container'>
                <Image src={'/img/6454084-unscreen.gif'} width={50} height={50} style={{width:'20vw', height:'20vw'}} ></Image>
                <h1>vejaomundo.com</h1>
                <p>Busque o pais que deseja e veja suas principais informações!</p>
            </div>
        </div>
        
    )
}

export default Logo