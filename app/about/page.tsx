import React from "react";

const About = () => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl text-center mt-5 mb-5">Terms of Service</h1>
            <p className="mb-4">
                The game is based on the classic board game Othello. The rules of the game can be found <a href='https://www.worldothello.org/about/about-othello/othello-rules/official-rules/english' target='_blank' className="text-blue-500 underline">here</a>.
            </p>
            <p className="mb-4">
                The game is created by <a href='https://niklaswicklund.github.io/NiklasWicklund/' target='_blank' className="text-blue-500 underline">Niklas Wicklund</a>.
            </p>
            <h4 className="text-lg font-bold mb-2">Data Collection</h4>
            <p className="mb-4">
                The game collects data for the purpose of tracking high scores. The data is stored in a Firebase database and includes the user's name, score, and the date of the game. The data is not shared with any third party.
            </p>
            <h4 className="text-lg font-bold mb-2">Data Deletion</h4>
            <p className="mb-4">
                You may request to delete your account and associated data by emailing us at <a href='mailto:nickew00@gmail.com' target='_blank' className="text-blue-500 underline">nickew00@gmail.com</a>. Your data will be deleted within 30 days of the request.
            </p>
            <h4 className="text-lg font-bold mb-2">Changes to the Terms of Service</h4>
            <p className="mb-4">
                We reserve the right to change these terms at any time. Any changes will be posted on this page.
            </p>
            <h4 className="text-lg font-bold mb-2">Disclaimer</h4>
            <p className="mb-4">
                The game is provided "as is" without warranty of any kind. We shall not be liable for any damages resulting from the use of the game.
            </p>
            <h4 className="text-lg font-bold mb-2">Contact</h4>
            <p className="mb-4">
                If you have any questions about these terms, please contact us.
            </p>
            <hr className="my-8" />
            <p>Updated: 14 May 2024</p>
        </div>
    );
};

export default About;