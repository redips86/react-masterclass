import {useLocation, useParams} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";

const Loader = styled.span`
  text-align: center;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.accentColor}
`;

export interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    isNew: boolean;
    isActive: boolean;
    type: string;
    tags: Tag[];
    team: Team[];
    description: string;
    message: string;
    openSource: boolean;
    startedAt: Date;
    developmentStatus: string;
    hardwareWallet: boolean;
    proofType: string;
    orgStructure: string;
    hashAlgorithm: string;
    links: Links;
    linksExtended: LinksExtended[];
    whitepaper: Whitepaper;
    firstDataAt: Date;
    lastDataAt: Date;
}

export interface Links {
    explorer: string[];
    facebook: string[];
    reddit: string[];
    sourceCode: string[];
    website: string[];
    youtube: string[];
}

export interface LinksExtended {
    url: string;
    type: string;
    stats?: Stats;
}

export interface Stats {
    subscribers?: number;
    contributors?: number;
    stars?: number;
    followers?: number;
}

export interface Tag {
    id: string;
    name: string;
    coinCounter: number;
    icoCounter: number;
}

export interface Team {
    id: string;
    name: string;
    position: string;
}

export interface Whitepaper {
    link: string;
    thumbnail: string;
}

interface RouteParams {
    coinId: string;
}


interface LocationParams {
    state: {
        name: string;
    }
}

export interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulatingSupply: number;
    totalSupply: number;
    maxSupply: number;
    betaValue: number;
    firstDataAt: Date;
    lastUpdated: Date;
    quotes: Quotes;
}

export interface Quotes {
    usd: Usd;
}

export interface Usd {
    price: number;
    volume24H: number;
    volume24HChange24H: number;
    marketCap: number;
    marketCapChange24H: number;
    percentChange15M: number;
    percentChange30M: number;
    percentChange1H: number;
    percentChange6H: number;
    percentChange12H: number;
    percentChange24H: number;
    percentChange7D: number;
    percentChange30D: number;
    percentChange1Y: number;
    athPrice: number;
    athDate: Date;
    percentFromPriceAth: number;
}


function Coin() {
    const {coinId} = useParams<keyof RouteParams>() as RouteParams;
    const [loading, setLoading] = useState<boolean>(true);
    const [info, setInfo] = useState<InfoData>();
    const [price, setPrice] = useState<PriceData>();
    const {state} = useLocation() as LocationParams;

    useEffect(() => {
        (async () => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            setInfo(infoData);
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setPrice(priceData);
        })();
    }, [])

    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading"}</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : <span>{price?.quotes.usd.price}</span>}
        </Container>
    );
};

export default Coin;