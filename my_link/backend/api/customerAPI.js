const { getListCustomers, updateCustomer, deleteCustomer, totalCustomers, totalCustomersEachMonth } = require('../controller/customerController');

export default function customerAPI(app) {
	app.get('/customers', getListCustomers);
	app.post('/customers/update', updateCustomer);
	app.post('/customers/delete/:id/:userId', deleteCustomer);
	app.get('/customers/total', totalCustomers);
	app.get('/customers/total/months', totalCustomersEachMonth);
}
