Module.register("MMM-parrot-or-gif", {
    defaults: {
        gif: "kuchtik.gif", // show a parrot with the name kuchtik
        animationSpeed: 3000,
        alwaysOnTheScreen: false,
        showGifEvery: 60 * 5 * 1000, // 5 minutes
        showGifFor: 20000, // 20 seconds
        scaleGif: 0.5,
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        
        this.showGif = false;
        this.gifTimer = null;

        if (this.showGifEvery < 0 || this.showGifFor < 0) {
            Log.error("Invalid showGifEvery or showGifFor value");
            return;
        }

        if (this.showGifEvery > this.showGifFor) {
            this.config.alwaysOnTheScreen = true;
            this.showGifEvery = this.showGifFor;
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

        if (this.showGif) {
            var gif = document.createElement("img");
            gif.src = this.file("gifs/" + this.config.gif);
            gif.style.width = "100%";
            gif.style.height = "100%";
            gif.style.transform = "scale(" + this.config.scaleGif + ")";
            wrapper.appendChild(gif);
        }

        return wrapper;
    },

    startGifTimer: function() {
        this.gifTimer = setInterval(() => {
            this.showGif = true;
            this.updateDom(this.config.animationSpeed);

            setTimeout(() => {
                this.showGif = false;
                this.updateDom(this.config.animationSpeed);
            }, this.config.showGifFor);
        }, this.config.showGifEvery);
    },
});