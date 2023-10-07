import { createUseStyles } from "react-jss";
import LoginForm from "./components/LoginForm";

const Login = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div>
          <img
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a15ec96-291c-4aca-af8f-3ed11959c9aa/db254la-32475171-698a-4b2b-9dde-df6e562791c1.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhMTVlYzk2LTI5MWMtNGFjYS1hZjhmLTNlZDExOTU5YzlhYVwvZGIyNTRsYS0zMjQ3NTE3MS02OThhLTRiMmItOWRkZS1kZjZlNTYyNzkxYzEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.XgYIQF8Ou0ERBJxC5eZBgzoez3BIu8mTlAT-uY93SrE"
            alt=""
          />
        </div>
        <div className={classes.loginFormWrapper}>
          <h2 className={classes.loginTitle}>Login</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    maxWidth: "1024px",
    margin: "auto",
    zIndex: 1,
  },
  wrapper: {
    maxWidth: "980px",
    margin: "100px auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0 30px",
    padding: "20px",
    border: "3px solid #ccc",
    borderRadius: "5px",
    boxShadow: "5px 10px #888888",
    "@media screen and (max-width: 1023px)": {
      flexDirection: "column",
      maxWidth: "768px",
    },
    "@media screen and (max-width: 767px)": {
      maxWidth: "500px",
    },
  },
  loginImageWrapper: {},
  loginFormWrapper: {
    width: "30%",
    "@media screen and (max-width: 1023px)": {
      width: "100%",
    },
    "@media screen and (max-width: 767px)": {
      width: "100%",
    },
  },
  loginTitle: {
    fontSize: "30px",
    fontWeight: 600,
    color: "blue",
    textAlign: "center",
    marginBottom: "20px",
  },
});
export default Login;
