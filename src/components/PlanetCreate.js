import React, { useState } from "react";
import { planetCreate } from '../api/planet'

const PlanetCreate = ({user, msgAlert}) => {
    const defaultPlanet= {
        name: '',
        distanceFromSun: '', 
        moons: '',
        info: '',
    }
    
    const [planet, setPlanet] = useState(defaultPlanet)
    //to save the input info
    const handleChange = (event) => {
        setPlanet({...planet, [event.target.name]: event.target.value})
    }
    

    const handleCreatePlanet = () => {
        planetCreate(planet, user)
        .then(() => {
            msgAlert({
                heading:'Success!',
                message:'Create a planet Fool!',
                variant:'Success Brazza :)'
            })
        })
        .catch((error) => {
            msgAlert({
                heading:'Fail!',
                message:'Create a planet Fool!' + error,
                variant:'You Failed Brazza :('
            })
        })
    }



    
    return (
        <>
        <input 
        type = 'text'
        value = {planet.name}
        name = 'name'
        onChange = {handleChange}
        />
        <input 
        type = 'text'
        value = {planet.distanceFromSun}
        name = 'distance from sun'
        onChange = {handleChange}
        />
        <input 
        type = 'text'
        value = {planet.moons}
        name = 'moons'
        onChange = {handleChange}
        />
        <input 
        type = 'text'
        value = {planet.info}
        name = 'info'
        onChange = {handleChange}
        />
        <button onClick={handleCreatePlanet}>Create planet</button>
        </>



    )



}

export default PlanetCreate