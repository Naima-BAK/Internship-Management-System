// Error : Page not found

import React from 'react';
import './403.css';

export default function PageNotFound() {

    return (

        <div className='bodyy'>

            <div className="scene">
                <div className="overlay"></div>
                <div className="overlay"></div>
                <div className="overlay"></div>
                <div className="overlay"></div>
                <span className="bg-403">404</span>
                <div className="text">
                    <span className="hero-text"></span>
                    <span className="msg">Oups ! <span>Page non </span>trouvée. </span>
                    <span className="support">
                        <span>  La page que vous recherchez n'existe pas.   </span>
                        <a href="/login" >Go Home</a>
                    </span>
                </div>
                <div className="lock"></div>
            </div>
        </div >
    )
}
