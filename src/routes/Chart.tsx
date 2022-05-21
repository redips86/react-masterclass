import {useOutletContext} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api/api";
import ApexChart from "react-apexcharts";

export interface IHistorical {
    time_open: Date;
    time_close: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface IThemeMode {
    isDark: boolean;
}


function Chart({isDark}: IThemeMode) {
    const coinId = useOutletContext<string>();
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
        {refetchInterval: 10000}
    );

    return (
        <div>{
            isLoading
                ? "Loading chart..." :
                <ApexChart options={{
                    theme: {mode: isDark ? 'dark' : 'light',},
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
                        labels: {show: false, datetimeFormatter: {month: "mmm 'yy'"}},
                        type: "datetime",
                        categories: data?.map((price) => price.time_close),
                    },
                    stroke: {
                        curve: "smooth",
                        width: 2
                    },
                    fill: {
                        type: "gradient",
                        gradient: {gradientToColors: ["#0be881"], stops: [0, 100]}
                    },
                    colors: ["0fbcf9"],
                    tooltip: {
                        y: {
                            formatter: (value) => `$${value.toFixed(2)}`
                        }
                    }
                }} type="line"
                           series={[{name: "Price", data: data?.map(price => price.close) as number[],},
                           ]}></ApexChart>
        }</div>
    );
}

export default Chart;