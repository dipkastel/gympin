import React, {useEffect} from 'react';
import Lottie from 'react-lottie';
import splash from './splash.json'
import "./Splash.css"
import {configs_getWebAppSplash} from "../../network/api/configs.api";
import {connect} from "react-redux";
import {settingActions} from "../../helper/redux/actions/SettingsActions";

const Splash = (props) => {
    console.log("hamin ke man migam ")
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: splash,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(() => {
            configs_getWebAppSplash(null).then(result=>{
                console.log(result)
                props.SetServerSettings(result.data.Data.Settings)
                setInterval(()=>{
                    props.onSplashComplete()
                },1000)
            }).catch(e=>console.log(e));
    }, []);

    return (
        <div className={"splashBody"}>
            <Lottie
                options={defaultOptions}
                height={400}
                width={400}>
            </Lottie>
        </div>
    );
};

export default connect(null, settingActions)(Splash)
