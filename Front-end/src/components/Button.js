import {makeStyles} from '@material-ui/core'
const  MyButton= ({children, selected, onclick}) => {
    const useStyles = makeStyles({
        button: {
          border: "1px solid gold",
          borderRadius: 5,
          padding: 10,
          paddingLeft: 20,
          paddingRight: 20,
          fontFamily: "Montserrat",
          cursor: "pointer",
          backgroundColor: selected ? "gold" : "",
          color: selected ? "black" : "",
          fontWeight: selected ? 700 : 500,
          "&:hover": {
            backgroundColor: "gold",
            color: "black",
          },
          width: "22%",
          margin: 10,
        },
      });
      const classes = useStyles();
    return (
        <span onClick = {onclick} className={classes.button}>
            {children}
        </span>
    )
}

export default MyButton;