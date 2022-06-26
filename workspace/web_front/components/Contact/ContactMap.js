import React from 'react'
import GoogleMap from '../Plugins/GoogleMap/GoogleMap'

export default function ContactMap() {
        return (
            <>
                {/* <!-- map area start --> */}
                <div className="contact-map-area">
                    <div id="contact-map">
                        <GoogleMap/>
                    </div>
                </div>
                {/* <!-- map area end -->    */}
            </>
        )
}
