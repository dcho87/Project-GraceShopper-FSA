import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser } from "../../store";

class BioUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
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
      await this.props.editUser({ ...this.state });
      window.location.reload();
    } catch (er) {
      console.log(er);
      //   this.setState({ error: er.response.data.error.errors[0].message });
    }
  }

  render() {
    const { first_name, last_name, email } = this.state;
    const { onChange, onSave } = this;
    console.log(this);
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
          <button disabled={!first_name || !last_name || !email}>
            Update Details!{" "}
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    editUser: (user) => {
      dispatch(editUser(user, history));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(BioUpdate);
