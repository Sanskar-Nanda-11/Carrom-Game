import React , { useRef} from 'react'
import { useCarromPhysics } from './useCarromPhysics'

const CarromBoard = () => {

    const boardRef = useRef(null);

    useCarromPhysics(boardRef);
  return (
    <>
    <div className='flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white font-sans p-4 select-none'>
        <div className=' flex justify-between items-end w-full max-w[700px] mb-6'>
            <div>
                <h1 className=' text-4xl font-black tracking-tighter text-white '>

                </h1>
            </div>
        </div>
    </div>
    </>
  )
}

export default CarromBoard
