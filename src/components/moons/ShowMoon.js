import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteMoon } from '../../api/moon'
import EditMoonModal from './EditMoonModal'

const ShowMoon = (props) => {
    const { moon, planet, user, msgAlert, triggerRefresh } = props
    console.log('this is the props', props)

    const [editModalShow, setEditModalShow] = useState(false)

    // this will set the color of the card based on the condition
    const setBgEnvironment = (cond) => {
        if (cond === 'new') {
            return({ width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return({ width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({ width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    // this function removes a , is only available to  owner
    const destroyMoon = () => {
        deleteMoon(user, planet._id, moon._id)
            .then(() => {
                msgAlert({
                    heading: 'Moon deleted!',
                    message: 'Bye Bye moon!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2" style={setBgEnvironment(moon.environment)}>
                <Card.Header>{ moon.name }</Card.Header>
                <Card.Body>
                    <small>{ moon.description }</small><br/>
                    <small>
                        { moon.isHere ? 'whish' : 'stoic silence'}
                    </small><br/>
                    <small>Environment: { moon.environment }</small>
                </Card.Body>
                <Card.Footer>
                    { 
                        user && planet.owner && user._id === planet.owner._id 
                        ?
                        <>
                            <Button
                                className="m-2" 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}  
                            >
                                Edit Moon
                            </Button>
                            <Button 
                                className="m-2"
                                variant="danger"
                                onClick={() => destroyMoon()}
                            >
                                Delete Moon
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditMoonModal 
                user={user}
                planet={planet}
                moon={moon}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
            />
        </>
    )
}

export default ShowMoon