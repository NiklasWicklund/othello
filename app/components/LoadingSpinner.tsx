import React from "react";


const LoadingSpinner = (props: {size: number}) => {
    return (
        <div className={`w-${props.size} h-${props.size} border-2 border-t-0 border-green-800 rounded-full animate-spin`}></div>
    )
}

export default LoadingSpinner;