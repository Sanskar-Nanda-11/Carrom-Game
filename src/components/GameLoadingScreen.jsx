import React from "react";    // importing React library
import { useState, useEffect } from "react";   // importing useState and useEffect hooks from React


const GameLoader = ({ onloadingComplete }) => {  // GameLoader component that takes onloadingComplete as a prop
    const [progress, Setprogress] = useState(0); // state to track loading progress
    const [LoadingText, SetLoadingText] = useState('Initializing Physics Engine ......');   // state to track loading text

    const LoadingTexts = [                                  // array of loading texts to display during loading
        'Initializing Physics Engine v1.0....',
        'Polishing wood veneer assests .........',
        'Arrenging coins in the central of rose .........',  // list of loading messages to show during the loading process
        'Chalking striker alignment guides .........',
        'Reading Premium Digital Carrom Board ......',
    ];

    useEffect(() => {          // useEffect hook to simulate loading progress
        // Progres bar speed control and loading text update logic
        const interval = setInterval(() => {            // setInterval to update progress every 100ms
            Setprogress((prev) => {        // update progress state
                if (prev >= 100) {         // if progress is 100 or more, clear the interval and call onloadingComplete
                    clearInterval(interval);   // clear the interval to stop updating progress
                    setTimeout(() => {           // setTimeout to delay the call to onloadingComplete by 600ms
                        if (onloadingComplete) onloadingComplete();  // call onloadingComplete callback if it exists
                    }, 600);    // delay of 600ms before calling onloadingComplete smooth transition to the game screen
                    return 100;  // return 100 to ensure progress does not exceed 100
                }

                // Dynamically update loading text based on progress status
                const Textindex = Math.min(Math.floor(prev / 20), LoadingTexts.length - 1); // calculate the index for loading text based on progress (every 20% progress updates the text)
                SetLoadingText(LoadingTexts[Textindex]);        // update the loading text based on the current progress
                return prev + 1; // increment progress by 1
            });
        }, 35);   // update progress every 35ms for a smoother loading experience
        return () => clearInterval(interval);
    }, [onloadingComplete]);
 


    return (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-natural-950 font-sans select-none overflow-hidden">
            {/* Background Ambiant  */}
            <div className=" absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animated-pulse-slow" />
            <div className=" absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none animated-pulse-slow" style={{ animationDelay: '1.5s ' }} />
            {/* Main Loading Screen */}
            <div className="w-[450px] flex flex-col items-center text-center p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-[0_50px_100px_-20px_rgba(0,0,0.7)]">
                {/* Animated Visual : A Glowing king / Striker Graphics */}
                <div className="relative w-24 h-24 mb-8 flex items-center justify-center animate-glow">
                    {/* Outer Ring */}
                    <div className=" absolute inset-0 rounded-full border border-amber-500/40 animate-spin " style={{ animationDirection: '6s' }} />
                    {/* inner decorative dashes circle  */}
                    <div className=" absolute inset-2 rounded-full border-2 border-dashed border-zinc-700 animate-spin " style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
                    {/* Center piece mimicking the Queen */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-amber-600 shadow-lg flex items-center justify-center border border-white/20">
                        <div className=" w-3 h-3 rounded-full bg-amber-400 " />
                    </div>
                </div>
                {/* Brand Header */}
                <h1 className=" text-4xl font-black tracking-tighter text-white italic drop-shadow-lg"> ULTIMATE <span className="text-amber-500">CARROM</span></h1>
                <p className="text-[10px] uppercase tracking-[0.4cm] text-zinc-500 font-bold mt-1 mb-8"> Premium Board Experience </p>
                {/* Progress Display Bar Container */}  
                <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-white/5 p-[1px] mb-3 ">
                <div className=" h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500 rounded-full transition-all duration-75 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)" style={{ width : `${progress}%`}}/>
                </div>
                {/* Loading Subtext Logs */}
                <div className=" flex justify-between items-center w-full px-1 ">
                    <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider transition-all duration-300">
                        {LoadingText}
                    </p>
                    <p className="text-[11px] font-mono font-bold text-amber-500 ">
                        {progress.toString().padStart(2, '0')}%
                    </p>
                </div>
            </div>
            {/* {Powered By Bottom Level} */}
            <p className=" absolute bottom-6 text-zinc-600 text-[9px] uppercase font-bold tracking-[0.3em] ">
                Powered By Nothing Phone
            </p>
        </div>
    );
};

export default GameLoader;   // exporting the GameLoader component as the default export of this module