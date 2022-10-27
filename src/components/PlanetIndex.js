import React, { useEffect, useState } from 'react' 
import { Link } from 'react-router-dom'
import { planetIndex } from '../api/planet'

const PlanetIndex = ({ user, msgAlert }) => {

    const [allPlanets, setAllPlanets] = useState([])

    useEffect(() => {
        planetIndex(user)
        .then(res => {
            setAllPlanets(res.data.planets)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Planets Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const allPlanetsJSX = allPlanets.map(planet => {
        return (
            <Link to={planet._id} key={planet._id}>
            <li>Name: {planet.name} Distance From Sun: {planet.distanceFromSun} Moons: {planet.moons} Info:{planet.info} </li>
            </Link>
        )
    })

    return (
        <>
            <ul>{allPlanetsJSX}</ul>
        </>
    )
}

export default PlanetIndex