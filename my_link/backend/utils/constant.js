export const API_PREFIX = "/api";
export const BOOKING_STATUS = {
  PENDING: 1, // Đang tìm tài xế
  ACCEPT: 2, // Tài xế nhận cuốc xe
  PICKUP: 3, // Cuốc xe đang diễn ra
  FINISH: 4, // Hoàn thành cuốc xe
  CANCEL: 5, // Cuốc xe bị hủy
};

export const COORDINATING_CAR_BOOKING = "coordinating_car_booking";
export const LOCATING = "locating";
export const COMPLETE_LOCATING = "complete_locating";
export const TRACING = "tracing";
export const SEND_TO_USER = "send_to_user";
export const RECEIVE_FROM_USER = "receive_from_user";
export const LOCATING_QUEUE = "info_queue";
export const COMPLETE_LOCATING_QUEUE = "complete_locating_queue";
export const TRACING_QUEUE = "tracing_queue";
export const SEND_TO_USER_QUEUE = "send_to_user_queue";
export const RECEIVE_FROM_USER_QUEUE = "receive_from_user_queue";
export const ROUTING = {
  locating: "info",
  completeLocating: "complete_locating",
  tracing: "tracing",
  sendToUser: "send_to_user",
  receiveFromUser: "receive_from_user",
};
