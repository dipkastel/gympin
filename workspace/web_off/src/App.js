import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [mousePosition,setMousePosition] = useState({ x: null, y: null });

    useEffect(() => {

        const updateMousePosition = ev => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);


    return (
        <div className="App">
            <ul id="scene"
                data-friction-x="0.1"
                data-friction-y="0.1"
                data-scalar-x="25"
                data-scalar-y="15"
                data-limit-y="50"
                className="scene">
                <li className="layer" data-depth="0.40">
                    <div className="content">
                        <h1 className={"center"} id="title">شما شایسته امکانات جدید و بروز هستید</h1>
                        <p  className={"center"}>اکنون سایت در حال بروز رسانی است!</p>
                        <p  className={"center"}>تا دقایقی دیگر برمیگردیم.</p>
                        <h3  className={"center"} id="title">از صبوری شما سپاسگزاریم.</h3>
                    </div>
                </li>
                <li className="layer" data-depth="1.00">
                    <div className="footer"></div>
                </li>
                <li className="layer" data-depth="0.65">
                    <div style={{left:mousePosition.x/8-100,marginTop:mousePosition.y/8}} className="cloud-back">
                        <img src="/assets/images/rocket_cloud_back.svg"
                             alt="Site Launching Soon!"/>
                    </div>
                </li>
                <li className="layer" data-depth="0.70">
                    <div style={{left:mousePosition.x/14-100,marginTop:mousePosition.y/14}} className="rocket">
                        <img src="/assets/images/rocket.svg"
                             alt="Site Launching Soon!"/>
                    </div>
                </li>
                <li className="layer" data-depth="0.75">
                    <div style={{left:mousePosition.x/10-100,marginTop:mousePosition.y/12}} className="cloud-front">
                        <img src="/assets/images/rocket_cloud_front.svg"
                             alt="Site Launching Soon!"/>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default App;
