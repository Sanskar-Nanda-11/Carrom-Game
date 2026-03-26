import React, { useRef , useState , useEffect} from 'react'
import { useCarromPhysics } from './useCarromPhysics'

const CarromBoard = () => {

    const boardRef = useRef(null);              // Reference to the carrom board element
    const [score, setScores] = useState({p1:0 , p2:0});                 // State to keep track of player scores
    const [CurrentPlayer, setCurrentPlayer] = useState('p1');                   // State to keep track of the current player (p1 or p2)
    const [Winner , SetWinner] = useState(null);                        // State to keep track of the winner of the game (null if no winner yet)
    const [queenState, setQueenState] = useState('on_board');             // on_board , waiting_confirmed , captured   // State to keep track of the queen's status in the game (whether it's on the board, waiting for confirmation, or captured)


    // The handlescore function is responsible for updating the game state and scores based on the type of piece that has been pocketed (either a 'queen' or a 'coin'). When a piece is pocketed, this function is called with the type of the piece as an argument. If the pocketed piece is a 'queen', we set the queen's state to 'waiting_confirm', indicating that it has been pocketed but is waiting for confirmation before updating the score. If the pocketed piece is a 'coin', we check if the queen is in a 'waiting_confirm' state. If it is, we update the score for the current player by adding 70 points and change the queen's state to 'captured'. If the queen is not in a 'waiting_confirm' state, we simply add 20 points to the current player's score. This logic allows us to handle scoring based on whether the queen has been pocketed and whether it was waiting for confirmation, adding an extra layer of strategy to the carrom game as players aim to pocket coins while managing the status of the queen on the board.

    const handlescore = (type)=>{     
        if (Winner)      return;    // If there is already a winner, we return early from the function to prevent any further score updates. This ensures that once a player has won the game, no additional scoring can occur, maintaining the integrity of the game's outcome and preventing any unintended changes to the scores after a winner has been declared.
        if (type === 'queen'){                      // If the pocketed type is 'queen', we set the queen's state to 'waiting_confirm'. This indicates that the queen has been pocketed but is waiting for confirmation before updating the score. If the pocketed type is 'coin', we check if the queen is in a 'waiting_confirm' state. If it is, we update the score for the current player by adding 70 points and change the queen's state to 'captured'. If the queen is not in a 'waiting_confirm' state, we simply add 20 points to the current player's score. This logic allows us to handle scoring based on whether the queen has been pocketed and whether it was waiting for confirmation, adding an extra layer of strategy to the carrom game as players aim to pocket coins while managing the status of the queen on the board.
            setQueenState('waiting_confirm');                   // If the pocketed type is 'queen', we set the queen's state to 'waiting_confirm'. This indicates that the queen has been pocketed but is waiting for confirmation before updating the score. If the pocketed type is 'coin', we check if the queen is in a 'waiting_confirm' state. If it is, we update the score for the current player by adding 70 points and change the queen's state to 'captured'. If the queen is not in a 'waiting_confirm' state, we simply add 20 points to the current player's score. This logic allows us to handle scoring based on whether the queen has been pocketed and whether it was waiting for confirmation, adding an extra layer of strategy to the carrom game as players aim to pocket coins while managing the status of the queen on the board.
            console.log(`${CurrentPlayer} captured the queen , need the confirmation !`);
            return ;  // We return early from the function after setting the queen's state to 'waiting_confirm' because we want to wait for the confirmation before updating the score. This allows us to handle the scenario where a player has pocketed the queen but has not yet confirmed it by pocketing a coin. By returning early, we ensure that the score is not updated until the player confirms the queen by pocketing a coin, adding an element of strategy to the game as players must decide whether to risk pocketing the queen without confirmation or to play it safe and wait for a better opportunity to score points.
        }
            if(type === 'coin'){                  
                setScores(prev => {
                    let pointsToAdd = 20;   // Default points for pocketing a coin

                                if(queenState === 'waiting_confirm'){               // If the pocketed type is 'coin', we check if the queen is in a 'waiting_confirm' state. If it is, we update the score for the current player by adding 70 points and change the queen's state to 'captured'. If the queen is not in a 'waiting_confirm' state, we simply add 20 points to the current player's score. This logic allows us to handle scoring based on whether the queen has been pocketed and whether it was waiting for confirmation, adding an extra layer of strategy to the carrom game as players aim to pocket coins while managing the status of the queen on the board.
                                    console.log(`${CurrentPlayer} confirmed the queen and got 70 points!`); // If the queen is in a 'waiting_confirm' state, we log a message indicating that the current player has confirmed the queen and earned 70 points. This provides feedback to the players about their successful confirmation of the queen, adding to the excitement and engagement of the game as players aim to pocket coins while managing the status of the queen on the board.
                setScores(prev => ({...prev , [CurrentPlayer] : prev[CurrentPlayer] + 70 }));           // If the pocketed type is 'queen', we set the queen's state to 'waiting_confirm'. This indicates that the queen has been pocketed but is waiting for confirmation before updating the score. If the pocketed type is 'coin', we check if the queen is in a 'waiting_confirm' state. If it is, we update the score for the current player by adding 70 points and change the queen's state to 'captured'. If the queen is not in a 'waiting_confirm' state, we simply add 20 points to the current player's score. This logic allows us to handle scoring based on whether the queen has been pocketed and whether it was waiting for confirmation, adding an extra layer of strategy to the carrom game as players aim to pocket coins while managing the status of the queen on the board.
                setQueenState('captured');      // If the pocketed type is 'queen', we set the queen's state to 'waiting_confirm'. This indicates that the queen has been pocketed but is waiting for confirmation before updating the score. If the pocketed type is 'coin', we check if the queen is in a 'waiting_confirm' state. If it is, we update the score for the current player by adding 70 points and change the queen's state to 'captured'. If the queen is not in a 'waiting_confirm' state, we simply add 20 points to the current player's score. This logic allows us to handle scoring based on whether the queen has been pocketed and whether it was waiting for confirmation, adding an extra layer of strategy to the carrom game as players aim to pocket coins while managing the status of the queen on the board.
            }else{
                setScores(prev => ({...prev , [CurrentPlayer] : prev[CurrentPlayer] + 20 }));               // If the pocketed type is 'coin', we check if the queen is in a 'waiting_confirm' state. If it is, we update the score for the current player by adding 70 points and change the queen's state to 'captured'. If the queen is not in a 'waiting_confirm' state, we simply add 20 points to the current player's score. This logic allows us to handle scoring based on whether the queen has been pocketed and whether it was waiting for confirmation, adding an extra layer of strategy to the carrom game as players aim to pocket coins while managing the status of the queen on the board.
            }
                })
        }
    };

    const endTurn = () => {     // Function to end the current turn and switch to the next player
        console.log(" Current Player Before Switch : " , CurrentPlayer);                    // Log the current player before switching to the next player. This is useful for debugging purposes to verify that the current player state is being updated correctly when the endTurn function is called.
        if(queenState === 'waiting_confirm'){    // If the queen is in a 'waiting_confirm' state, we reset the queen's state to 'on_board' and call the respawnQueen function if it exists. This allows us to handle the scenario where a player has pocketed the queen but has not yet confirmed it by pocketing a coin. If the player ends their turn without confirming the queen, we reset its state and respawn it on the board for the next player's turn. This adds an element of strategy to the game, as players must decide whether to risk pocketing the queen without confirmation or to play it safe and wait for a better opportunity to score points.
            setQueenState('on_board');          // 
            if(window.respawnQueen) window.respawnQueen();          
        }
        setCurrentPlayer((prev) => (prev === 'p1' ? 'p2' : ' p1'));         // Switch the current player from 'p1' to 'p2' or vice versa at the end of each turn. This allows players to take turns in the carrom game, ensuring that both players have an opportunity to play and score points. By toggling the current player state, we can manage the flow of the game and provide a fair and engaging gaming experience for both players as they compete to pocket coins and score points in the carrom game.
    };

// temporary win condition for testing
 const temp = useEffect(() => {
  console.log(" Turn Switched to : " , CurrentPlayer);
}, [CurrentPlayer]);



    const Win_score = 100;

    useCarromPhysics(boardRef , handlescore , CurrentPlayer);
    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white font-sans p-4 select-none relative'>
                {
                    Winner && (
                        <div className='absolute insert-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md'>
                        <h2 className='text-6xl font-black text-amber-500 italic '> WINNER! </h2>
                        <p className=' text-2xl mt-2 '> {Winner} takes it all </p>
                        <button onClick={ () => window.location.reload()} className='mt-8 px-8 py-3 bg-amber-500 text-black font-bold rounded-full'> REPLAY </button>
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
                        <div className={`text-center transition-opacity ${ CurrentPlayer === 'P1' ? 'opacity-100' : 'opacity-40'}`}>
                            <span className='block text-[10px] text-zinc-500 font-bold '> P1 </span>
                            <span className='text-xl font-mono text-amber-500'> {score.p1.toString().padStart(2 , '0')} </span>
                        </div>
                        <div className='h-6 w-[1px] bg-white/20 ' />
                        <div className={`text-center transition-opacity ${ CurrentPlayer === 'P2' ? 'opacity-100' : 'opacity-40'}`}>
                            <span className='block text-[10px] text-zinc-500 font-bold '> P2 </span>
                            <span className='text-xl font-mono text-zinc-300'> {score.p2.toString().padStart(2 , '0')} </span>
                        </div>
                    </div>
                </div>
                <div className='mb-4 text-center'>
                    <h2 className={`text-xl font-bold ${ queenState === 'waiting_confirm' ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                        {queenState === 'waiting_confirm' ? " CONFIRM THE QUEEN " : ` Turn : ${ CurrentPlayer.toUpperCase() }`}
                    </h2>
                </div>
            <div className='relative p-6 bg-[#2d1b19] rounded-[2.5rem] shadow-2xl border-b-8 border-[#1a0f0e] flex items-center justify-center '>
                <div ref={boardRef} className=' relative w-[600px] h-[600px] bg-[#dfbb9d] rounded-sm overflow-hidden pointer-events-auto'/>
                    {/* <div className='absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle , _#8d6e63_1px , _transparent_1px)] bg-[size:20px_20px]' />
                    <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                        <div className='w-32 h-32 border border-[#4e342e]/20 rounded-full'></div>
                        <div className='absolute w-full h-[1px] bg-[#4e342e]/10 rotate-45'></div>
                        <div className='absolute w-full h-[1px] bg-[#4e342e]/10 -rotate-45'></div>
                    </div> */}
                    {/* --------------error---------------- */}
                    {/* </div>  */}
                    <div className='absolute top-10 left-10 w-14 h-14 bg-zinc-900 rounded-full shadow-[inset_0_8px_15px_rgba(0,0,0,1)] border-2 border-white/5 z-50 pointer-events-none' />
                    <div className='absolute top-10 right-10 w-14 h-14 bg-zinc-900 rounded-full shadow-[inset_0_8px_15px_rgba(0,0,0,1)] border-2 border-white/5 z-50 pointer-events-none' />
                    <div className='absolute bottom-10 left-10 w-14 h-14 bg-zinc-900 rounded-full shadow-[inset_0_8px_15px_rgba(0,0,0,1)] border-2 border-white/5 z-50 pointer-events-none' />
                    <div className='absolute bottom-10 right-10 w-14 h-14 bg-zinc-900 rounded-full shadow-[inset_0_8px_15px_rgba(0,0,0,1)] border-2 border-white/5 z-50 pointer-events-none' />
                    </div>
                    {/* <div className='absolute bottom-[115px] left-1/2 -translate-x-1/2 w-380px h-10 border-y-2 border-[#4e342e]/30 pointer-events-none flex justify-between px-2 '>
                        <div className='w-9 h-9 -mt-[2px] rounded-full border-2 border-[#4e342e]/20' />
                        <div className='w-9 h-9 -mt-[2px] rounded-full border-2 border-[#4e342e]/20' />
                    </div> */}
                <div className='mt-8 flex flex-col items-center gap-4'>
                    <button type="button" onClick={() => setCurrentPlayer(prev => prev === 'p1' ? 'p2' : 'p1' )} className='px-4 py-1 text-[10px] font-bold uppercase tracking-widest bg-amber-500 text-black rounded-full hover:bg-amber-400 transition-colors'> Switch Player </button>
                    <div className='px-6 py-2 bg-zinc-900/50 border border-white/5 rounded-full backdrop-blur-sm animate-pulse'>
                        <p className=' text-[10px] uppercase tracking-widest text-amber-500 font-bold '>
                            Pull & Release The Striker To Shoot
                        </p>
                    </div>
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
