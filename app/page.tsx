'use client'
import Image from "next/image";
import ReactPlayer from "react-player";
import VideoPlayer from "./components/VideoPlayer";
import Link from "next/link";

export default function Home() {

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col justify-center items-center md:w-full">
        <div className="w-full flex items-center justify-center bg-green-900">
          <VideoPlayer />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center px-10">
          <h1 className="text-4xl text-center mt-20">Welcome to Othello</h1>
          <p className="text-center mt-4">Master your Othello skills by playing against an AI with different levels of difficulty
          and track your progress by signing in through Google.
          </p>
          <Link href="/game">
            <button 
              className="bg-green-900 text-white px-4 py-2 rounded mt-4"
            >Play Now</button>
          </Link>
      </div>
    </div>
  );
}
