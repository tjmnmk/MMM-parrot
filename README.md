# MMM-parrot-or-gif

** This module is currently in development and not production-ready **

This module displays a parrot GIF or any other GIF on the screen.

## Installation

1. Clone this repository into the `modules` folder of your MagicMirror directory:
    ```sh
    git clone https://github.com/yourusername/MMM-parrot-or-gif.git
    ```

2. Navigate to the module folder:
    ```sh
    cd MMM-parrot-or-gif
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

## Configuration

Add the following configuration to your `config.js` file of MagicMirror:

```js
{
    module: "MMM-parrot-or-gif",
    position: "middle_center", // or any other position of your choice
    config: {
        gif: "kuchtik.gif", // name of the GIF file in the gifs folder
        animationSpeed: 2000,
        alwaysOnTheScreen: false,
        showGifEvery: 60 * 5 * 1000, // 5 minutes
        showGifFor: 10000, // 10 seconds
    }
}