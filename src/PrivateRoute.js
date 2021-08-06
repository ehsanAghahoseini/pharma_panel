import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Redirect} from 'react-router-dom'



export const PrivateRoute = ({component :Component, ...rest}) => (

    <Route 
    {...rest}
    render={props =>
      localStorage.getItem("username") && localStorage.getItem("password") ? (
        <Component {...props} />
      ) : (
        <Redirect 
        to={{
          pathname:"/",
          state : {from : props.location}
        }}
        />
      )

    }

  />  

)

export default PrivateRoute;