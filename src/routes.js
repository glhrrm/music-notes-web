import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Search from './pages/Search'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Search} />
        {/* <Route path="/login" component={Login} />
        <Route path="/register" component={Register} /> */}
      </Switch>
    </BrowserRouter>
  )
}

export default Routes