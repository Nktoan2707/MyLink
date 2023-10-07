import { where } from 'sequelize';
import db from '../utils/db';

export const handleUpdateStatusOfCar = async (req, res) => {
	const { idCar } = req.params;
	const { driverId, status } = req.body;

	console.log('Driverid:', driverId);
	console.log('status:', status);
	console.log('idcar:', idCar);
	try {
		await db.BookingInfo.update(
			{ driverId, status },
			{
				where: {
					id: idCar,
				},
			},
		);
		res.status(200).json({ message: 'Update successfully' });
	} catch (e) {
		console.error(e);
		res.status(500).json({ message: e });
	}
};
