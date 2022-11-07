import React, { useState, useEffect } from 'react'
import PlanetIndex from "./planets/PlanetIndex"



const Home = (props) => {
	const { msgAlert } = props

	return (
		<div className='container-md'>
			
			<h2>All the planets</h2>
			<PlanetIndex msgAlert={msgAlert}/>
		</div>
	)
}

export default Home