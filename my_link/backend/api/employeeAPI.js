const { getListEmployees, updateEmployee, deleteEmployee, totalEmployees } = require('../controller/employeeController');

export default function employeeAPI(app) {
	app.get('/employees', getListEmployees);
	app.post('/employees/update', updateEmployee);
	app.post('/employees/delete/:id/:userId', deleteEmployee);
	app.get('/employees/total', totalEmployees)
}
