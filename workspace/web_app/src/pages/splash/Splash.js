import React, {useContext, useEffect} from 'react';
import Lottie from 'react-lottie';
import splash from './splash.json'
import "./Splash.css"
import {configs_getWebAppSplash} from "../../network/api/configs.api";
import {connect} from "react-redux";
import {settingActions} from "../../helper/redux/actions/SettingsActions";
import {ErrorContext} from "../../components/GympinPagesProvider";

const Splash = (props) => {
    const error = useContext(ErrorContext);
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
                props.SetServerSettings(result.data.Data.Settings)
                setInterval(()=>{
                    props.onSplashComplete()
                },1000)
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
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
