"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../styles/home.css'

function Paises(){

    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);
    const [filternamecountries, setFilteramecountries] = useState(countries);
    const [changevalue, setChangevalue] = useState('');
    const [changeregion, setChangeregion] = useState('');
    const [subRegion, setSubRegion] = useState('');
    const [Population, setPopulation] = useState(0);
    const [orderType, setOrderType] = useState(0);

    



    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(response.data);
            } catch (err) {
                setError(err);
            }
        };

        fetchCountries();
    },[]);


    const filterRegion = countries.map((self)=>(self.region)).filter((value,index,array)=> array.indexOf(value) === index)
    let FilterSubRegions = countries.filter((value)=>value.region === changeregion).map((value)=>(value.subregion)).filter((value,index,array)=> array.indexOf(value) === index)

    const handleChange = (e) => {setChangevalue(e.target.value)}
    const setRegion = (e) => {setChangeregion(e.target.value)}
    const setSB = (e) => {setSubRegion(e.target.value)}
    const setPop = (e) => {setPopulation(e.target.value)}
    const setOT= (e) => {setOrderType(e.target.value)}
    

    
    
    useEffect(()=>{

        let fil = countries

        if (changevalue) {
            fil = fil.filter(f => f.name.common.toLowerCase().includes( changevalue.toLowerCase() ) )
        }

        if (changeregion){
            fil = fil.filter(f => f.region === changeregion ) 
        }
        else setSubRegion('')

        if (subRegion){
            fil = fil.filter(f => f.subregion === subRegion ) 
        }

        if (Population){
            if (Population == 1){
                fil = fil.filter(f => f.population < 1000 )
            }
            else if (Population == 2){
                fil = fil.filter(f => f.population >= 1000 && f.population < 10000 )
            }
            else if (Population == 3){
                fil = fil.filter(f => f.population >= 10000 && f.population < 100000 )
            }
            else if (Population == 4){
                fil = fil.filter(f => f.population >= 100000 )
            }
            else{
                fil = fil
            }
        }

        if (orderType){
           if (orderType == 1){
                fil = fil.sort((a,b)=> a.name.common.localeCompare(b.name.common))
           }

           else if(orderType == 2) {
            fil = fil.sort((a,b)=> a.name.common.localeCompare(b.name.common))
            fil = fil.reverse()
           }

           else if(orderType == 3) {
            fil = fil.sort((a,b)=> a.population - b.population)
            fil = fil.reverse()
           }

           else if(orderType == 4) {
            fil = fil.sort((a,b)=> a.population - b.population)
           }
           else if(orderType == 5) {
            fil = fil.sort((a,b)=> a.area - b.area)
            fil = fil.reverse()
           }

           else if(orderType == 6) {
            fil = fil.sort((a,b)=> a.area - b.area)
           }
           else{
            fil = fil
           }
        }

        setFilteramecountries(fil)

    },[changevalue,changeregion,subRegion,countries, Population,orderType])


    if (error) return <p>Ocorreu um erro: {error.message}</p>;

    return(
        <div>
            <input onChange={handleChange} placeholder='nome do pais'/>
            <select onChange={setRegion}>
                <option value=''>All</option>
                {filterRegion.map((value)=>(
                    <option value={value}>{value}</option>
                ))}
            </select>
            <select onChange={setSB}>
                <option value=''>All</option>
                {FilterSubRegions.map((value)=>(
                    <option value={value}>{value}</option>
                ))}
            </select>
            <select onChange={setPop}>
                <option value={1}>- 1 mil</option>
                <option value={2}>1 mil - 10 mil</option>
                <option value={3}>10 mil - 100 mil</option>
                <option value={4}> + 100 mil</option>
            </select>
            <select onChange={setOT}>
                <option value={1}>A-Z</option>
                <option value={2}>Z-A</option>
                <option value={3}>Maior população</option>
                <option value={4}>Menor população</option>
                <option value={5}>Tamanho +</option>
                <option value={6}>Tamanho -</option>
            </select>
            <div className='flex column align-center box-border'>
            {filternamecountries.map((country)=>(
                        <div className=' card-coutry flex column align-center'>
                            <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className='img-card-coutry'/>
                            <h3>{country.name.common}</h3>
                            <p>{country.capital ? country.capital[0] : "" }</p>
                            <p>{country.region}</p>
                            <a href={`pages/country/${country.ccn3}`} >Veja mais</a>
                        </div>

                        )
                    )
                }
            </div>
        </div>
    )
}

export default Paises;