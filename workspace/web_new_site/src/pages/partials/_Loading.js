import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from "./1234.json"

const _Loading = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (

        <div className="loader-container">
            <div className={"center"}>
                <Lottie options={defaultOptions}
                        height={200}
                        width={200}/>
            </div>
        </div>
    );
};


export default _Loading;
