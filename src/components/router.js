import React from 'react';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import Auth  from './Auth';
import Client from './Client';
import Hall from './Client/Hall';
import Payment from './Client/Payment';
import Admin from './Admin'
import TicketController from './TicketController';




const App = () => {
    
    return(
        <BrowserRouter  >
            <Switch>
                <Route exact component={Client} path="/" />
                <Route exact component={Admin} path="/admin" />
                <Route exact component={TicketController} path="/controller" />
                <Route exact component={Auth} path="/login" />
                <Route exact component={Hall} path="/client/hall/:id" />
                <Route exact component={Payment} path="/payment/:id" />
                
            </Switch>
        </BrowserRouter>
    )
}


export default App;
  




