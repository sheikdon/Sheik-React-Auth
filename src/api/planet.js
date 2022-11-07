import apiUrl from '../apiConfig'
import axios from 'axios'

export const planetCreate = (data, user) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/planets',
		data: {
			planet: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
	
}
export const planetIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/planets',
		// headers: {
		// 	Authorization: `Token token=${user.token}`,
		// },
	})
}

export const planetShow = (user, id) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/planets/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const planetUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/planets/' + id,
		data: {
			planet: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const planetDelete = (user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/planets/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}