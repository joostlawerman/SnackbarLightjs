class Timer {
	constructor(callback, remaining){
		// Create random timer id
		this.timerId = Math.round(Math.random()*1000);
		
		this.callback = callback;
		this.remaining = remaining;

        this.resume();
	}

    pause() {
        // Clear the timeout
        window.clearTimeout(this.timerId);
        // Set the remaining to what time remains
        this.remaining -= new Date() - this.start;
    }

    resume() {
        this.start = new Date();
        // Clear the timeout
        window.clearTimeout(this.timerId);
        // Set the timeout again
        this.timerId = window.setTimeout(callback, this.remaining);
    }
}

module.exports = Timer;
