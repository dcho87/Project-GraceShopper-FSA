import React from "react";
import { HashRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Routes from "./Routes";
class App extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  async componentDidMount() {
    store.dispatch(init());

    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  render() {
    return (
      <Router>
        <div className="main">
          <Navbar />
          <Routes />
        </div>
      </Router>
    );
  }
}

export default App;
