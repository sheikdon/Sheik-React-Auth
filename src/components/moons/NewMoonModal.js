import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MoonForm from '../shared/MoonForm'
import { createMoon } from '../../api/moon'

const NewMoonModal = (props) => {
    const { 
        user, planet, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [moon, setMoon] = useState({})

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

        createMoon(user, planet._id, moon)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: 'Great! The planet loves it!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong! Please try again',
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header closeButton />
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

export default NewMoonModal