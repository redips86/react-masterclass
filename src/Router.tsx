import {BrowserRouter, Route, Routes} from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

interface IRouterProps {
    toggleDark: () => void;
    isDark: boolean;
}

const Router = ({toggleDark, isDark}: IRouterProps) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/:coinId"} element={<Coin/>}>
                    <Route path={"chart"} element={<Chart isDark={isDark}/>}/>
                    <Route path={"price"} element={<Price/>}/>
                </Route>
                <Route path={"/"} element={<Coins toggleDark={toggleDark}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;