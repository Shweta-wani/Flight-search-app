import React, {useEffect, useState, forwardRef, useImperativeHandle} from 'react'
import axios from "axios";
import '../css/styles.css';
import { useApp } from "../context/appContext";

const SelectedCity = forwardRef((props, ref) => {
    const {resetData} = useApp();
    const [cities, setCities] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [cityCode, setCityCode] = useState(props.cityCode ?? '');
    let showError = props.showError;
    const url = "http://localhost:8080/city";

    useImperativeHandle(ref, ()=> ({
        selectedCityCode() {
            return cityCode;
        }
    }));

    const getCity = async () => {
        await axios.get(url).then(result => {
            let cities = []
            result.data.cities?.forEach(city => {
                cities.push({
                    name: city.name,
                    code: city.code
                })
            });
            setCities(cities);
        }).catch(error => {
            console.log('Error', error.message);
        });
    }

    useEffect( () => {
         getCity();
    }, []);

    useEffect(() => {
        if(resetData) {
            setCityCode('');
        };
    }, [resetData]);

    const renderSuggestions = suggestions.length > 0 ? suggestions?.map((city, index) => {
        return (
            <li
                key={city[1]+index}
                onClick={() => suggestionSelected(city[0], city[1])}
            >
                {city[0]} {city[1]}
            </li>
        )}) : null;

    const suggestionSelected = (name, code) => {
        setCityCode(code);
        setSuggestions([]);
    };

    const onFocus = e => {
        setSuggestions([]);
        e.target.select();
    };

    const onTextChanged = e => {
        const text = e.target.value;
        let suggestionsArray = [];
        if (text.length > 0) {
            const regx = new RegExp(`^${text}`, "i");
            suggestionsArray = cities?.map((city, i) => [city.name, city.code])
                .sort()
                .filter(city => regx.test(city));
        }
        setSuggestions(suggestionsArray);
        setCityCode(text);
    };

    return (
        <>
            <input
                className="form-control text-center"
                type="text"
                placeholder={props.placeholder}
                onChange={e => onTextChanged(e)}
                value={cityCode}
                onClick={e => onFocus(e)}
            />
            {cityCode === '' && showError ? <p className="text-center text-danger">Please select city</p> :  null}
            {suggestions.length > 0 ?
                <ul className="col-12 p-1">
                    {renderSuggestions}
                </ul>
            : null }
        </>
    )
});

export default SelectedCity;