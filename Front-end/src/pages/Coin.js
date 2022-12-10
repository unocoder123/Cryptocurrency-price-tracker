import { makeStyles, Typography, LinearProgress } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import { SingleCoin } from '../api';
import Coininfo from '../components/Coininfo';
import { CryptoState } from "../context";
import parse from 'html-react-parser';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Coin() {
    const {id} = useParams();
    const[coin, Setcoin] = useState();
    const {currency, symbol} = CryptoState();
    const getcoin = async () => {
        const {data} = await axios.get(SingleCoin(id));
        Setcoin(data)
    }

    useEffect(() => {
        getcoin();
    }, [currency])

    const useStyles = makeStyles((theme) => ({
        container: {
          display: "flex",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
          },
        },
        side: {
          width: "30%",
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 25,
          borderRight: "2px solid grey",
        },
        heading: {
          fontWeight: "bold",
          marginBottom: 20,
          fontFamily: "Montserrat",
        },
        des: {
          width: "100%",
          fontFamily: "Montserrat",
          padding: 25,
          paddingBottom: 15,
          paddingTop: 0,
          textAlign: "justify",
        },
        data: {
          alignSelf: "start",
          padding: 15,
          paddingTop: 10,
          width: "100%",
          [theme.breakpoints.down("md")]: {
            display: "flex",
            justifyContent: "space-around",
          },
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
          },
          [theme.breakpoints.down("xs")]: {
            alignItems: "start",
          },
        },
      }));

    const classes = useStyles();
    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
    return (
        <div className={classes.container}>
            <div className={classes.side}>
            <img src = {coin?.image.large} alt = {coin?.name} height = "200" style = {{marginBottom: 20}}/>
            <Typography variant='h3' className={classes.heading}>
                {coin?.name}
            </Typography>
            <Typography variant='subtitile1' className={classes.des}>
            {parse(coin?.description.en.split(". ")[0])}.
            </Typography>
            <div className={classes.data}>
              <span style = {{display: "flex"}}>
                <Typography variant='h5' className={classes.heading}>
                  Rank: 
                </Typography>
                &nbsp; &nbsp;
              <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
              >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
              </span>
              <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
            </div>
            </div>
            <Coininfo coin = {coin}/>
        </div>
    )
}

export default Coin;