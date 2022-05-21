import {useOutletContext} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api/api";
import ApexChart from "react-apexcharts";

export interface IHistorical {
    timeOpen: Date;
    timeClose: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    marketCap: number;
}


function Chart() {
    const coinId = useOutletContext<string>();
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));

    return (
        <div>{
            isLoading
                ? "Loading chart..." :
                <ApexChart options={{
                    theme: {mode: 'dark',},
                    chart: {
                        height: 300,
                        width: 500,
                        toolbar: {
                            show: false,
                        },
                        background: "transparent"
                    },
                    grid: {
                        show: false,
                    },
                    yaxis: {
                        show: false,
                    },
                    xaxis: {
                        axisBorder: {show: false},
                        axisTicks: {show: false},
                        labels: {show: false}
                    },
                    stroke: {
                        curve: "smooth",
                        width: 2
                    },
                }}
                           type="line" series={[{name: "Price", data: data?.map(price => price.close) as number[],},
                ]}></ApexChart>
        }</div>
    );
}

export default Chart;