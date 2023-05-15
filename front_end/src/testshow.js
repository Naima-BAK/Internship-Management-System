import React from 'react';
import axios from 'axios';

export default function testshow() {

    const options = {
        method: 'GET',
        url: 'https://restcountries-v1.p.rapidapi.com/name/norge',
        headers: {
            'X-RapidAPI-Key': '3facbc1b40msha35145a6fe13453p184301jsnd7e6e32b6fd8',
            'X-RapidAPI-Host': 'restcountries-v1.p.rapidapi.com'
        }
    };

    try {
        const response = axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
    return (
        <div>
        </div>
    )
}
