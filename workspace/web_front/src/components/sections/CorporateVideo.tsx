"use client";

import {JSX, useRef, useState} from "react";

import { Card, Container } from "@mui/material";

export default function CorporateVideo(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] =
    useState<boolean>(false);

  const handlePlay = (): void => {
    if (!videoRef.current) {
      return;
    }

    if (isPlaying) {
      void videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      void videoRef?.current?.play();

      setTimeout(() => {
        void videoRef?.current?.play();
      }, 100);

      setIsPlaying(true);
    }
  };

  return (
    <section>
      <Container>
        <div className="video-box">
          <Card
            elevation={10}
            sx={{
              mt: 5,
              mb: 12,
              borderRadius: 3,
            }}
          >
            <video
              ref={videoRef}
              className="video"
              poster="/images/thumb1.jpg"
              width="100%"
              height="100%"
              controls={isPlaying}
              playsInline
              aria-label="ویدیوی معرفی جیم پین برای سازمان‌ها"
              onClick={handlePlay}
            >
              <source
                src="/videos/gympin-corporate.mp4"
                type="video/mp4"
              />

              مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
            </video>
          </Card>
        </div>
      </Container>
    </section>
  );
}
