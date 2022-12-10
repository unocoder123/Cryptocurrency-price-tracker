import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../api"
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import MyButton from "./Button";
import { CryptoState } from "../context";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const CoinInfo = ({ coin }) => {
        const chartDays = [
        {
          label: "24 Hours",
          value: 1,
        },
        {
          label: "30 Days",
          value: 30,
        },
        {
          label: "3 Months",
          value: 90,
        },
        {
          label: "1 Year",
          value: 365,
        },
      ];
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [graph,setgraph] = useState(false);
  const [predictdata, Setpredictdata] = useState();
  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();
  const getData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    const url2 = 'http://localhost:8000/?coin='+ coin.id+ '&currency='+currency;
    const results1 = await axios.get(url2) 
    const {results} = results1.data
    Setpredictdata(results)
    setgraph(true);
    setHistoricData(data.prices);
  };

  
  useEffect(() => {
    getData();
  }, [days, currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  var data = null;
  var data2 = null;
  if (historicData) {
  data = {
    labels: historicData.map((item) => {
              let date = new Date(item[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
                      {
                        data: historicData.map((item) => item[1]),
                        label: `Price ( Past ${days} Days ) in ${currency}`,
                        borderColor: "#EEBC1D",
                      },
                    ]    
}
  }
  if (predictdata) {
    data2 = {
      labels: predictdata.map((item) => {
        let date = new Date(item[0]);
        return date.toLocaleDateString();
      }),
      datasets: [
                {
                  data: predictdata.map((item) => item[1]),
                  label: `Price Prediction ( Next 30 Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ]   
    }
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData | graph===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
          
            <Line data={data}  options={{
                        elements: {
                            point: {
                            radius: 1,
                            },
                         },
                        }}/>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <MyButton
                  key={day.value}
                  onclick={() => {setDays(day.value);
                    setgraph(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </MyButton>
              ))}
            </div>
            <div style={{
                display: "flex",
                marginTop: 55,
                justifyContent: "space-around",
                width: "100%",
              }}>
            <Line data={data2}  options={{
                        elements: {
                            point: {
                            radius: 1,
                            },
                         },
                        }}/>
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;