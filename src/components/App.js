import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import { useState } from "react";

import LogIn from "./LogIn.js";
import SignUp from "./SignUp.js";
import HomePage from "./HomePage.js";
import NewEntryIn from "./NewEntryIn.js";
import NewEntryOut from "./NewEntryOut.js";

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
                    <Route path="/new-entry/in" exact>
                        <NewEntryIn />
                    </Route>
                    <Route path="/new-entry/out" exact>
                        <NewEntryOut />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )
}