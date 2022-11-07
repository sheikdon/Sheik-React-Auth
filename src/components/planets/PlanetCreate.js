import React, { useState } from 'react' 
import { planetCreate } from '../../api/planet'
import { useNavigate } from 'react-router-dom'

import PlanetForm from '../shared/PlanetForm'

const PlanetCreate = ({ user, msgAlert }) => {
    const navigate = useNavigate()

    const defaultPlanet = {
        name: '',
        type: '',
        age: '',
        livable: false
    }

    const [planet, setPlanet] = useState(defaultPlanet)

    const handleChange = (e) => {
        // to keep the values as users input info 
        // first spread the current 
        // then comma and modify the key to the value you need
        // this was fine for the old way of building a 
        // need new stuff to handle new data types number and boolean
        // set({..., [event.target.name]: event.target.value})
        setPlanet(prevPlanet => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
            // this handles our number type
            if (e.target.type === 'number') {
                // this looks at the input type and changes from the default type of string to an actual number
                updatedValue = parseInt(e.target.value)
            }

            // now we handle the checkbox
            if (updatedName === "livable" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "livable" && !e.target.checked) {
                updatedValue = false
            }

            const updatedPlanet = { [updatedName]: updatedValue }

            return { ...prevPlanet, ...updatedPlanet }
        })
    }

    const handleCreatePlanet = (e) => {
        e.preventDefault()
        
        planetCreate(planet, user)
            .then(res => { navigate(`/planets/${res.data.planet.id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Create Planet',
                    variant: 'success'
                })
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Planet Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <PlanetForm
            planet={ planet }
            handleChange={ handleChange }
            heading="Add a new planet!"
            handleSubmit={ handleCreatePlanet }
        />
	)
}

export default PlanetCreate