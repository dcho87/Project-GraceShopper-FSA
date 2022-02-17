import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserThunk } from "../../store";
import Checkout_Products from "./Checkout_Products";
import { Link } from "react-router-dom";
import StripeContainer from "./StripeContainer";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      address: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  async componentDidMount() {
    if (this.props.auth.id) {
      this.setState({
        id: this.props.auth.id,
        first_name: this.props.auth.first_name,
        last_name: this.props.auth.last_name,
        email: this.props.auth.email,
        address: this.props.auth.address || "",
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
      await this.props.updateUser({ ...this.state });
      window.location.reload();
    } catch (er) {
      console.log(er);
      // this.setState({ error: er.response.data.error.errors[0].message });
    }
  }

  render() {
    const { first_name, last_name, email, address } = this.state;
    const { onChange, onSave } = this;
    return (
      <div>
        <div className="header">
          <h1>Checkout</h1>
          <Link to="/orders/previous_orders">View Previous Orders</Link>
        </div>
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
          <button disabled={!first_name || !last_name || !email}>
            Confirm Details{" "}
          </button>
          <br />
        </form>
        <Checkout_Products />
        <StripeContainer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateUser: (user) => {
      dispatch(updateUserThunk(user, history));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(Checkout);
