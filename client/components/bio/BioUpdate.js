import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserThunk } from "../../store";

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
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
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
        address: user.address || "",
      });
    }
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  async onSave(ev) {
    ev.preventDefault();
    try {
      // await this.props.update(user.id);
      await this.props.updateUser({ ...this.state });
    } catch (er) {
      console.log(er);
      // this.setState({ error: er.response.data.error.errors[0].message });
    }
  }

  render() {
    const { first_name, last_name, email, address, password } = this.state;
    // console.log(this.props);
    const { onChange, onSave } = this;
    // console.log(this);
    return (
      <div>
        <form onSubmit={onSave}>
          {/* <pre>{!!error && JSON.stringify(error, null, 2)}</pre> */}
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
          <br />
          <input
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
          />{" "}
          <button disabled={!first_name || !last_name || !email}>
            Update Details!{" "}
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(updateUserThunk(user));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(BioUpdate);
