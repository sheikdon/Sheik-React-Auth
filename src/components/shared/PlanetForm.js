import { Form, Button, Container } from 'react-bootstrap'

const PlanetForm = (props) => {
    // here are the props we're going to bring into our form
    const { planet, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                    placeholder="what's your planet's name?"
                    name="name"
                    id="name"
                    value= { planet.name }
                    onChange={ handleChange }
                />
                <Form.Label>Type:</Form.Label>
                <Form.Control 
                    placeholder="what's type of planet?"
                    name="type"
                    id="type"
                    value= { planet.type }
                    onChange={ handleChange }
                />
                <Form.Label>Age:</Form.Label>
                <Form.Control 
                    placeholder="How old is your planet?"
                    type="number"
                    name="age"
                    id="age"
                    value= { planet.age }
                    onChange={ handleChange }
                />
                <Form.Check 
                    label="Is this planet livable?"
                    name="livable"
                    defaultChecked={ planet.livable }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PlanetForm