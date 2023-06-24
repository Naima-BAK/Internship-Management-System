// erros :  page 403  => you are note admin.
import React from 'react';
import './403.css';

function Page_403() {
    return (

        <div className='bodyy'>

            <div className="scene">
                <div className="overlay"></div>
                <div className="overlay"></div>
                <div className="overlay"></div>
                <div className="overlay"></div>
                <span className="bg-403">403</span>
                <div className="text">
                    <span className="hero-text"></span>
                    <span className="msg">Accès refusé !  <span>vous n'êtes pas</span> un administrateur.</span>
                    <span className="support">
                        <a href="/login" >Go Home</a>
                    </span>
                </div>
                <div className="lock"></div>
            </div>
        </div>
    );
}

export default Page_403;
