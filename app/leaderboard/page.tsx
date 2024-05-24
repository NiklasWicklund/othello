'use client';
import React from "react";
import { useEffect } from "react";
import LeaderboardList from "../components/LeaderBoardList";
import {auth, db} from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, onSnapshot, query, orderBy,limit, where} from 'firebase/firestore';

const Leaderboard = () => {
    const [user] = useAuthState(auth);
    const [filter, setFilter] = React.useState({
        playingAs: "All",
        level: "All",
    });
    const [playerGames, setPlayerGames] = React.useState<any[] | null>(null);
    const [allGames, setAllGames] = React.useState<any[] | null >(null);
    useEffect(() => {
        if(!user || !auth.currentUser){
            setPlayerGames(null);
            return;
        }
        const q = query(collection(db, 'highscores'), where('uid', '==', auth.currentUser.uid), orderBy('score','desc'), limit(5));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const data: any[] = [];
            querySnapshot.forEach((doc) => {
                data.push({...doc.data(), id: doc.id});
            });
            setPlayerGames(data);
        }
        );
        return () => unsub();
    }
    , [user]);

    useEffect(() => {
        const q = query(collection(db, 'highscores'), orderBy('score','desc'), limit(5));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const data: any[] = [];
            querySnapshot.forEach((doc) => {
                data.push({...doc.data(), id: doc.id});
            });
            setAllGames(data);
        }
        );
        return () => unsub();
    }, []);


    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl text-center mt-5">Leaderboard</h1>
            {user ? <LeaderboardList games={playerGames} showName={false} title='Personal Games' highlight= {false}/>
            : <p className="text-center mt-5">Please sign in to view your games</p>}
            <LeaderboardList games={allGames} showName={false} title='Global Leaderboard' highlight={true}/>
        </div>
    );
}

export default Leaderboard;