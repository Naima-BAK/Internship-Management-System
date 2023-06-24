import axios from 'axios';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { MdSchool } from 'react-icons/md';

export default function Colors() {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
    };
    const circleStyle = {
        width: '30px',
        height: '30px',
        margin: '10px',
        borderRadius: '50%',
    };
    const blackStyle = {
        ...circleStyle,
        backgroundColor: 'black',
    };
    const whiteStyle = {
        ...circleStyle,
        backgroundColor: 'white',
        border: '1px solid black',
    };
    const blueLightStyle = {
        ...circleStyle,
        backgroundColor: '#ADD8E6',
    };
    const grayStyle = {
        ...circleStyle,
        backgroundColor: '#87AE73',
    };
    const purpleStyle = {
        ...circleStyle,
        backgroundColor: 'purple',
    };
    const [colors, setColors] = useState([]);

    useEffect(() => {
        axios.get(`/api/view_colors_student/2`)
            .then(res => {
                if (res.data.status === 200) {
                    setColors(res.data.colors);
                } else if (res.data.status === 404) {
                    Swal.fire("Error", res.data.message, "error");
                }
            });
    }, []);

    const changeColorToBlack = (e) => {
        e.preventDefault();
        const inputElement = document.getElementById('black');
        const inputValue = inputElement.value;
        console.log('Input value:', inputValue);
        axios.post('/api/update_colors_student', { colorChosen: inputValue })
            .then(response => {
                if (response.status === 200) {
                    swal(response.data.message);
                    window.location.reload();

                }
            })
            .catch(error => {
                console.log(error);
            });

    };
    const changeColorToWhite = (e) => {
        e.preventDefault();
        const inputElement = document.getElementById('white');
        const inputValue = inputElement.value;
        console.log('Input value:', inputValue);
        axios.post('/api/update_colors_student', { colorChosen: inputValue })
            .then(response => {
                if (response.status === 200) {
                    swal(response.data.message);
                    window.location.reload();

                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const changeColorToBlue = (e) => {
        e.preventDefault();
        const inputElement = document.getElementById('blue');
        const inputValue = inputElement.value;
        console.log('Input value:', inputValue);
        axios.post('/api/update_colors_student', { colorChosen: inputValue })
            .then(response => {
                if (response.status === 200) {
                    swal(response.data.message);
                    window.location.reload();

                }
            })
            .catch(error => {
                console.log(error);
            });
    };
    const changeColorToPurple = (e) => {
        e.preventDefault();
        const inputElement = document.getElementById('purple');
        const inputValue = inputElement.value;
        console.log('Input value:', inputValue);
        axios.post('/api/update_colors_student', { colorChosen: inputValue })
            .then(response => {
                if (response.status === 200) {
                    swal(response.data.message);
                    window.location.reload();

                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const changeColorToGreen = (e) => {
        e.preventDefault();
        const inputElement = document.getElementById('green');
        const inputValue = inputElement.value;
        console.log('Input value:', inputValue);
        axios.post('/api/update_colors_student', { colorChosen: inputValue })
            .then(response => {
                if (response.status === 200) {
                    swal(response.data.message);
                    window.location.reload();

                }
            })
            .catch(error => {
                console.log(error);
            });
    };
    const style = {
        fontFamily: 'Bangers, cursive',
        fontWeight: 'bold',
        fontSize: '18px',
    };

    return (
        <div className="tab-pane" id="notification">
            <h6 style={style}>
                <MdSchool size={24} color="orange" />
                Paramètres de couleurs
            </h6>
            <hr />

            <div className="form-group mb-0">
                <ul className="list-group list-group-sm">
                    <li className="list-group-item has-icon">
                        Choisissez une couleur
                        <div style={containerStyle}>
                            <form onSubmit={changeColorToBlack}>
                                <input id='black' type="hidden" name="black" value="black" />
                                <button type="submit" style={blackStyle}></button>
                            </form>
                            <form onSubmit={changeColorToWhite}>
                                <input id='white' type="hidden" name="white" value="white" />
                                <button type="submit" style={whiteStyle}></button>
                            </form>
                            <form onSubmit={changeColorToBlue}>
                                <input id='blue' type="hidden" name="blue" value='blue' />
                                <button type="submit" style={blueLightStyle}></button>
                            </form>
                            <form onSubmit={changeColorToGreen}>
                                <input id='green' type="hidden" name="green" value='green' />
                                <button type="submit" style={grayStyle}></button>
                            </form>
                            <form onSubmit={changeColorToPurple}>
                                <input id='purple' type="hidden" name="purple" value='purple' />
                                <button type="submit" style={purpleStyle}></button>
                            </form>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}