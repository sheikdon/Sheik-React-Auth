import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { planetDelete, planetShow, planetUpdate } from '../api/planet'
import PlanetUpdate from './PlanetUpdate'

const PlanetShow = ({ user, msgAlert }) => {

    const [planet, setPlanet] = useState({})
    const [isUpdateShown, setIsUpdateShown] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        planetShow(user, id)
        .then((res) => {
            setPlanet(res.data.planet)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Show Planet Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const toggleShowUpdate = () => {
        setIsUpdateShown(prevUpdateShown => !prevUpdateShown)
    }

    const handleChange = (event) => {
        // to keep the values as users input info 
        // first spread the current planet
        // then comma and modify the key to the value you need
        setPlanet({...planet, [event.target.name]: event.target.value})
    }

    const handleUpdatePlanet = () => {
        planetUpdate(planet, user, id)
        .then(() => {
            msgAlert({
                heading: 'Success',
                message: 'Updating planet',
                variant: 'success'
            })
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Update planet Failure' + error,
                variant: 'danger'
            })
        })
    }

    const handleDeletePlanet = () => {
        planetDelete(user, id)
        .then(() => {
            setDeleted(true)
            msgAlert({
                heading: 'Success',
                message: 'Deleting a planet',
                variant: 'success'
            })
            
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Deleting a planet Failure' + error,
                variant: 'danger'
            })
        })
    }

    // logical &&
    // both sides of this check NEED to be truthy values = true
    // logical ||
    // only one side of this check needs to be truthy = true

    // oneliner
    if (deleted) navigate('/planets')
    // if (deleted) {
    //     navigate('/planets')
    // }

    return (
			<>
				<h3>Name: {planet.name}</h3>
				<p>Distance From Sun: {planet.distanceFromSun}</p>
                <p>Moons: {planet.moons}</p>
                <p>Info: {planet.info}</p>
				<button onClick={toggleShowUpdate}>Toggle Update</button>
				{isUpdateShown && (
					<PlanetUpdate
						planet={planet}
						handleChange={handleChange}
						handleUpdatePlanet={handleUpdatePlanet}
					/>
				)}
                <button onClick={handleDeletePlanet} >Delete</button>
			</>
		)
}

export default PlanetShow