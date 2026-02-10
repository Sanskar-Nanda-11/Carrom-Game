import { useRef , useEffect } from "react";
import {Matter} from "matter-js";                       // Import Matter.js library

export const useCarromPhysics = (screenRef ) =>{
    const engineRef = useRef(Matter.Engine.create())    // Create a reference to the Matter.js engine and ' Matter.Engine.create() initializes a new physics engine instance. This engine will be responsible for simulating the physics of the carrom game, including the movement and interactions of the carrom pieces on the board. By using useRef, we can maintain a persistent reference to this engine across re-renders of the component, allowing us to manage the physics simulation effectively throughout the lifecycle of the component.
    useEffect(() => {
  const engine = engineRef.current;       // Access the current value of the engine reference with setup the physics simulation, including creating the carrom board, pieces, and handling interactions. The useEffect hook ensures that this setup code runs after the component has been rendered, allowing us to initialize the physics engine and set up the necessary elements for the carrom game. By using the engine reference, we can manage the physics simulation and update it as needed based on user interactions or game events.
  engine.gravity.y=0; // Disable gravity for a top-down view of the carrom board  

  const rander = Matter.rander.create({         // Create a renderer to visualize the physics simulation. The Matter.Render.create() function initializes a new renderer instance that will be responsible for drawing the carrom board and pieces on the screen. By passing in the engine and the screen reference, we can link the renderer to our physics engine and specify where to render the simulation. This allows us to see the movements and interactions of the carrom pieces as they are simulated by the physics engine.
    element : screenRef.current,      // Specify the DOM element where the renderer will draw the simulation. By using screenRef.current, we can target the specific element in the DOM that we want to use for rendering the carrom game. This allows us to control where the visual representation of the physics simulation will be displayed on the screen.
    engine : engine,  // Link the renderer to the physics engine. By passing the engine reference to the renderer, we can ensure that the renderer is aware of the physics simulation and can accurately visualize the movements and interactions of the carrom pieces based on the physics calculations performed by the engine.
    options:{           // Set various options for the renderer to customize the appearance of the simulation. These options include:
        width : 600,
        height : 600,
        wireframes : false,     // Set wireframes to false to render solid shapes instead of wireframe outlines. This option allows us to create a more visually appealing representation of the carrom pieces and board, making it easier for players to see and interact with the game elements. By setting wireframes to false, we can enhance the overall visual experience of the carrom game.
        background: 'transparent',           
    }
  });

  const wallOptions = {
    isStatic : true,      // Define options for the walls of the carrom board. By setting isStatic to true, we ensure that the walls will not move or be affected by forces in the physics simulation. This is important for creating a stable boundary for the carrom pieces to interact with, preventing them from falling off the board or moving outside of the designated play area. The wallOptions can be used when creating the walls of the carrom board to ensure they behave as intended in the physics simulation.
    render:{ fillStyle : '#3e2723'},
    restitution: 0.9  // Set restitution to 0.9 to make the walls bouncy, allowing the carrom pieces to bounce off them with some elasticity. This option enhances the gameplay experience by adding a realistic bounce effect when the pieces collide with the walls, making the game more dynamic and enjoyable for players. By adjusting the restitution value, we can control how much energy is retained during collisions, creating a more engaging and interactive carrom game.
  }
}, )
}
