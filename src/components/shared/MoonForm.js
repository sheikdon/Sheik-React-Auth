import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const MoonForm = (props) => {
    const {moon, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                    placeholder="what's the moon's name?"
                    name="name"
                    id="name"
                    value= { moon.name }
                    onChange={ handleChange }
                />
                <Form.Label>Description:</Form.Label>
                <Form.Control 
                    placeholder="describe the moon..."
                    name="description"
                    id="description"
                    value= { moon.description }
                    onChange={ handleChange }
                />
                <Form.Check 
                    label="Is the moon here?"
                    name="isHere"
                    defaultChecked={ moon.isHere }
                    onChange={ handleChange }
                />
                <Form.Select
                    aria-label="moon environment"
                    name="environment"
                    defaultValue={moon.environment}
                    onChange={handleChange}
                >
                    <option>Open this select menu</option>
                    <option value="new">new</option>
                    <option value="used">old</option>
                    <option value="disgusting">ancient</option>
                </Form.Select>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default MoonForm