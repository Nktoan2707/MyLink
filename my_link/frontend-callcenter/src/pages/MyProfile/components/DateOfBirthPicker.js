import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createUseStyles } from "react-jss";

export default function DateOfBirthPicker(props) {
  const classes = useStyles();
  const { value, onChange, onFocus } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className={classes.datePickerContainer}
        value={value}
        onChange={(e) => {
          onChange(e);
          onFocus();
        }}
      />
    </LocalizationProvider>
  );
}

const useStyles = createUseStyles({
  datePickerContainer: {
    height: "40px",
  },
});
