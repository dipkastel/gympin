import React, {useRef, useState} from 'react';
import {Card, Container} from "@mui/material";

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
        <section  data-aos="fade-up">
            <Container>
                <div className={"video-box"}>
                    <Card sx={{mt: 5,mb:12, borderRadius: 3}} elevation={10}>
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
