import { Children, createContext, useContext, useEffect, useState } from "react";

const Con = createContext()
function Context({children}) {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹")
    useEffect(() => {
        if (currency === "INR") {
            setSymbol("₹")
        } else if (currency === "USD") {
            setSymbol("$")
        } else if (currency === "GBP") {
            setSymbol("£")
        } else if (currency === "EUR") {
            setSymbol("€")
        }
    }, [currency])
    return (
        <Con.Provider value = {{currency, symbol, setCurrency}}>
            {children}
        </Con.Provider>
    )
}

export default Context;

export const CryptoState = () => {
    return useContext(Con)
}