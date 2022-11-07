import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createMoon = (user, planetId, newMoon) => {
    console.log('the user in createmoon', user)
    console.log('the newMoon in createmoon', newMoon)
	return axios({
		url: `${apiUrl}/moons/${planetId}`,
		method: 'POST',
		data: { moon: newMoon }
	})
}

// UPDATE Moon
export const updateMoon = (user, planetId, updatedMoon) => {
    console.log('this is updatedMoon', updatedMoon)
	return axios({
		url: `${apiUrl}/moons/${planetId}/${updatedMoon._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { moon: updatedMoon }
	})
}

// DELETE Moon
export const deleteMoon = (user, planetId, moonId) => {
	return axios({
		url: `${apiUrl}/moons/${planetId}/${moonId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}