import React, { useRef } from 'react'
import { useCarromPhysics } from './useCarromPhysics'

const CarromBoard = () => {

    const boardRef = useRef(null);

    useCarromPhysics(boardRef);
    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white font-sans p-4 select-none'>
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
                        <div className='text-center'>
                            <span className='block text-[10px] text-zinc-500 font-bold '> P1 </span>
                            <span className='text-xl font-mono text-amber-500'> 00 </span>
                        </div>
                        <div className='h-6 w-[1px] bg-white/20 ' />
                        <div className='text-center'>
                            <span className='block text-[10px] text-zinc-500 font-bold '> P2 </span>
                            <span className='text-xl font-mono text-zinc-300'> 00 </span>
                        </div>
                    </div>
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
                <div className='mt-8 flex flex-col items-center gap-2 opacity-80'>
                    <div className='px-6 py-2 bg-zinc-900/50 border border-white/5 rounded-full backdrop-blur-sm animate-pulse'>
                        <p className=' text-[10px] uppercase tracking-widest text-amber-500 font-bold '>
                            Pull & Release The Striker To Shoot
                        </p>
                    </div>
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
