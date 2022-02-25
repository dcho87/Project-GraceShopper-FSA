import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchHistory, updateUserThunk } from "../../store";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

class BioUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      address: "",
      newPassword: "",
      confirmNewPassword: "",
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSaveA = this.onSaveA.bind(this);
  }

  async componentDidMount() {
    const { user } = this.props;
    if (user.id) {
      this.setState({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        confirmPassword: "",
        address: user.address || "",
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth.id !== prevState.id) {
      this.setState({
        id: this.props.auth.id,
        first_name: this.props.auth.first_name,
        last_name: this.props.auth.last_name,
        email: this.props.auth.email,
        address: this.props.auth.address || "",
      });
      this.props.fetchHistory(this.props.auth);
    }
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  async onSave(ev) {
    // ev.preventDefault();
    try {
      await this.props.updateUser({ ...this.state });
      window.location.reload();
    } catch (er) {
      console.log(er);
      // this.setState({ error: er.response.data.error.errors[0].message });
    }
  }

  async onSaveA(ev) {
    // ev.preventDefault();
    if (this.state.newPassword !== this.state.confirmNewPassword) {
      this.setState({ error: "your passwords do not match" });
      return;
    }
    try {
      this.state.password = this.state.newPassword;
      await this.props.updateUser({ ...this.state });
      window.location.reload();
      console.log("working");
    } catch (er) {
      console.log(er);
      // this.setState({ error: er.response.data.error.errors[0].message });
    }
  }

  render() {
    const {
      first_name,
      last_name,
      email,
      address,
      error,
      newPassword,
      confirmNewPassword,
    } = this.state;
    // console.log(this.props);
    const { onChange, onSave, onSaveA } = this;
    // console.log(this);
    return (
      <div>
        <form onSubmit={onSave} className="form-bio">
          {/* <pre>{!!error && JSON.stringify(error, null, 2)}</pre> */}
          <br />
          <input
            name="first_name"
            value={first_name}
            onChange={onChange}
            placeholder="First Name"
          />{" "}
          <br />
          <input
            name="last_name"
            value={last_name}
            onChange={onChange}
            placeholder="Last Name"
          />{" "}
          <br />
          <input
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
          />{" "}
          <br />
          <input
            name="address"
            value={address}
            onChange={onChange}
            placeholder="Address"
          />{" "}
          <Box>
            <Button
              onClick={() => this.onSave()}
              variant="contained"
              size="medium"
              disabled={!first_name || !last_name || !email}
            >
              Update{" "}
            </Button>
          </Box>
        </form>
        {error && (
          <Alert severity="error" className="error-text">
            {error}
          </Alert>
        )}
        <form onSubmit={onSaveA} className="form-bio">
          <h4> Change Password Here</h4>
          <br />
          <input
            name="newPassword"
            onChange={onChange}
            placeholder="Password"
            type="password"
          />{" "}
          <br />
          <input
            name="confirmNewPassword"
            onChange={onChange}
            placeholder="Confirm Password"
            type="password"
          />{" "}
          <Box>
            <Button
              onClick={() => this.onSaveA()}
              variant="contained"
              size="medium"
              disabled={!newPassword || !confirmNewPassword}
            >
              Update{" "}
            </Button>
          </Box>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateUser: (user) => {
      dispatch(updateUserThunk(user, history));
    },
    fetchHistory: (user) => {
      dispatch(fetchHistory(user));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(BioUpdate);
