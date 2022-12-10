import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./carousel";


const useStyles = makeStyles(()=> ({
    banner: {
        backgroundImage: "url(./banner.jpg)", 
    },
    bannerinfo: {
        height: 500,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    }, text: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "Center"
    }
}));

function Banner() {
    const classes = useStyles();
    return <div className={classes.banner}>
    <Container className={classes.bannerinfo}>
    <div className={classes.text}>
    <Typography variant = "h2" style = {{
        fontWeight: "bold",
        marginBottom: 15,
        fontFamily: "Montserrat"
    }}>
    CryptoAlpha
    </Typography>
    <Typography variant="subtitile2" style={{
        color: "darkcyan",
        textTransform: "capitalize",
        fontFamily: "Montserrat"
    }}>
    The only website you will need for Cryptocurrency price tracking and prediction.
    </Typography>
    </div>
    <Carousel />
    </Container>
    </div>
}

export default Banner;