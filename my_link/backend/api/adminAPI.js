const { getListAdmins, updateAdmin, deleteAdmin, totalAdmins } = require('../controller/adminController');

export default function adminAPI(app) {
	app.get('/admins', getListAdmins);
	app.post('/admins/update', updateAdmin);
	app.post('/admins/delete/:id/:userId', deleteAdmin);
	app.get('/admins/total', totalAdmins)
}
