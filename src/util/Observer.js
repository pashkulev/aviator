let subscriptions = {
	login: [],
	logout: [],
	success: [],
	error: []
};

export default {
	events: {
		login: 'login',
		logout: 'logout',
		success: 'success',
		error: 'error'
	},
	subscribe: (event, fn) => subscriptions[event].push(fn),
	trigger: (eventName, data) => subscriptions[eventName].forEach(fn => fn(data))
}