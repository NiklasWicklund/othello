/*

LICENSE for react-timer-hook.
MIT License

Copyright (c) 2018 Amr Labib

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/



import React, { use, useEffect } from "react";
import GameState from "../scripts/GameState";
import Game from "../scripts/Game";
import utils from "../scripts/utility";
import { useStopwatch } from 'react-timer-hook';


const Othello = (props: any) => {
    /*GAME LOGIC*/
    const [game, setGame] = React.useState<Game>(new Game());
    const [gameState, setGameState] = React.useState<GameState>(game.getGameState());
    const [allowInput, setAllowInput] = React.useState<boolean>(false);
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
        } = useStopwatch({ autoStart: false });

    useEffect(() => {
        let intervalId: any | number | NodeJS.Timeout | null | undefined = null;
        
        if(props.state === 1) {
            game.startGame(props.playingAs, props.level);
            setGameState(game.getGameState());
            setAllowInput(true);
            reset();
        }else if(props.state === 0) {
            reset(new Date(), false);
            let newGame = new Game();
            setGame(newGame);
            setGameState(newGame.getGameState());
        }

        return () => clearInterval(intervalId);
    }, [props.state]);

    const gameOver = (finalGameState: GameState, time: number) => {

        let winner = finalGameState.numBlackTiles > finalGameState.numWhiteTiles ? 1 : finalGameState.numBlackTiles < finalGameState.numWhiteTiles ? -1 : 0;
        const finalStats = {
            playingAs: props.playingAs,
            white: finalGameState.numWhiteTiles,
            black: finalGameState.numBlackTiles,
            winner: winner, // 1: Black win, -1: White win, 0: Draw
            level: props.level,
            gameLength: time,
        }
        props.gameOver(finalStats);
    }
    // TODO: When skipping the players turn, the gamestate.player is not changed in the frontend and the useeffect is not triggered.
    useEffect(() => {
        if(props.playingAs === null) return;
        if(gameState.gameOver){
            pause();
            gameOver(gameState, totalSeconds);
            return;
        }
        if(gameState.player !== props.playingAs){
            pause();
            setTimeout(() => {
                const aiMove = game.placeTile(); // Bot makes a move, called with no arguments
                setGameState(game.getGameState());
                if(aiMove !== undefined){
                    setTimeout(() => {
                        game.flipTiles(aiMove);
                        setGameState(game.getGameState());
                    }, 300);
                }
            }, 100);
        }else if(gameState.player === props.playingAs){
            start();
            setAllowInput(true);
        }
    }, [gameState.round]);

    useEffect(() => {
        if(gameState.gameOver){
            pause();
            gameOver(gameState, seconds);
            return;
        }
    }, [gameState.gameOver]);

    const cellPressed = (i:number, j:number) => {
        // Get the move object
        if(gameState.player !== props.playingAs || !allowInput) return;
        const move = gameState.possibleMoves.find(move => move.row === i && move.col === j);
        if(move){
            setAllowInput(false);
            let res = game.placeTile(move);
            setGameState(game.getGameState());
            if(res){
                setTimeout(() => {
                game.flipTiles(move);
                setGameState(game.getGameState());
                }, 300);
            }

        }
    }

    const highlightCell = (i:number, j:number, cell: number) => {
        if (gameState.possibleMoves.some(move => move.row === i && move.col === j) && cell === 0 && gameState.player === props.playingAs && props.showPlaceable){
            return true;
        }
        return false;
    }

    const buildBoard = () => {
        const tile_class = "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full p-0";
        let visualBoard = (
            <table className=" w-[min(90vw,90vh)] h-[min(90vw,90vh)] md:w-[min(56vw,56vh)] md:h-[min(56vw,56vh)] table-layout:fixed m-0 border-separate">
                <tbody>
                    {gameState.board.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j) => (
                                <td 
                                    key={j}
                                    className={`relative ${highlightCell(i,j,cell) ? 'bg-green-500' : 'bg-green-600'}`}
                                    onClick={() => cellPressed(i, j)}
                                >
                                    {cell !== 0 && 
                                    <div className={`${tile_class} ${cell === 1 ? 'bg-black' : 'bg-white'}`}></div>
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
        return visualBoard;
    }
    const formatLastMove = (moveHistory: any) => {
        if(moveHistory.length === 0) return 'No moves';
        const lastMove = moveHistory[moveHistory.length-1]
        if(lastMove.move !== undefined){
            return `${lastMove.move.row+1},${lastMove.move.col+1}`;
        }
        return 'Couldn\'t play';
    }
    return (
        <>
       <div className="flex items-center justify-center flex-col z-0 mt-4 mb-2 shadow-2xl">
            <table className=" w-[min(90vw,90vh)] md:w-[min(56vw,56vh)] table-layout:fixed m-0 border-separate">
                <thead>
                    <tr className="bg-green-600 text-white text-xs md:text-base">
                        <th className=' w-[40%]' colSpan={3}>
                            <div className={`flex items-center justify-center p-1 border-b-4 ${gameState.player !== 1 && 'border-transparent'}`}>
                                <div className={`w-4 h-4 bg-black rounded-full ${game.playingAs === 1 && 'border border-white'}`}></div>
                                <div className='ml-2'>Black: {gameState.numBlackTiles}</div>
                            </div>
                        </th>
                        <th className={`w-[20%] ${!isRunning && ' animate-pulse'}`} colSpan={2}>
                            {utils.formatTime(totalSeconds)}
                        </th>
                        <th className='w-[40%]' colSpan={3}>
                            <div className={`flex items-center justify-center p-1 border-b-4 ${gameState.player !== -1 && 'border-transparent'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full ${game.playingAs === -1 && 'border border-black'}`}></div>
                                <div className='ml-2'>White: {gameState.numWhiteTiles}</div>
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>
            {buildBoard()}
            <table className=" w-[min(90vw,90vh)] md:w-[min(56vw,56vh)] table-layout:fixed m-0 border-separate">
                <thead>
                    <tr className="bg-green-600 text-white text-xs">
                        <th className=' w-[50%]' colSpan={3}>
                            <div className={`flex items-center justify-center flex-col`}>
                                <div>
                                    Disks left: {32 - gameState.numBlackPlaced}
                                </div>
                                <div>
                                {formatLastMove(gameState.blackHistory)}
                                </div>
                            </div>
                        </th>
                        <th className='w-[50%]' colSpan={3}>
                            <div className={`flex items-center justify-center flex-col`}>
                                <div>
                                    Disks left: {32 - gameState.numWhitePlaced}
                                </div>
                                <div>
                                {formatLastMove(gameState.whiteHistory)}
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        
        </>
    );
}

export default Othello;