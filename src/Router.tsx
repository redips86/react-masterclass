import {BrowserRouter, Route, Switch} from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/:coinId"}>
                    <Coin></Coin>
                </Route>
                <Route path={"/"}>
                    <Coins></Coins>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;