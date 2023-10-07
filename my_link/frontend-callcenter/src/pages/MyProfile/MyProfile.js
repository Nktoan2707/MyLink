import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useForm } from "react-hook-form";
import { Button, MenuItem, Select } from "@mui/material";
import SelectGender from "./components/SelectGender";
import DateOfBirthPicker from "./components/DateOfBirthPicker";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import * as userAction from "../../redux/user/actions";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const MyProfile = () => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.user);
  console.log("🚀 ~ file: MyProfile.js:23 ~ MyProfile ~ user:", user);
  const dispatch = useDispatch();
  const { username, email, id } = user;
  const idUser = localStorage.getItem("idUser");
  console.log("🚀 ~ file: MyProfile.js:25 ~ MyProfile ~ id:", id);
  const initState = {
    ...user,
  };
  console.log("🚀 ~ file: MyProfile.js:22 ~ MyProfile ~ initState:", initState);

  const [state, _setState] = useState(initState);
  console.log("🚀 ~ file: MyProfile.js:31 ~ MyProfile ~ state:", state);

  const setState = (obj) => _setState((state) => ({ ...state, ...obj }));
  const [isEditing, setEditing] = useState(false);
  const [isCompleteUpdate, setCompleteUpdate] = useState(true);

  const onUpdateUserInfo = () => {
    console.log("vao dayyy");
    setCompleteUpdate(false);
    dispatch(
      userAction.updateUserInfoSaga({
        id: id || idUser,
        firstname: state.firstName,
        lastname: state.lastName,
        phone: state.phone,
        city: state.city,
        dateofbirth: state.dateOfBirth,
        sex: state.isMale,
        address: state.address,
      })
    );

    if (!state.isError) {
      toast.info("Update successfully");
      setCompleteUpdate(true);
      setEditing(false);
    }
  };

  useEffect(() => {
    dispatch(userAction.getUser(id || idUser));
  }, [id, idUser]);

  // const [loading, setLoading] = useState(false);
  return state.isLoading ? (
    <ReactLoading type="balls" color="blue" height={667} width={375} />
  ) : (
    <div className={classes.myProfileContainer}>
      <div className={classes.headerProfileContainer}>
        <div className={classes.imageProfileContainer}>
          <img
            src="https://thenounproject.com/api/private/icons/5034901/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0"
            alt=""
          />
        </div>
        <div>
          <h2 className={classes.nameEmployee}>{username}</h2>
          <p className={classes.roleEmployee}>Employee</p>
        </div>
      </div>
      <div className={classes.myProfileInfoContainer}>
        <form onSubmit={handleSubmit(onUpdateUserInfo)}>
          <div className={classes.formContainer}>
            <div className={classes.myProfileInfoLeftContainer}>
              <div className={classes.formItem}>
                <label className={classes.label}>First name</label>
                <input
                  className={classes.input}
                  value={state.firstName}
                  {...register("firstName", { required: true })}
                  onChange={(e) => setState({ firstName: e.target.value })}
                  onFocus={() => setEditing(true)}
                />
              </div>
              <div className={classes.formItem}>
                <label className={classes.label}>Address</label>
                <input
                  className={classes.input}
                  value={state.address}
                  {...register("address", { required: true })}
                  onChange={(e) => {
                    console.log("aaa");
                    setState({ address: e.target.value });
                  }}
                  onFocus={() => setEditing(true)}
                />
              </div>
              <div className={classes.formBirthAndGender}>
                <div className={classes.formItem}>
                  <label className={classes.label}>Date of Birth</label>
                  <DateOfBirthPicker
                    value={dayjs(state.dateOfBirth)}
                    onChange={(e) => setState({ dateOfBirth: e.format("YYYY-MM-DD") })}
                    onFocus={() => setEditing(true)}
                  />
                </div>
                <div>
                  {/* <label className={classes.formItem}>Gender</label> */}
                  <SelectGender
                    value={state.isMale}
                    onChange={(e) => {
                      setState({ isMale: e.target.value === "Male" });
                      setEditing(true);
                    }}
                  />
                </div>
              </div>
              <div className={classes.formItem}>
                <label className={classes.label}>Password</label>
                <input
                  className={classes.input}
                  type="password"
                  value={"123456"}
                  disabled
                  {...register("password", { required: true })}
                  onFocus={() => setEditing(true)}
                />
              </div>
            </div>
            <div className={classes.myProfileInfoRightContainer}>
              <div className={classes.formItem}>
                <label className={classes.label}>Last name</label>
                <input
                  className={classes.input}
                  value={state.lastName}
                  {...register("lastName", { required: true })}
                  onChange={(e) => setState({ lastName: e.target.value })}
                  onFocus={() => setEditing(true)}
                />
              </div>
              <div className={classes.formItem}>
                <label className={classes.label}>City</label>
                <input
                  className={classes.input}
                  value={state.city}
                  {...register("city", { required: true })}
                  onChange={(e) => setState({ city: e.target.value })}
                  onFocus={() => setEditing(true)}
                />
              </div>
              <div className={classes.formItem}>
                <label htmlFor="" className={classes.label}>
                  Contacts
                </label>
                <input
                  className={classes.input}
                  value={state.phone}
                  {...register("phone", { required: true })}
                  onChange={(e) => setState({ phone: e.target.value })}
                  onFocus={() => setEditing(true)}
                />
              </div>
              <div className={classes.formItem}>
                <label className={classes.label}>Email</label>
                <input className={classes.input} value={email} {...register("email", { required: true })} disabled />
              </div>
            </div>
          </div>
          {(isEditing || !isCompleteUpdate) && (
            <div className={classes.formControl}>
              <LoadingButton
                color="primary"
                // type="submit"
                onClick={onUpdateUserInfo}
                loading={state.isLoading}
                loadingPosition="center"
                variant="contained"
              >
                <span>Save</span>
              </LoadingButton>
              <Button variant="contained" color="error" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  myProfileContainer: {},
  headerProfileContainer: {
    display: "flex",
    gap: "0 15px",
    alignItems: "center",
    marginLeft: "20px",
    marginRight: "20px",
    borderBottom: "1px solid #ccc",
  },
  myProfileInfoContainer: {
    marginTop: "40px",
    marginLeft: "20px",
    marginRight: "20px",
  },
  imageProfileContainer: {
    width: 100,
    height: 100,
    borderRadius: 999,
  },
  nameEmployee: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: "30px",
  },
  roleEmployee: {
    fontSize: 14,
  },
  formContainer: {
    display: "flex",
    gap: "0 40px",
    justifyContent: "space-between",
  },
  formItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px 0px",
    marginBottom: "20px",
  },
  formBirthAndGender: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },

  myProfileInfoLeftContainer: {
    width: "50%",
  },
  myProfileInfoRightContainer: {
    width: "50%",
  },
  label: {
    fontSize: "14px",
    fontWeight: 600,
  },
  input: {
    height: "50px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "15px",
    padding: "10px 15px",
  },
  formControl: {
    float: "right",
    display: "flex",
    gap: "0 20px",
    marginTop: "40px",
  },
});
export default MyProfile;
