import React from "react";

import {auth} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
const SaveNotification = (props: {gameToSave: any, gameIsSaved: boolean}) => {
    const [user] = useAuthState(auth);

    const signInGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result) => {
            console.log(result);
        }
        ).catch((error) => {
            console.log(error);
        }
        );
    }
    let resultString = props.gameToSave.result === 1 ? 'You won!' : props.gameToSave.result === 0 ? 'It was a draw.' : 'You lost.';
    return (
        <div className="w-[min(90vw,90vh)] md:w-[min(60vw,60vh)] mx-auto my-4">
            <div className="bg-green-500 text-white p-4 rounded shadow-md flex flex-row justify-between items-center">
                <div className="flex flex-col justify-center items-center gap-1 flex-1">
                    <h1 className="text-lg font-semibold">{resultString}</h1>
                    <p className="text-sm">You played as {props.gameToSave.playingAs}</p>
                    <p className="text-sm">{props.gameToSave.black} - {props.gameToSave.white}</p>
                    <p className="text-sm">Level: {props.gameToSave.level}</p>
                </div>
                <div className="flex flex-row justify-center items-center text-center gap-1 flex-1">
                    {(user || props.gameIsSaved)&& <p className="text-sm">The game has been saved!</p>}
                    {!user && !props.gameIsSaved && 
                    <div className="flex flex-col items-center justify-center gap-1">
                        <p className="text-sm">You can save this game by logging in through Google.</p>
                        <button onClick={signInGoogle} className="bg-green-900 text-white px-4 py-2 rounded">Login to save</button>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SaveNotification;