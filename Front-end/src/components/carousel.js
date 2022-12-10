import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { CryptoState } from "../context";
import {TrendingCoins} from "../api";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
const useStyles = makeStyles(() => ({
    carousel: {
        height: "90%",
        display: "flex",
        alignItems: "center",
    }, carouselItem: {
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
    }
}));
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
function Carousel() {
    const classes = useStyles();
    const [trending, setTrending] = useState([])
    const {currency, symbol} = CryptoState()
    const gettrendingCoins = async () => {
        const {data} = await axios.get(TrendingCoins(currency))
        setTrending(data);
    }
    useEffect(() => {
        gettrendingCoins();
    }, [currency]);
    const Items = trending.map((coin) => {
        var profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link className={classes.carouselItem}
            to={`/coins/${coin.id}`}>
                <img 
                    src={coin?.image}
                    alt={coin.name}
                    heigh="80"
                    style = {{marginBottom: 10}}
                />
                <span>
                {coin?.symbol}
                &nbsp;
                <span style={{
              color: profit > 0 ? "green" : "red",
              fontWeight: 500,
            }}>
                {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
                </span>
                <span style={{fontSize:22, fontWeight:500}}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })
    const resp = {
        0 : {
            items: 2
        }, 
        512: {
            items:4
        }
    };
    return (
        <div className={classes.carousel}>
        <AliceCarousel 
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={resp}
            autoPlay
            items={Items}
        />
        </div>
    )
}

export default Carousel;