"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./Button";

const Logo = () => {

  return (
    <Link href="/" style={{ display: "block" }}>
        <Image 
            src="/images/logo.png"
            alt="Logo" 
            width={'50'}
            height={'50'} 
            className="relative" 
        />
    </Link>
  )
};
export default Logo;