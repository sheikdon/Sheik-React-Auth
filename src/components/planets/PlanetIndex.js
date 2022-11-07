import React, { useEffect, useState } from 'react' 
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { planetIndex } from '../../api/planet'
import LoadingScreen from '../shared/LoadingScreen'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

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

    const planetCards = allPlanets.map(planet => (
        <Card key={ planet.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ planet.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={ `/planets/${planet.id}` }>View { planet.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    if (!allPlanets) {
        return <LoadingScreen />
    }

    return (
        <div className='container-md' style={ cardContainerLayout }>
            { planetCards }
        </div>
    )
}

export default PlanetIndex