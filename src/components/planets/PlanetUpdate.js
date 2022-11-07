import React from 'react'

const PlanetUpdate = ({ planet, handleChange, handleUpdatePlanet }) => {
	return (
		<>
			<input 
            type='text' 
            value={planet.name} 
            name='name' 
            onChange={handleChange} 
            />
			<input 
            type='text' 
            value={planet.type} 
            name='type' 
            onChange={handleChange} 
            />
			<button onClick={handleUpdatePlanet}>Update planet</button>
		</>
	)
}

export default PlanetUpdate