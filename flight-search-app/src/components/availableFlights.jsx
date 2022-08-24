import React from 'react';
import {useApp} from "../context/appContext";

const AvailableFlights = () => {
    let {flights} = useApp();

    const availableFlights = flights?.map((flight, index) => {
       return(
           <tr key={flight.uuid+index} >
               <td>{flight.origin}</td>
               <td>{flight.destination}</td>
               <td>{flight.departureDate}</td>
               <td>{flight.returnDate}</td>
               <td>{flight.price.amount} {flight.price.currency}</td>
               <td>{flight.seatAvailability} </td>
           </tr>
       );
    })

    return (
        flights.length > 0 ?
        <table
            className="table table-striped table-bordered text-center"
        >
            <thead>
            <tr key={'availableFlights'}>
                <th>Origin</th>
                <th>Destination</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Price</th>
                <th>Seat Available</th>
            </tr>
            </thead>
            <tbody>{availableFlights}</tbody>
        </table> : <h1 className="text-center"> Flights are not available</h1>
    )
}

export default AvailableFlights