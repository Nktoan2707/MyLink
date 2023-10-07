import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import * as bookingAction from "../../redux/booking/actions";
import { toast } from "react-toastify";
const INIT_STATE = {
  customerName: "",
  phone: "",
  pickupAddress: "",
  destinationAddress: "",
};

const Booking = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const { id: idCar, isFinding, isError, distance, tripFare } = useSelector((state) => state.booking);
  const onSearchCar = (data) => {
    console.log("🚀 ~ file: Booking.js:25 ~ Booking ~ data:", data);
    const { customerName, destinationAddress, phone, pickupAddress } = data;
    const infoSearch = {
      customer: customerName,
      destination: destinationAddress,
      phone,
      address: pickupAddress,
    };
    dispatch(bookingAction.addBookingSaga(infoSearch));
    if (!isError) {
      toast.info(`Booking successfully. With tripFare is ${tripFare}, id of car: ${idCar}`);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.headingContainer}>
        <h1>Booking page</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSearchCar)}>
          <div className={classes.itemContainer}>
            <label>
              Customer name<span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input type="text" {...register("customerName", { required: true })} />
            {errors.customerName && <p style={{ color: "red", fontSize: "12px" }}>Required</p>}
          </div>
          <div className={classes.itemContainer}>
            <label>
              Phone<span style={{ color: "red" }}>*</span>
            </label>
            <input type="text" {...register("phone", { required: true })} />
            {errors.phone && <p style={{ color: "red", fontSize: "12px" }}>Required</p>}
          </div>
          <div className={classes.itemContainer}>
            <label>
              Pickup address<span style={{ color: "red" }}>*</span>
            </label>
            <input type="text" {...register("pickupAddress", { required: true })} />
            {errors.pickupAddress && <p style={{ color: "red", fontSize: "12px" }}>Required</p>}
          </div>
          <div className={classes.itemContainer}>
            <label>
              Destination address<span style={{ color: "red" }}>*</span>
            </label>
            <input type="text" {...register("destinationAddress", { required: true })} />
            {errors.destinationAddress && <p style={{ color: "red", fontSize: "12px" }}>Required</p>}
          </div>
          <div className={classes.footerContainer}>
            <LoadingButton variant="contained" type="submit" loading={isFinding}>
              Search
            </LoadingButton>
            <Button variant="contained" color="error">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const useStyle = createUseStyles({
  container: {
    paddingLeft: 50,
    paddingRight: 50,
  },

  headingContainer: {
    marginTop: "20px",
    marginBottom: "20px",
    textAlign: "center",
    "& > h1": {
      fontWeight: 800,
      fontSize: 24,
    },
  },

  itemContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginBottom: "15px",
    "& > input": {
      padding: "10px 20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
  },

  footerContainer: {
    marginTop: "50px",
    float: "right",
    display: "flex",
    gap: "0 20px",
  },
});

export default Booking;
