const { getListDrivers, updateDriver, deleteDriver, totalDrivers, totalDriversEachMonth } = require('../controller/driverController');

export default function driverAPI(app) {
	app.get('/drivers', getListDrivers);
	app.post('/drivers/update', updateDriver);
	app.post('/drivers/delete/:id/:userId', deleteDriver);
	app.get('/drivers/total', totalDrivers);
	app.get('/drivers/total/months', totalDriversEachMonth);
}
