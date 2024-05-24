import React from "react";


const GameMenu = (props: any) => {
    return (
        <div className="w-[min(90vw,90vh)] md:w-[min(56vw,56vh)] my-4">
            <div className="bg-green-500 text-white py-2 rounded shadow-2xl flex flex-col items-center gap-1 flex-1">
                <div className="flex gap-6">
                    <button 
                        className="bg-black text-white px-4 py-2 rounded"
                        onClick={() => props.setPlayingAs(1)}
                    >Black</button>
                    <button 
                        className="bg-white text-black px-4 py-2 rounded"
                        onClick={() => props.setPlayingAs(-1)}
                    >White</button>
                </div>
                <label htmlFor="dropdown" className="text-xs">Choose difficulty:</label>
                <select
                    id="dropdown"
                    value={props.level}
                    onChange={(e) => props.setLevel(parseInt(e.target.value))}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                >
                    <option value={1}>Level 1 (Fast)</option>
                    <option value={2}>Level 2</option>
                    <option value={3}>Level 3</option>
                    <option value={5}>Level 4</option>
                    <option value={7}>Level 5 (Slow)</option>
                    <option value={9}>Level 6 (Very Slow)</option>
                </select>
                <label htmlFor="showPlaceable" className="text-xs mt-2">Show placeable cells</label>
                <input
                    id="showPlaceable"
                    type="checkbox"
                    className=""
                    checked={props.showPlaceable}
                    onChange={() => props.setShowPlaceable(!props.showPlaceable)}
                />
            </div>
        </div>
    );
}

export default GameMenu;