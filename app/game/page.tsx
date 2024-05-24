'use client';
import React, { use, useEffect } from "react";
import { useState } from "react";
import {auth, db} from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import SaveNotification from "./SaveNotification";
import GameMenu from "./GameMenu";
import Othello from "./Othello";
const Game = () => {

    const [playingAs, setPlayingAs] = useState<number | null>(null);
    const [level, setLevel] = useState(3);
    const [gameState, setGameState] = useState<any>(0); //0: lobby, 1: game running, 2: game over, waiting for new game
    const [finalStats, setFinalStats] = useState<any>(null);
    const [showPlaceable, setShowPlaceable] = React.useState<boolean>(true);

    const [gameToSave, setGameToSave] = useState<any>(null);
    const [gameIsSaved, setGameIsSaved] = useState<boolean>(false);

    const [user] = useAuthState(auth);
    const gameOver = (game: {playingAs: number, white: number, black:number,winner:number, level: number, gameLength: number}) => {
        setGameState(2);
        setFinalStats(game);

        const diffScore = playingAs === 1 ? game.black - game.white : game.white - game.black;
        let l = game.level;
        let result = game.winner === playingAs ? 1 : game.winner === 0 ? 0 : -1; // 1: win, 0: draw, -1: loss
        if(l === 5) l = 4;
        else if(l === 7) l = 5;
        else if(l === 9) l = 6;
        let highscore = {
            name: null,
            uid: null,
            playingAs: playingAs === 1 ? 'Black' : 'White',
            white: game.white,
            black: game.black,
            score: diffScore,
            level: l,
            date: serverTimestamp(),
            gameLength: game.gameLength,
            result: result
        }
        setGameIsSaved(false);
        setGameToSave(highscore);

    }

    const saveGame = async () => {
        if(user && gameToSave !== null && !gameIsSaved){
            gameToSave.uid = user.uid;
            gameToSave.name = user.displayName;
            setGameIsSaved(true);

            await addDoc(collection(db,'highscores'), gameToSave)
            .then((docRef) => {
                console.log('Document written with ID: ', docRef.id);
                
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
            });
            
        }
    }

    useEffect(() => {
        if(gameToSave !== null){
            if(user){
                saveGame();
            }
        }
    }, [gameToSave]);

    useEffect(() => {
        if(user && gameToSave !== null){
            saveGame();
        }else if(!user){
            setGameIsSaved(false);
            setGameToSave(null);
        }
    }
    , [user]);

    useEffect(() => {
        if(playingAs !== null){
            setGameState(1); // 1: Game is running
            setGameToSave(null);
            setGameIsSaved(false);
        }
    }
    , [playingAs]);
    return (
        <div className="container mx-auto px-4">
            <div className="relative w-full flex flex-col justify-center items-center">
                {/*<Othello gameOver={gameOver} state={gameState} playingAs={playingAs} showPlaceable={showPlaceable} level = {level}/>*/}
                {<Othello
                    gameOver={gameOver}
                    state={gameState} 
                    playingAs={playingAs} 
                    showPlaceable={showPlaceable} 
                    level = {level}
                />}
                {gameState !== 0 &&
                    <button 
                        className="bg-green-900 text-white px-4 py-2 rounded mt-4"
                        onClick={() => {
                            setPlayingAs(null);
                            setGameState(0);
                        }}    
                    >
                        {gameState === 1 ? 'Restart' : 'New Game'}
                    </button>
                }
                {gameState === 0 && 
                    <GameMenu 
                        setPlayingAs={setPlayingAs} 
                        setLevel={setLevel} 
                        showPlaceable={showPlaceable}
                        setShowPlaceable={setShowPlaceable}
                        level={level} 
                        playingAs={playingAs}
                    />
                }
                {gameToSave !== null && gameState === 2 && <div className="container mx-auto">
                    <SaveNotification 
                        gameToSave={gameToSave}
                        gameIsSaved={gameIsSaved}
                    />
                </div>
                }

            </div>
            
        </div>
    );
}

export default Game;