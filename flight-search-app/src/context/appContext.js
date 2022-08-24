import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

function AppContextProvider({ children }) {
    const startUrl = "http://localhost:8080/promotions/priceoffers/ond";
    const [flights, setFlights] = useState([]);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [resetData, setResetData] = useState(false);
    const [bestPrice, setBestPrice] = useState(null);

    const getFlightData = (origin, destination, departureDate, returnDate, bestPrice) => {
        setResetData(false);
        setOrigin(origin);
        setDestination(destination);
        setDepartureDate(departureDate);
        setReturnDate(returnDate);
        setBestPrice(bestPrice);
    }

    const resetFlightData = () => {
        setResetData(true);
        setOrigin('');
        setDestination( '');
        setDepartureDate(new Date());
        setReturnDate(new Date (new Date().setDate(new Date().getDate() + 1)));
    }

    useEffect(  () => {
        let url = `${startUrl}/${origin}/${destination}?departureDate=${departureDate}&returnDate=${returnDate}`

        if (bestPrice) {
            url = `${url}&service=amadeus${bestPrice}`;
        }
        axios.get(url).then(result => {
            setFlights(result.data.flights);
        }).catch(error => {
            console.log('Error', error.message);
        });
    }, [origin, destination, departureDate, returnDate, bestPrice]);

    const value = {
        flights,
        resetData,
        getFlightData,
        resetFlightData
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;