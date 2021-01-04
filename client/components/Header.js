import React, { Component} from 'react';
import {graphql} from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

class Header extends Component {
  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick () {
    console.log("clicked")
    this.props.mutate({
      refetchQueries: [
        { query }
      ]
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) { return <div>  </div>}
    if(user){
      console.log("user" , user);
      return (
            <li>
              <a onClick={this.onLogoutClick}>
                  Logout
              </a>
            </li>
      )  
    } else {
      return (
        <div>
          <li>
            <Link to="/signup" >Signup</Link>
          </li>
          <li>
            <Link to="/login" >Login</Link>
          </li>      
        </div>
      )
    }
  }

  render() {  
      return (
        <nav>
          <div className="nav-wrapper">
          <Link
          to="/"
          className="brand-logo left"
          >
            Home
          </Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>       
          </div>
        </nav>
      );  
  }
}

export default graphql(mutation) (
  graphql(query) (Header)
);



