import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import { useState } from "react";

import LogIn from "./LogIn.js";
import SignUp from "./SignUp.js";
import HomePage from "./HomePage.js";

export default function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    return(
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <LogIn />
                    </Route>
                    <Route path="/signup" exact>
                        <SignUp />
                    </Route>
                    <Route path="/home" exact>
                        <HomePage />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )
}