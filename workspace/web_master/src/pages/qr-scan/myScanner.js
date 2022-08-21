import React, { Component } from 'react';
import jsQR from 'jsqr';
import {Card} from "@mui/material";
const {
    requestAnimationFrame
} = global;

class QRScan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notEnabled: true,
            loading: true,
            video: null
        };
    }

    componentDidMount() {
        const video = document.createElement('video');
        const canvasElement = document.getElementById('qrCanvas');
        const canvas = canvasElement.getContext('2d');
        this.setState({
            video
        });
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment'
            }
        }).then(function (stream) {
            video.srcObject = stream;
            video.setAttribute('playsinline', true);
            video.play();
            requestAnimationFrame(tick);
        });

        const tick = () => {
            if (this.state.notEnabled) this.setState({
                notEnabled: false
            });

            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                if (this.state.loading) this.setState({
                    loading: false
                });
                canvasElement.height = video.videoHeight;
                canvasElement.width = video.videoWidth;
                canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                var code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: 'dontInvert'
                });

                if (code) {
                    this.props.onFind(code.data);
                }
            }

            requestAnimationFrame(tick);
        };
    }

    componentWillUnmount() {
        this.state.video.pause();
    }

    render() {
        let message;

        if (this.state.notEnabled) {
            message = React.createElement("div", null, React.createElement("span", {
                role: "img",
                "aria-label": "camera"
            }, ""), " خطا در اتصال به دوربین (لطفا سلامت دوربین دستگاه خود را بررسی نمایید)");
        } else if (this.state.loading) {
            message = React.createElement("div", null, React.createElement("span", {
                role: "img",
                "aria-label": "time"
            }, ""), "در حال اتصال به دوربین");
        }



        return (
            <Card elevation={3} sx={{
                margin: 2,
                height: "66vw"
            }}>
                {React.createElement("div", null, message, React.createElement("canvas", {
                    id: "qrCanvas"
                }))}
            </Card>
            );
    }

}

export default QRScan;
