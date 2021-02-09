import React, { useEffect } from 'react'
import {
    Switch,
    Route,
  } from "react-router-dom";
 
  import '../style/page.css'
  import Home from './Home'
  import Add from './Add'
  import Account from './Account'
  import News from './News'


export default function Page() {


    return (
        <div className = 'allPage'>
          <Switch>
            <Route exact path = '/' component={Home} />
            <Route path  = '/account/:code'  component ={Account}/>
            <Route path  = '/add' component={Add}/>
            <Route path  = '/news' component={News}/>
          </Switch>
        </div>
    )
}
