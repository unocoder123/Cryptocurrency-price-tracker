import { AppBar, Container, createTheme, makeStyles, Menu, MenuItem, Select, ThemeProvider, Toolbar, Typography} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../context";

function Header() {
    const useStyles = makeStyles(() => ({
        head: {
            flex: 1,
            color: "gold",
            fontFamily: "Montserrat",
            fontWeight:"bold",
            cursor: "pointer",
        }, 
        predictor: {
            color: "gold",
            fontFamily: "Montserrat",
            fontWeight:"bold",
            cursor: "pointer",
            marginRight: 30,
        }
    }))

    const classes = useStyles();
    const navigate = useNavigate();
    const {currency, setCurrency} = CryptoState();
    return (
        <AppBar color='primary' position="static">
        <Container>
            <Toolbar>
                <Typography onClick = {() => {
                    navigate("/")
                }}className = {classes.head} variant="h6">CryptoAlpha</Typography>

                <Select variant="outlined" style={{
                    width:100,
                    height:40,
                    marginRight: 5,
                }} value = {currency}
                onChange = {(e) => setCurrency(e.target.value)}
                >
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value = {"INR"}>INR</MenuItem>
                    <MenuItem value = {"GBP"}>GBP</MenuItem>
                    <MenuItem value = {"EUR"}>EUR</MenuItem>
                </Select>
            </Toolbar>
        </Container>
        </AppBar>
    )
}

export default Header;