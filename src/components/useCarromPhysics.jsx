import { useRef , useEffect } from "react";
import {Matter} from "matter-js";                       // Import Matter.js library

export const useCarromPhysics = (screenRef ) =>{
    const engineRef = useRef(Matter.Engine.create())    // Create a reference to the Matter.js engine and ' Matter.Engine.create() initializes a new physics engine instance. This engine will be responsible for simulating the physics of the carrom game, including the movement and interactions of the carrom pieces on the board. By using useRef, we can maintain a persistent reference to this engine across re-renders of the component, allowing us to manage the physics simulation effectively throughout the lifecycle of the component.
}

use