import React from "react";

const About = () => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl text-center mt-5 mb-5">About</h1>
            <p className="mb-4">
                The game is based on the classic board game Othello. The rules of the game can be found <a href='https://www.worldothello.org/about/about-othello/othello-rules/official-rules/english' target='_blank' className="text-blue-500 underline">here</a>.
            </p>
            <p className="mb-4">
                The game is created by <a href='https://niklaswicklund.github.io/NiklasWicklund/' target='_blank' className="text-blue-500 underline">Niklas Wicklund</a>.
            </p>
            <h4 className="text-lg font-bold mb-2">AI</h4>
            <p className="mb-4">
                The AI is based on the <a href="https://en.wikipedia.org/wiki/Negamax" target='_blank' className="text-blue-500 underline">negamax</a> algorithm with alpha-beta pruning. The AI can be set to different levels of difficulty by changing the depth of the search tree.
                Keep in mind that the choosen level of difficulty will affect the time it takes for the AI to make a move as it has to go deeper into the search tree.
            </p>
            <h5 className="text-md font-bold mb-2">Heuristics</h5>
            <p className="mb-4">
                The AI builds on the concept of <span className="font-bold">stable disks</span> and evalutes the board based on the number of stable disks for each player. A stable disk is a disk that cannot be flipped by the opponent and corners are therefore valued higher than other squares.
            </p>
        </div>
    );
};

export default About;