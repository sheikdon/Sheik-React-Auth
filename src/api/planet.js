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