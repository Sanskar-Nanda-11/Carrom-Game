import React, { useRef, useState, useEffect } from 'react';
import { useCarromPhysics } from './useCarromPhysics';

const CarromBoard = () => {

    const boardRef = useRef(null);              // Reference to the carrom board element
    const [score, setScores] = useState({ p1: 0, p2: 0 });                 // State to keep track of player scores
    const [CurrentPlayer, setCurrentPlayer] = useState('p1');                   // State to keep track of the current player (p1 or p2)
    const [Winner, SetWinner] = useState(null);                        // State to keep track of the winner of the game (null if no winner yet)
    const [queenState, setQueenState] = useState('on_board');             // on_board , waiting_confirmed , captured   // State to keep track of the queen's status in the game (whether it's on the board, waiting for confirmation, or captured)

    const Win_score = 100;

    // The handlescore function is responsible for updating the game state and scores based on the type of piece that has been pocketed (either a 'queen' or a 'coin'). When a piece is pocketed, this function is called with the type of the piece as an argument. If the pocketed piece is a 'queen', we set the queen's state to 'waiting_confirm', indicating that it has been pocketed but is waiting for confirmation before updating the score. If the pocketed piece is a 'coin', we check if the queen is in a 'waiting_confirm' state. If it is, we update the score for the current player by adding 70 points and change the queen's state to 'captured'. If the queen is not in a 'waiting_confirm' state, we simply add 20 points to the current player's score. This logic allows us to handle scoring based on whether the queen has been pocketed and whether it was waiting for confirmation, adding an extra layer of strategy to the carrom game as players aim to pocket coins while managing the status of the queen on the board.

    const queenStateRef = useRef(queenState);
    useEffect(() => {
      queenStateRef.current = queenState;
    }, [queenState]);
    
    const playerRef = useRef(CurrentPlayer);
    useEffect(() => {
        playerRef.current = CurrentPlayer;
    }, [CurrentPlayer]);

    const handlescore = (type) => {
        if (Winner) return;
        setScores((prevScore) => {
            const activeKey = playerRef.current.trim().toLowerCase();
            let points = 0;
            if (type === 'queen') {
                setQueenState('wating_confirm');
                console.log(" Queen Pocketed, waiting for confirmation... ");
                return prevScore;
            }
            if(type === 'Striker_foul') {
                return {...prevScore , [activeKey] : Math.max(0 , prevScore[activeKey] - 10 )}
            }
            if (type === 'white_coin') points = 20;
            if (type === 'black_coin') points = 10;
            let currentPoints = points;
            const currentQueenStatus = queenStateRef.current;
            if (currentQueenStatus === 'wating_confirm' && points > 0) {
                currentPoints += 50;
                setQueenState('captured');
                console.log(" Queen Captured! Bonus points awarded. ");
            }

            const newScore = Math.max(0 , prevScore[activeKey] + currentPoints);
            //   (queenState === 'captured')
            if (newScore >= Win_score){
                SetWinner(activeKey === 'p1' ? 'Player 1' : 'Player 2');
            }
            return { ...prevScore, [activeKey]: newScore };
        });
    };
    const handleEndTurn = () => {
        if(queenState === 'wating_confirm'){
            setQueenState('on_board');
            if(window.respawnQueen) window.respawnQueen();
            console.log("Queen returned to center - failed to confirm");
            alert("Queen returned to center - failed to confirm");
        }
        setCurrentPlayer(CurrentPlayer === 'p1' ? 'p2' : 'p1');
    };

    const endTurn = () => {     // Function to end the current turn and switch to the next player
        console.log(" Current Player Before Switch : ", CurrentPlayer);                    // Log the current player before switching to the next player. This is useful for debugging purposes to verify that the current player state is being updated correctly when the endTurn function is called.
        if (queenState === 'waiting_confirm') {    // If the queen is in a 'waiting_confirm' state, we reset the queen's state to 'on_board' and call the respawnQueen function if it exists. This allows us to handle the scenario where a player has pocketed the queen but has not yet confirmed it by pocketing a coin. If the player ends their turn without confirming the queen, we reset its state and respawn it on the board for the next player's turn. This adds an element of strategy to the game, as players must decide whether to risk pocketing the queen without confirmation or to play it safe and wait for a better opportunity to score points.
            setQueenState('on_board');          // 
            if (window.respawnQueen) window.respawnQueen();
        }
        setCurrentPlayer((prev) => (prev.trim() === 'p1' ? 'p2' : ' p1'));         // Switch the current player from 'p1' to 'p2' or vice versa at the end of each turn. This allows players to take turns in the carrom game, ensuring that both players have an opportunity to play and score points. By toggling the current player state, we can manage the flow of the game and provide a fair and engaging gaming experience for both players as they compete to pocket coins and score points in the carrom game.
    };

    // temporary win condition for testing
    const temp = useEffect(() => {
        console.log(" Turn Switched to : ", CurrentPlayer);
    }, [CurrentPlayer]);

    useCarromPhysics(boardRef, handlescore);
    
    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white font-sans p-4 select-none relative'>
                {
                    Winner && (
                        <div className='absolute insert-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md'>
                            <h2 className='text-6xl font-black text-amber-500 italic '> WINNER! </h2>
                            <p className=' text-2xl mt-2 '> {Winner} takes it all </p>
                            <button onClick={() => window.location.reload()} className='mt-8 px-8 py-3 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400'> REPLAY </button>
                        </div>
                    )
                }
                <div className=' flex justify-between items-end w-[650px] mb-6'>
                    <div>
                        <h1 className=' text-4xl font-black tracking-tighter text-white italic drop-shadow-lg'>
                            ULTIMATE <span className='text-amber-500'> CARROM </span>
                        </h1>
                        <p className='text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mt-1 '>
                            Premium Physics Engine v1.0
                        </p>
                    </div>
                    <div className='flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-2xl backdrop-blur-md'>
                        <div className={`text-center transition-opacity ${CurrentPlayer.trim() === 'P1' ? 'opacity-100' : 'opacity-40'}`}>
                            <span className='block text-[10px] text-zinc-500 font-bold '> P1 </span>
                            <span className='text-xl font-mono text-amber-500'> {score.p1.toString().padStart(2, '0')} </span>
                        </div>
                        <div className='h-6 w-[1px] bg-white/20 ' />
                        <div className={`text-center transition-opacity ${CurrentPlayer.trim() === 'P2' ? 'opacity-100' : 'opacity-40'}`}>
                            <span className='block text-[10px] text-zinc-500 font-bold '> P2 </span>
                            <span className='text-xl font-mono text-zinc-300'> {score.p2.toString().padStart(2, '0')} </span>
                        </div>
                    </div>
                </div>
                <div className='mb-4 text-center'>
                    <h2 className={`text-xl font-bold ${queenState === 'waiting_confirm' ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                        {queenState === 'waiting_confirm' ? " CONFIRM THE QUEEN " : ` Turn : ${CurrentPlayer.toUpperCase()}`}
                    </h2>
                </div>
                <div className='relative w-[680]px h-[680]px bg-[#2d1b18] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center p-10 border-[18]px border-[#1b110f]'>

                </div>
                <div className='mt-8 flex flex-col items-center gap-4'>


                    <button type="button" onClick={() => setCurrentPlayer(prev => prev.trim() === 'p1' ? 'p2' : 'p1')} className='px-4 py-1 text-[10px] font-bold uppercase tracking-widest bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-full hover:bg-zinc-700 transition-all'> ACCESS_TURN_CONTROL </button>
                    <div className='px-6 py-2 bg-black border border-red-900/30 rounded-full backdrop-blur-sm '>
                        <p className=' text-[10px] uppercase tracking-[0.5em] text-red-500 font-black animate-pulse '>
                            INTERACT TO INITATE THE GAME (DRAG & SHOOT)
                        </p>
                    </div>

                    {/* <div className='mt-4 text-center group cursor-help'>
                        <p className='text-zinc-700 text-[9px] uppercase font-bold tracking-[0.4em] transition-colors group-hover:text-amber-500'>
                            ORIGIN : [ REDACTED ]
                        </p>
                        <p className='text-zinc-800 text-[7px] uppercase mt-1 '>
                            Data Packet ID : {Math.random().toString(36).substring(7).toUpperCase()}
                        </p>
                    </div> */}
                    <button onClick={endTurn} className='mt-6 px-10 py-3 bg-amber-500 text-black font-bold rounded-full'>
                        END TURN / NEXT PLAYER
                    </button>
                    <p className='text-zinc-600 text-[9px] uppercase font-bold tracking-widest'>
                        Powered By :- Nothing Phone
                        {/* React + Matter.js + Tailwind v4 */}
                    </p>
                </div>
            </div>
        </>
    )
}

export default CarromBoard;
