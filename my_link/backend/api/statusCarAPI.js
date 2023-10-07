import { handleUpdateStatusOfCar } from "../controller/statusCarController.js";

export default function statusCarAPI(app) {
  app.put("/status/driver/:idCar", handleUpdateStatusOfCar);
}
