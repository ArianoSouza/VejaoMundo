"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../../../styles/country.css'

function Coutry({params: {id}}){

    const [country, setCountry] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`);
                setCountry(response.data);
            } catch (err) {
                setError(err);
            }
        };

        fetchCountries();
    },[]);

    return(
        <div>
            {country.map((c)=> 
            <div className='container-border'>
                <div className='container-all'>
                    <img src={c.flags.svg} alt={`Bandeira de ${c.name.common}`} />
                    <h1>{c.name.common}</h1>
                    <div className='container-info'>
                        <div className='info'>
                            <h1>Nome oficial:</h1> 
                            <p>{c.name.official}</p>
                        </div>
                        <div className='info'>
                            <h1>Capital:</h1> 
                            <p>{c.capital ? c.capital[0] : 'N/A'}</p>
                        </div>
                        <div className='info'>
                            <h1>Região:</h1> 
                            <p>{c.region}</p>
                        </div>
                        <div className='info'>
                            <h1>Sub-região:</h1> 
                            <p>{c.subregion ? c.subregion : "Não possui"}</p>
                        </div>
                        <div className='info'>
                            <h1>População:</h1> 
                            <p>{c.population.toLocaleString()}</p>
                        </div>
                        <div className='info'>
                            <h1>Área:</h1> 
                            <p>{c.area.toLocaleString()} km²</p>
                        </div>
                        <div className='info'>
                            <h1>Idiomas falados:</h1> 
                            <p>{Object.values(c.languages)}</p>
                        </div>
                        <div className='info'>
                            <h1>Moedas:</h1> 
                            <p>{c.currencies ? Object.values(c.currencies).map(currency => `${currency.name} (${currency.symbol})`): "Não possui"}</p>
                        </div>
                        <div className='info'>
                            <h1>Fuso horário:</h1> 
                            <p>{c.timezones ? c.timezones.map((t)=> (`${t} || `)) : "Não possui"}</p>
                        </div>
                        <div className='info'>
                            <h1>Domínio de internet (TLD):</h1> 
                            <p>{c.tld ? c.tld : "Não possui"}</p>
                        </div>
                        <div className='info'>
                            <h1>Código de discagem internacional:</h1> 
                            <p>{c.callingCodes ? c.callingCodes : 'Não possui'}</p>
                        </div>
                        <a href={`/`} className='back-button' >Home</a>
                    </div>
                </div>
            </div>
                    
            )
        }
        </div>
    )
}

export default Coutry