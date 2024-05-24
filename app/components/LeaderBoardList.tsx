import React from "react";

import {auth} from "../firebase";
import LoadingSpinner from "./LoadingSpinner";
const LeaderboardList = (props: { games: any[] | null; showName: boolean; title:string; highlight: boolean}) => {


    const scoresToString = (white: number, black: number) => {
        return `${black} - ${white}`;
    }
    const secondsToString = (seconds: any) => {
        const minutes = Math.floor(seconds / 60);
        if (minutes < 1) {
            return `${seconds}s`;
        }
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    }
    const dateToString = (date: any) => {
        if(!date) return 'N/A';
        const d = date.toDate();
        return d.toLocaleDateString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'});
    }
    const getGridClass = (uid: string) => {
        
        let ownerClass = auth.currentUser?.uid === uid ? "" : " text-gray-500";
        if(uid === '' || !props.highlight) ownerClass = '';
        if (props.showName) {
            return "grid grid-cols-6 gap-1" + ownerClass;
        }
        return "grid grid-cols-5 gap-1" + ownerClass;
    }
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-1 mt-5">{props.title}</h2>
          {props.games === null ? <LoadingSpinner size={6}/> :
            <ul className="divide-y divide-gray-300 text-xs md:text-base">
                <li className="py-2 font-semibold">
                <div className={getGridClass('')}>
                    {props.showName && <div>Name</div>}
                    <div>As</div>
                    <div>Result</div>
                    <div className="w-6">Level</div>
                    <div>Time</div>
                    <div>Date</div>
                </div>
                </li>
                {props.games.map((game: any) => (
                    <li className="py-2" key={game.id}>
                        <div className={getGridClass(game.uid)}>
                            {props.showName && <div>{game.name}</div>}
                            <div>{game.playingAs}</div>
                            <div>{scoresToString(game.white,game.black)}</div>
                            <div className="w-6">{game.level}</div>
                            <div>{secondsToString(game.gameLength)}</div>
                            <div>{dateToString(game.date)}</div>
                        </div>
                    </li>
                ))}
            </ul>
            }
        </div>
    );
}

export default LeaderboardList;