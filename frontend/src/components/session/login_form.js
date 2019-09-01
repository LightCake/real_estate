import React from "react";
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  // Set state errors when any changes occure
  componentWillReceiveProps(nextProps) {
    // Set or clear errors
    this.setState({
      errors: nextProps.errors
    });
  }

  // Handle field updates
  update = field => {
    return event =>
      this.setState({
        [field]: event.currentTarget.value
      });
  };

  // Handle form submission
  handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
  };

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <br />
            <input type="submit" value="Submit" />
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
