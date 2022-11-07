import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MoonForm from '../shared/MoonForm'
import { updateMoon } from '../../api/moon'
import messages from '../shared/AutoDismissAlert/messages'


const EditMoonModal = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh, planet 
    } = props

    const [moon, setMoon] = useState(props.moon)

    const handleChange = (e) => {
        setMoon(prevMoon => {
            const name = e.target.name
            let value = e.target.value

            // handle the checkbox
            if (name === "isHere" && e.target.checked) {
                value = true
            } else if (name === "isHere" && !e.target.checked) {
                value = false
            }

            const updatedMoon = { [name]: value }

            return {
                ...prevMoon, ...updatedMoon
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        updateMoon(user, planet._id, moon)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.updateMoonSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: messages.updateMoonFailure + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <MoonForm 
                    moon={moon}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Give this planet a moon!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditMoonModal