import React, {useState, forwardRef, useImperativeHandle, useEffect} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useApp} from "../context/appContext";

const DatePick = forwardRef((props, ref) => {
    const [date, setDate] = useState(props.date);
    const {resetData} = useApp();

   const handleChangeDate = selectedDate => {
        if (!selectedDate) {
            selectedDate = props.date;
        }
        setDate(selectedDate);
    };

    useImperativeHandle(ref, () => ({
        selectedDate() {
            const newDate = date?.toISOString().slice(0,10);
            return newDate;
        }
    }));

    useEffect(()=> {
        if(resetData) setDate(props.date);
    }, [resetData]);

    return (
        <>
            <DatePicker
                readonly="readonly"
                selected={date}
                onChange={e => handleChangeDate(e)}
                className="form-control text-center"
                monthNames={[
                    "Januar",
                    "Februar",
                    "März",
                    "April",
                    "Mai",
                    "Juni",
                    "Juli",
                    "August",
                    "September",
                    "Oktober",
                    "November",
                    "Dezember"
                ]}
                monthNamesShort={[
                    "Jan",
                    "Feb",
                    "Mär",
                    "Apr",
                    "Mai",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Okt",
                    "Nov",
                    "Dez"
                ]}
                dayNames={[
                    "Sonntag",
                    "Montag",
                    "Dienstag",
                    "Mittwoch",
                    "Donnerstag",
                    "Freitag",
                    "Samstag"
                ]}
                dayNamesShort={["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]}
                dayNamesMin={["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]}
                dateFormat="dd.MM.yyyy" // German date Format
                minDate={props.minDate}
            />
        </>

    );
});


export default DatePick;