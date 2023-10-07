import { upload } from "../middleware/uploader";

const { getListUser, getUserById, getTotalUserToday, updateUser, getUserByIdForRole, updateUserInfo, enableOrDisable } = require('../controller/userController');

export default function userAPI(app) {
	app.get('/users', getListUser);
	app.get("/user/:id", getUserById);
	app.get('/total-users', getTotalUserToday);
	app.post('/users/update/:userIdRole', upload.single('image_url'), updateUser);
	app.post('/users/change-status', enableOrDisable);
	app.post('/users/:idUser', getUserByIdForRole);
  app.put("/user/:id", updateUserInfo);
}

