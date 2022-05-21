import {useOutletContext} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api/api";


function Chart() {
    const coinId = useOutletContext<string>();
    const {isLoading, data} = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId));

    return (
        <h1>Chart </h1>
    );
}

export default Chart;