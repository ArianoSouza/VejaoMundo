"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

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

    console.log(country)
    return(
        <div>
            {country.map((c)=> 
                <div>
                    <h1>{c.name.common}</h1>
                    <img src={c.flags.svg} alt={`Bandeira de ${c.name.common}`} />
                    <p>Nome oficial: {c.name.official}</p>
                    <p>Capital: {c.capital ? c.capital[0] : 'N/A'}</p>
                    <p>Região: {c.region}</p>
                    <p>Sub-região: {c.subregion}</p>
                    <p>População: {c.population.toLocaleString()}</p>
                    <p>Área: {c.area.toLocaleString()} km²</p>
                    <p>Idiomas falados: {Object.values(c.languages)}</p>
                    <p>Moedas: {Object.values(c.currencies).map(currency => `${currency.name} (${currency.symbol})`)}</p>
                    <p>Fuso horário: {c.timezones}</p>
                    <p>Domínio de internet (TLD): {c.tld}</p>
                    <p>Código de discagem internacional: {c.callingCodes}</p>
                </div>
                    
            )
        }
        </div>
    )
}

export default Coutry