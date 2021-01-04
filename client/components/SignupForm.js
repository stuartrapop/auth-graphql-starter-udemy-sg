import React, { Component } from  'react';
import {graphql} from 'react-apollo';
import { hashHistory } from 'react-router';



import AuthForm from './AuthForm';

import mutation from '../mutations/Signup';

import query from '../queries/CurrentUser';


class SignupForm extends Component {

  constructor(props) {
    super(props);

    this.state = {errors : []}
  }

  componentWillUpdate(nextProps){

    this.props;
    nextProps;

    console.log(this.props, nextProps)

    if(!this.props.data.user && nextProps.data.user){
      hashHistory.push('/dashboard');
    }

  }

  onSubmit({email, password}) {
    this.props.mutate({
      variables: {email, password},
      refetchQueries : [{query}]
    })
    .catch(res =>{
      const errors = res.graphQLErrors.map(error => error.message);
      console.log("error in catch", errors);
      this.setState({ errors });
    })
  }

  render() {
    return (
      <div>
         <h3>Sign Up</h3>
        <AuthForm onSubmit ={this.onSubmit.bind(this)} errors={this.state.errors}/>
      </div>
     

    );
  }
}

export default graphql(query)
(graphql(mutation) (SignupForm));