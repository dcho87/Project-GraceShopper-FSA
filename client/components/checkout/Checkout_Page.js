import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserThunk } from "../../store";
import Checkout_Products from "./Checkout_Products";
import { Link } from "react-router-dom";
import Stripe from "./payments/Stripe";
import "./Checkout.css";

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
    const user = this.state;
    // console.log(user);
    const { first_name, last_name, email, address } = this.state;
    const { onChange, onSave } = this;
    return (
      <div>
        <div className="checkout-header">
          <h1>Checkout</h1>
        </div>
        <div className="firstTwo">
          <Checkout_Products />
          <form className="Form" onSubmit={onSave}>
            <fieldset className="FormGroup">
              <h2>Confirm User Details</h2>
              {/* <pre>{!!error && JSON.stringify(error, null, 2)}</pre> */}
              <small>First Name</small>
              <input
                className="field"
                name="first_name"
                value={first_name}
                onChange={onChange}
                placeholder="First Name"
              />{" "}
              <br />
              <small>Last Name</small>
              <input
                className="field"
                name="last_name"
                value={last_name}
                onChange={onChange}
                placeholder="Last Name"
              />{" "}
              <br />
              <small>Email</small>
              <input
                className="field"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
              />{" "}
              <br />
              <small>Billing Address</small>
              <input
                className="field"
                name="address"
                value={address}
                onChange={onChange}
                placeholder="Address"
              />{" "}
              <br />
              <button
                disabled={!first_name || !last_name || !email || !address}
              >
                Submit{" "}
              </button>
              <br />
            </fieldset>
          </form>
        </div>
        {/* {console.log(this.state)} */}
        <Stripe />
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
