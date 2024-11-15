Module.register("MMM-parrot-or-gif", {
    defaults: {
        gif: "kuchtik.gif", // show a parrot with the name kuchtik
        animationSpeed: 2000,
        alwaysOnTheScreen: false,
        showGifEvery: 60 * 5 * 1000, // 5 minutes
        showGifFor: 10000, // 10 seconds
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        
        this.showGif = false;
        this.gifTimer = null;

        // check if the gif exists
        fs = require('fs');
        if (!fs.existsSync(__dirname + "/gifs/" + this.config.gif)) {
            Log.error("Gif file not found: " + this.config.gif);
            return;
        }

        if (this.showGifEvery < 0 || this.showGifFor < 0) {
            Log.error("Invalid showGifEvery or showGifFor value");
            return;
        }

        if (showGifEvery > showGifFor) {
            this.config.alwaysOnTheScreen = true;
            showGifEvery = showGifFor;
        }

        if (this.config.alwaysOnTheScreen) {
            this.showGif = true;
            this.updateDom();
        } else {
            this.startGifTimer();
        }
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.id = "parrot-or-gif";
        wrapper.style.display = "none";

        if (this.showGif) {
            var img = document.createElement("img");
            img.src = this.file(__dirname + "/gifs/" + this.config.gif);
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "contain";
            wrapper.appendChild(img);
        }

        return wrapper;
    },

    startGifTimer: function() {
        this.gifTimer = setInterval(() => {
            this.showGif = true;
            this.updateDom();

            setTimeout(() => {
                this.showGif = false;
                this.updateDom();
            }, this.config.showGifFor);
        }, this.config.showGifEvery);
    },
})