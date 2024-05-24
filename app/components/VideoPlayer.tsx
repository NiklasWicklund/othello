'use client'
import React from "react";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
const VideoPlayer = () => {

    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
        setHasWindow(true);
        }
    }, []);

    return (
        <div className="w-full md:max-w-[400px]">
            {hasWindow &&<ReactPlayer 
                url={'./videos/gameplay2.mp4'} 
                width={'100%'}
                height={'auto'}
                playing={true} 
                loop={true} 
                muted={true} 
            />}
        </div>
    );
}

export default VideoPlayer;