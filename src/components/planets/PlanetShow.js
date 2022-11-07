import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { planetDelete, planetShow } from '../../api/planet'
// import Update from './Update' <--no longer using in lieu of the modal
import EditPlanetModal from './EditPlanetModal'
import NewMoonModal from '../moons/NewMoonModal'
import ShowMoon from '../moons/ShowMoon'
import LoadingScreen from '../shared/LoadingScreen'
import { updatePlanetSuccess, updatePlanetFailure } from '../shared/AutoDismissAlert/messages'
import images from '../shared/images'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const PlanetShow = ({ user, msgAlert }) => {

    const [planet, setPlanet] = useState(null)
    // const [isUpdateShown, setIsUpdateShown] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [moonModalShow, setMoonModalShow] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [updated, setUpdated] = useState(false)

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
    }, [updated])

    const handleDeletePlanet = () => {
        planetDelete(user, id)
        .then(() => {
            setDeleted(true)
            msgAlert({
                heading: 'Success',
                message: 'Deleting a Planet',
                variant: 'success'
            })
            
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Deleting a Planet Failure' + error,
                variant: 'danger'
            })
        })
    }

    let moonCards
    if (planet) {
        if (planet.moons.length > 0) {
            // map over the toys
            // produce one ShowToy component for each of them
            moonCards = planet.moons.map(moon => (
                <ShowMoon 
                    key={moon._id}
                    toy={moon}
                    planet={planet}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    // logical &&
    // both sides of this check NEED to be truthy values = true
    // logical ||
    // only one side of this check needs to be truthy = true

    // oneliner
    if (deleted) navigate('/planets')
    // if (deleted) {
    //     navigate('/s')
    // }

    if (!planet) {
        return <LoadingScreen />
    }

    return (
        <>
			<Container className="fluid">
                <Card>
                <Card.Header>{ planet.fullTitle }</Card.Header>
                <Card.Body>
                    {/* { 
                        planet.type === "moon" 
                        ?
                        <Card.Img variant="top" src={`${images.dog}`}/>
                        :
                        null
                    }
                    { 
                        planet.type === "cat" 
                        ?
                        <Card.Img variant="top" src={`${images.cat}`}/>
                        :
                        null
                    } */}
                    <Card.Text>
                        <small>Age: { planet.age }</small><br/>
                        <small>Type: { planet.type }</small><br/>
                        <small>
                            Livable?: { planet.livable ? 'yes' : 'no' }
                        </small><br/>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={() => setMoonModalShow(true)}
                        className="m-2" variant="info"
                    >
                        Give {planet.name} a moon!
                    </Button>
                    { 
                        planet.owner && user && planet.owner._id === user._id 
                        ?
                        <>
                            <Button onClick={() => setEditModalShow(true)} className="m-2" variant="warning">
                                Edit Planet
                            </Button>
                            <Button onClick={() => handleDeletePlanet()}
                                className="m-2"
                                variant="danger"
                            >
                                Set { planet.name } Abandoned
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
                    
                </Card>
            <h3>All of {planet.name}'s moons:</h3>
            </Container>
            <Container style={cardContainerLayout}>
                { moonCards }
            </Container>
            <EditPlanetModal 
                user={user}
                planet={planet}
                show={editModalShow}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            />
            <NewMoonModal 
                user={user}
                planet={planet}
                show={moonModalShow}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setMoonModalShow(false)}
            />
        </>
    )
}

export default PlanetShow