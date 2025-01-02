import React, {useEffect, useRef, useState} from 'react';
import {Card, Container} from "@mui/material";
import {PlayCircle} from "@mui/icons-material";

const _video = () => {

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setTimeout(()=>{
                videoRef.current.play();
            },100)
            setIsPlaying(true);
        }
    }



    return (
        <section>
            <Container>
                <div className={"video-box"}>
                    <Card sx={{mt: 5,mb:12, borderRadius: 5}} elevation={10}>
                        <video className={"video"} onClick={(e) => handlePlay()} poster="/assets/images/thumb1.jpg"
                               ref={videoRef} height={"100%"} width={"100%"} type="video/mp4"
                               controls={isPlaying}
                               playsInline>
                            <source src="/assets/videos/gympin-corporate.mp4" type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    </Card>
                </div>
            </Container>
        </section>
    );
};

export default _video;
