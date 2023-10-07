import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import * as actionUser from "../../../redux/user/actions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { toast } from "react-toastify";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { id: userId, isLoading, isError } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userAccessToken = localStorage.getItem("userAccessToken") || undefined;
  console.log("🚀 ~ file: LoginForm.js:21 ~ LoginForm ~ userAccessToken:", userAccessToken);

  useEffect(() => {
    if (userId && userAccessToken) {
      toast.info("Login successfully");
      navigate("/dashboard");
    } else if (isError) {
      toast.error("Something went wrong");
    }
  }, [userId, isError]);

  const onSubmit = (data) => {
    const { username, password } = data;
    dispatch(actionUser.signinSaga({ username, password }));
  };

  const classes = useStyles();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
        <div className={classes.formItem}>
          <label>
            Username <span style={{ color: "red" }}>*</span>
          </label>
          <input
            {...register("username", { required: true })}
            type="text"
            className={classes.input}
            placeholder="Enter your username"
          />
          {errors.username && <p style={{ color: "red", fontSize: "12px" }}>Required</p>}
        </div>
        <div className={classes.formItem}>
          <label>
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
            className={classes.input}
            placeholder="Enter your password"
          />
          {errors.password && <p style={{ color: "red", fontSize: "12px" }}>Required</p>}
        </div>
        <LoadingButton variant="contained" type="submit" loading={isLoading}>
          Login
        </LoadingButton>
      </form>
    </div>
  );
};

const useStyles = createUseStyles({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formItem: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "5px 0",
  },
  input: {
    width: "100%",
    borderRadius: "5px",
    padding: "10px 15px",
    fontSize: "14px",
  },
});

export default LoginForm;
