import { signin, signup, changePassword } from '../controller/authController';
import { verifySignUp } from './../middleware/verifySignUp';

export default function authAPI(app) {
	app.post(
		'/signup',
		[
			verifySignUp.checkDuplicateUsernameOrEmail,
			verifySignUp.checkRolesExisted,
		],
		signup,
	);
	app.post('/signin', signin);
	app.post('/user/change-password', changePassword);
}
