import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CarromBoard from './components/CarromBoard';
import GameLoadingScreen from './components/GameLoadingScreen';

function App() {
  const [count, setCount] = useState(0);                    // State variable to track the count, initialized to 0. This state can be used to keep track of user interactions or any other countable events in the application. The setCount function can be called to update the count state whenever necessary, allowing the application to respond to user actions or other events that require counting functionality.
  const [isGameLoading, setisGamingLoading] = useState(true);             // State variable to track whether the game is currently loading or not. Initially set to true, indicating that the game is in the loading state when the application first renders. This state will be updated to false once the loading process is complete, allowing the main game content (CarromBoard) to be rendered instead of the loading screen (GameLoadingScreen). By using this state, we can conditionally render different components based on whether the game is still loading or has finished loading, providing a smooth transition from the loading screen to the main game interface for an enhanced user experience.
  // const [Laptop, setLaptop] = useState(true);                         // State variable to track whether the device is a laptop or not. Initially set to true, assuming the user is on a laptop until proven otherwise. This state will be updated based on the viewport width and user agent checks in the useEffect hook to determine if the user is accessing the application from a laptop or a mobile device. By using this state, we can conditionally render different content or provide an appropriate user experience based on the type of device being used to access the application.


  // useEffect(() => {
  //   const checkDevice = () => {           // Function to check if the device is a laptop or mobile
  //     const width = window.innerWidth;      // Get the viewport width
  //     const height = window.innerHeight;    // Get the viewport height
  //     const isMobileUserAgent = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent); // Check if the user agent indicates a mobile device


  //     if (width < 1024 || isMobileUserAgent) {                  // If the viewport width is less than 1024 pixels or the user agent indicates a mobile device, set Laptop state to false
  //       setLaptop(false);                   // Set Laptop state to false, indicating that the device is not a laptop
  //     } else {                                          //  Otherwise, set Laptop state to true, indicating that the device is a laptop
  //       setLaptop(true);                                  //  Set Laptop state to true, indicating that the device is a laptop
  //     }
  //   };

  //   checkDevice();                            // Initial check when the component mounts to determine if the device is a laptop or mobile

  //   window.addEventListener('resize' , checkDevice );                     // Add an event listener to the window object to listen for resize events. Whenever the window is resized, the checkDevice function will be called to re-evaluate whether the device is a laptop or mobile based on the new viewport dimensions and user agent. This ensures that the application can dynamically adapt to changes in the device's screen size and provide an appropriate user experience based on whether it's being accessed from a laptop or a mobile device.
  //   return () => window.removeEventListener('resize' , checkDevice);                              // Return a cleanup function that removes the resize event listener when the component unmounts to prevent memory leaks and ensure that the event listener is properly cleaned up when the component is no longer in use. This is important for maintaining optimal performance and preventing unintended side effects in the application.
  // } , [] );

  // if(!Laptop){
  //   return(
  //     <div className=' flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white font-sans p-6 text-center select-none'>
  //       <div className=' max-w-md p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl '>
  //       <div className='text-amber-500 text-5xl mb-4 animated-pulse'>
  //         💻
  //       </div>
  //       <p className='text-lg font-medium text-zinc-200 tracking-wide leading-relaxed'>
  //         For now this game is only playable on Laptop for its smooth playability .
  //       </p>
  //       <div className=' mt-6 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold'>
  //         Access Denied ! Sorry 
  //       </div>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <>
      <main className='w-full min-h-screen'>
        {isGameLoading ? (<GameLoadingScreen onloadingComplete={() => setisGamingLoading(false)} />) : (<CarromBoard />)}
      </main>
    </>
  )
}

export default App
