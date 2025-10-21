# flappyIA

## 🎮 Live Demo

Try it now: [https://d4fto.github.io/flappyIA](https://d4fto.github.io/flappyIA)

Watch the AI learn to play Flappy Bird in real time!

## 1. flappyIA

**flappyIA** is an experimental web-based game that reimagines the classic Flappy Bird experience with a twist: players are controlled by a custom-built Neural Network, trained through a Genetic Algorithm in real-time. This project demonstrates basic concepts of artificial intelligence and evolutionary computation applied to a simple game environment.

Watch as a population of AI birds learns to navigate the challenging pipes, constantly evolving to improve their fitness and survive longer. The best performing neural network from each generation is then used to breed the next generation, driving the learning process.

## 2. Key Features

- **Flappy Bird Gameplay**: A re-implementation of the popular game mechanics.
- **Neural Network Players**: Each "bird" is controlled by a feed-forward neural network.
- **Genetic Algorithm**: Neural network weights are evolved over generations to optimize survival and score.
- **Real-time AI Training Visualization**: Observe the AI population learning and the best performer's neural network structure.
- **Parallax Scrolling Backgrounds**: Dynamic and immersive visual experience with multiple layers moving at different speeds.
- **Custom Collision Detection**: Uses a custom implementation of the Separating Axis Theorem (SAT) for accurate collision detection between players and pipes/ground.
- **Adaptive Environment**: Pipes dynamically spawn and move, presenting an ever-changing challenge to the AI.
- **Download Best Network**: Option to download the JSON representation of the best-performing neural network for analysis or later use.

## 3. Technologies Used

- **Frontend**:
  - **HTML5**: Structure of the web page.
  - **CSS3**: Styling of the page and game canvas.
  - **JavaScript (ES Modules)**: Core game logic, AI implementation (Neural Network, Genetic Algorithm), animation, physics, and rendering.
- **Graphics**:
  - **Canvas API**: For rendering all game elements, backgrounds, and AI visualization.
  - **PNG Image Assets**: Game sprites and background textures.

## 4. Prerequisites

To run this project, you will need:

- **A Modern Web Browser**: Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari, with JavaScript enabled.

## 5. Installation Guide

This project is a client-side web application and does not require a complex build process or backend server (for the game itself).

1.  **Clone the Repository**:
    First, clone the project repository to your local machine using Git:

    ```bash
    https://github.com/D4fto/flappyIA.git
    cd flappyIA
    ```

2.  **Run the Web Application**:
    - **Directly Open `index.html`**
      Navigate to the `flappyIA` directory and simply open the `index.html` file in your preferred web browser. You can usually do this by double-clicking the file or dragging it into an open browser window.
      ```bash
      # From the flappyIA directory
      # (On Windows)
      start index.html
      # (On macOS)
      open index.html
      # (On Linux, using xdg-open for example)
      xdg-open index.html
      ```
      _Note: Depending on your browser's security settings, directly opening local files with ES Modules might sometimes lead to errors (e.g., "CORS policy" or "module specifier does not start with '/' or './' or '../'"). If this occurs, use Option B._

## 6. Usage Examples

Once the application is running in your browser:

- **Observe AI Training**: The game will automatically start, and you will see a population of "birds" attempting to navigate the pipes. The "Gen" (Generation) and "Individuos" (Individuals) count will update at the top left, showing the progress of the genetic algorithm. The neural network visualization for the best player will be displayed on the right.
- **Downloading the Best Neural Network**:
  - Click the "Baixar melhor rede da ultima geração" (Download best network of the last generation) button at the bottom left of the screen.
  - This will download a `MelhorRede.js` file containing a JSON representation of the neural network that performed best in the _previous completed generation_. This file can be useful for debugging, analysis, or potentially loading into other applications.
- **Interacting with the Game (Keyboard)**:
  - The `main.js` file contains a commented-out `keydown` event listener for the spacebar (`event.keyCode == 32`). If uncommented, it would allow all living players to jump, enabling manual intervention or testing. Currently, all interaction is handled by the AI.

## 7. Configuration

This project does not use external configuration files in the typical sense (e.g., `.env`, `config.json`). Most configurable parameters are hardcoded directly within the JavaScript files.

Key parameters you might want to adjust for experimentation are found primarily in `main.js` and `global.js`:

- **`main.js`**:
  - `quantos`: (Line ~43) Controls the pipe spawn frequency.
  - `population`: (Line ~65) The total number of AI players in each generation.
  - `numberOfMutation`: (Line ~62) The number of mutations applied to offspring networks. This value gradually decreases over generations.
  - `step`: (Line ~41) Determines how many of the top-performing individuals are directly carried over (elitism) and used for breeding in the next generation.
- **`global.js`**:
  - `this.speedIni`: (Line ~4) Initial horizontal scrolling speed of the game world.
  - `this.gravity`: (Line ~5) The gravity constant applied to the players.
- **`Player.js`**:
  - Neural Network Architecture: In the `Player` constructor, the `Rede` (network) is initialized.
    ```javascript
    this.rede = new Rede({
      header: "first",
      entrada: 5, // Number of input nodes
      hidden: [6, 6], // Array specifying the number of nodes in each hidden layer
      saida: 3, // Number of output nodes
    });
    ```
    Adjusting `entrada`, `hidden`, and `saida` will change the neural network's architecture. Be mindful that changing these requires understanding the inputs (distX, distY, canospeed, distChao, pos.x) and outputs (pulo, frente, tras) expected by the `Player.js` logic.

To modify any of these, you would edit the respective JavaScript files and refresh your browser.

## 8. Project Structure

The project is structured into several JavaScript modules, image assets, and a few auxiliary Python scripts.

```
.
├── assets/
│   └── imgs/                       # Game image assets (backgrounds, player, pipes, etc.)
│       ├── arbusto.png
│       ├── bg.png
│       ├── cano_1.png
│       ├── cano_2.png
│       ├── chao.png
│       ├── cidade.png
│       ├── flappy-bird-ios-1.png.png
│       ├── flappy-bird-ios.png
│       ├── nuvem.png
│       ├── passaro.png
│       ├── pause.png
│       ├── score.png
│       ├── start.png
│       └── title.png
├── AnimatedObject.js               # Base class for game objects that can display animated sprites.
├── cano.js                         # Defines the `Cano` (pipe) game object, including its movement and collision shapes.
├── Collision.js                    # Implements the Separating Axis Theorem (SAT) for precise collision detection between rotated rectangles.
├── CollisionShape.js               # A wrapper class to define and manage collision boundaries for game objects.
├── global.js                       # Manages global game state, such as speed, gravity, and lists of active game objects (pipes, players).
├── index.html                      # The main HTML file that loads the game.
├── main.js                         # The primary game logic file. Initializes the game, manages the AI population, game loop, pipe spawning, and genetic algorithm.
├── parallax.js                     # Handles rendering and movement for parallax background layers.
├── Player.js                       # Defines the `Player` (bird) object. Each player has a neural network and handles its own movement, physics, and fitness calculation.
└── Rede.js                         # Implements the custom Neural Network. Handles network creation, execution (forward pass), weight mutation, and visualization.
```

## 9. Contributing Guidelines

This project does not currently have formal contributing guidelines. However, we welcome contributions! If you're interested in improving this project:

1.  **Fork the repository**.
2.  **Create a new branch** for your feature or bug fix.
3.  **Make your changes**.
    - Ensure your code adheres to existing coding styles.
    - Add comments where necessary to explain complex logic.
    - Test your changes thoroughly.
4.  **Commit your changes** with a clear and descriptive commit message.
5.  **Push your branch** to your forked repository.
6.  **Open a Pull Request** against the `main` branch of this repository, describing your changes and their benefits.

## 10. License Information

MIT LICENSE
