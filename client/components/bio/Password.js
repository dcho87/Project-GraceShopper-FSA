import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser } from "../../store";

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  async componentDidMount() {
    const { user } = this.props;
    if (user.id) {
      this.setState({
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
    const { password } = this.state;
    const { onChange, onSave } = this;
    console.log(this);
    return (
      <div>
        <h1>Change Password</h1>
        <form onSubmit={onSave}>
          {/* <pre>{!!error && JSON.stringify(error, null, 2)}</pre> */}
          <input
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
          />{" "}
          <br />
          <button disabled={!password}>Update </button>
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

export default connect((state) => state, mapDispatchToProps)(Password);
