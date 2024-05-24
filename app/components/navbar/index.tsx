'use client';
import React, { useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo"
import Button from "./Button";
import Image from "next/image";
import { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth} from '../../firebase';
import { GoogleAuthProvider ,signInWithPopup} from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);

  const [isOpen, setIsOpen] = useState(false);

  const getMenuStyle = () => {
    if (isOpen) {
      return [
        "z-50",
        "flex",
        "absolute",
        "top-[80px]",
        "left-0",
        "bg-emerald-600",
        "w-full",
        "p-5",
        "gap-5",
        "flex-col",
        
      ].join(" ");
    }
    else {
      return [
        "hidden",
        "md:flex",
        "md:gap-5",
        "md:items-center",
        "text-white",
      ].join(" ");
    }
  }
      
  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider);
    setIsOpen(false);
  }
  const signOut = () => {
    auth.signOut();
    setIsOpen(false);
  }
  return (
    <>
      <div className="w-full h-20 bg-emerald-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex flex-row items-center">
              <Link href="/" style={{ display: "block" }}>
                  <Image 
                      src="/images/logo.png"
                      alt="Logo" 
                      width={'50'}
                      height={'50'} 
                      className="relative" 
                  />
              </Link>
              {user && <p className="text-white pl-10">Hi {user.displayName}</p>}
            </div>
            
            <ul className= {getMenuStyle()}
            >
                <li>
                    <Link href="/game" onClick={() => setIsOpen(false)}>
                    <p>Game</p>
                    </Link>
                </li>
                <li>
                    <Link href="/leaderboard" onClick={() => setIsOpen(false)}>
                    <p>Leaderboard</p>
                    </Link>
                </li>
                <li>
                    <Link href="/about" onClick={() => setIsOpen(false)}>
                    <p>About Us</p>
                    </Link>
                </li>
                <hr/>
                <li>
                    {user ? (
                      <button onClick={signOut}>
                        <p>Sign out</p>
                      </button>
                    ) : (
                      <button onClick={() => {signInGoogle()}}>
                        <p>Sign in</p>
                      </button>
                    )
                    }
                    
                </li>
            </ul>
            <div className="md:hidden flex items-center">
                <button onClick={() =>{setIsOpen(!isOpen)}}>
                    {!isOpen ? (
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                      >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h16m-7 6h7"
                          />
                      </svg>
                    ) : (
                      // Should be a cross icon for close
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                      >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                          />
                      </svg>
                    )
                    }
                    
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;