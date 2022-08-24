import React, { useRef, useState} from 'react'
import { useApp } from "../context/appContext";
import SelectedCity from "./selectedCity";
import DatePick from "./datePick";
import AvailableFlights from "./availableFlights";
import {useNavigate, useParams} from "react-router";
import {useSearchParams} from "react-router-dom";

const FlightSearch = () => {
    const originCityRef = useRef(null);
    const destinationCityRef = useRef(null);
    const departureDateRef = useRef(null);
    const returnDateRef = useRef(null);

    const [checked, setChecked] = useState(false);
    const [originShowError, setOriginShowError] = useState(false);
    const [destinationShowError, setDestinationShowError] = useState(false);
    const {getFlightData, resetFlightData} = useApp();
    const navigate = useNavigate();

    const {origin, destination} = useParams();
    const [searchParams] = useSearchParams({departureDate: new Date(), returnDate: new Date (new Date().setDate(new Date().getDate() + 1))});

    const getData = () => {
        const originCityCode = originCityRef.current?.selectedCityCode();
        const destinationCityCode = destinationCityRef.current?.selectedCityCode();
        const departureDate = departureDateRef.current?.selectedDate();
        const returnDate = returnDateRef.current?.selectedDate();

        let url = `/${originCityCode}/${destinationCityCode}?departureDate=${departureDate}&returnDate=${returnDate}`;
        if (checked) url = `${url}&service=BestPrice`;

        if (originCityCode === '' ) setOriginShowError(true);
        if ( destinationCityCode === '') setDestinationShowError(true);

        if (originCityCode !== '' && destinationCityCode !== '') {
            navigate(url);
            return  getFlightData(originCityCode, destinationCityCode, departureDate, returnDate, checked ? "BestPrice" : null);
        }
    }

    const resetData = () => {
        setOriginShowError(false);
        setDestinationShowError(false);
        navigate("/")
        return resetFlightData();
    }

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center m-2">
                    <h2>Flight Search App</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <SelectedCity ref={originCityRef} placeholder="Select Origin" cityCode={origin} showError={originShowError}/>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <DatePick ref={departureDateRef} date={new Date(searchParams.get("departureDate"))} minDate={new Date()}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <SelectedCity ref={destinationCityRef} placeholder="Select Destination" cityCode={destination} showError={destinationShowError}/>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <DatePick ref={returnDateRef} date={new Date(searchParams.get("returnDate"))} minDate={new Date (new Date().setDate(new Date().getDate() + 1))}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 text-end m-2">
                    <label>
                        <input className="m-2" type="checkbox" value={checked} onChange={handleChange} />
                        Best Price
                    </label>
                    <button onClick={getData} className={"btn btn-sm btn-primary m-2"}>Search</button>
                    <button onClick={resetData} className="btn btn-sm btn-primary m-2">Reset</button>
                </div>
            </div>
            {new Date(searchParams.get('departureDate')) <= new Date(searchParams.get('returnDate')) ?
                <div className="row">
                    <div className="col-12 m-2">
                        <AvailableFlights/>
                    </div>
                </div> : <p className="text-center text-danger"> Departure date should be less than return date </p>
            }
        </div>
    )
}

export default FlightSearch;