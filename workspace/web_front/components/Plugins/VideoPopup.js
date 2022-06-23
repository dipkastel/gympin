import React from 'react'


export default function VideoPopUp({setShow, src}) {
    return (
        <>
        
        <div className="mfp-bg mfp-ready"></div>
            <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready" tabIndex="-1" style={{"overflow": "hidden auto;"}}>
                <div className="mfp-container mfp-s-ready mfp-iframe-holder">
                    <div className="mfp-content">
                        <div className="mfp-iframe-scaler">
                            <button title="Close (Esc)" type="button" className="mfp-close" onClick={()=>setShow()}>×</button>
                            <iframe className="mfp-iframe" src={src} frameBorder="0" allowFullScreen=""></iframe>
                        </div>
                    </div>
                    <div className="mfp-preloader">Loading...</div>
                </div>
            </div>

            
        </>
    )
}
