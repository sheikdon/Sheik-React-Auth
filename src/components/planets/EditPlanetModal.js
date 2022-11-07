import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PlanetForm from '../shared/PlanetForm'
import { planetUpdate } from '../../api/planet'
import messages from '../shared/AutoDismissAlert/messages'

const EditPlanetModal = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh 
    } = props

    const [planet, setPlanet] = useState(props.planet)

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

    const handleSubmit = (e) => {
        e.preventDefault()
        
        planetUpdate(planet, user, props.planet._id)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.updatePlanetSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: messages.updatePlanetFailure + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <PlanetForm 
                    planet={planet}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Planet"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPlanetModal