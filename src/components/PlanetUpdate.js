import React from "react";

const PlanetUpdate = ({planet, handleChange, handleUpdatePlanet}) => {
    return (
        <>
                 <input
					type='text'
					value={planet.name}
					name='name'
					onChange={handleChange}
				/>
                <input 
                    type = 'text'
                    value = {planet.distanceFromSun}
                    name = 'distance from sun'
                    onChange = {handleChange}
                    />
                    <input 
                    type = 'text'
                    value = {planet.moons}
                    name = 'moons'
                    onChange = {handleChange}
                    />
                    <input 
                    type = 'text'
                    value = {planet.info}
                    name = 'info'
                    onChange = {handleChange}
                    />
				<button onClick={handleUpdatePlanet}>Update Planet</button>
        </>
    )
}

export default PlanetUpdate