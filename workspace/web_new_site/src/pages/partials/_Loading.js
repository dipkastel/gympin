import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from "./gympin-lott.json"

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
                        height={300}
                        width={300}/>
            </div>
        </div>
    );
};


export default _Loading;
