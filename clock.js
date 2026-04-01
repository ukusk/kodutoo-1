class DigitalClock {
    constructor() {
        this.hoursEl = document.getElementById("hours");
        this.minutesEl = document.getElementById("minutes");
        this.secondsEl = document.getElementById("seconds");

        this.dayEl = document.getElementById("day");
        this.monthEl = document.getElementById("month");
        this.yearEl = document.getElementById("year");
        this.weekdayEl = document.getElementById("weekday");

        this.clockContainer = document.getElementById("clockContainer");
        this.body = document.body;

        this.fontSize = 12;
        this.is24Hour = true;

        this.positionX = 0;
        this.positionY = 0;

        this.moveEnabled = false;

        this.init();
    }

    init() {
        this.updateClock();
        this.updateDate();

        setInterval(() => this.updateClock(), 1000);
        setInterval(() => this.updateDate(), 60000);

        this.addEventListeners();
    }

    updateClock() {
        const now = new Date();

        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        if (!this.is24Hour) {
            hours = hours % 12 || 12;
        }

        this.hoursEl.textContent = this.formatTime(hours);
        this.minutesEl.textContent = this.formatTime(minutes);
        this.secondsEl.textContent = this.formatTime(seconds);
    }

    updateDate() {
        const now = new Date();

        const days = [
            "Pühapäev", "Esmaspäev", "Teisipäev",
            "Kolmapäev", "Neljapäev", "Reede", "Laupäev"
        ];

        this.weekdayEl.textContent = days[now.getDay()];
        this.dayEl.textContent = this.formatTime(now.getDate());
        this.monthEl.textContent = this.formatTime(now.getMonth() + 1);
        this.yearEl.textContent = now.getFullYear();
    }

    formatTime(value) {
        return value < 10 ? "0" + value : value;
    }

    changeSize(amount) {
        this.fontSize += amount;

        if (this.fontSize < 5) this.fontSize = 5;
        if (this.fontSize > 25) this.fontSize = 25;

        this.clockContainer.style.fontSize = this.fontSize + "vw";
    }

    // muudab taustavärvi randomiks
    // kasutatud AI-d -> prompt: "backgroundcolor ei tööta, paranda"
    changeBackground() {
        const colors = [
            "#0f2027", "#203a43", "#2c5364",
            "#1a1a2e", "#16213e", "#0f3460"
        ];

        const random = colors[Math.floor(Math.random() * colors.length)];
        this.body.style.background = random;
    }

    changeTextColor() {
        const randomColor =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
        this.clockContainer.style.color = randomColor;
    }

    toggleFormat() {
        this.is24Hour = !this.is24Hour;
        document.getElementById("toggleFormat").textContent =
            this.is24Hour ? "24h" : "12h";
    }

    // kasutatud AI-d -> prompt: "kuidas saaks liigutamist toggle ON/OFF-da"
    moveClock(key) {
        if (!this.moveEnabled) return;

        const step = 20;

        if (key === "ArrowUp") this.positionY -= step;
        if (key === "ArrowDown") this.positionY += step;
        if (key === "ArrowLeft") this.positionX -= step;
        if (key === "ArrowRight") this.positionX += step;

        this.clockContainer.style.transform =
            `translate(${this.positionX}px, ${this.positionY}px)`;
    }

    mouseResize(e) {
        const percent = e.clientX / window.innerWidth;
        const newSize = 5 + percent * 20;
        this.clockContainer.style.fontSize = newSize + "vw";
    }

    // kasutatud AI-d -> prompt: "kuidas saaks liigutamist toggle ON/OFF-da"
    toggleMoveMode() {
        this.moveEnabled = !this.moveEnabled;

        alert(
            this.moveEnabled
                ? "Liigutamine ON (kasuta nooleklahve)"
                : "Liigutamine OFF"
        );
    }

    addEventListeners() {
        document.getElementById("bigger")
            .addEventListener("click", () => this.changeSize(1));

        document.getElementById("smaller")
            .addEventListener("click", () => this.changeSize(-1));

        document.getElementById("colorChange")
            .addEventListener("click", () => this.changeBackground());

        document.getElementById("toggleFormat")
            .addEventListener("click", () => this.toggleFormat());

        document.getElementById("moveClock")
            .addEventListener("click", () => this.toggleMoveMode());

        this.clockContainer
            .addEventListener("click", () => this.changeTextColor());

        window.addEventListener("keydown", (e) => this.moveClock(e.key));

        window.addEventListener("mousemove", (e) => this.mouseResize(e));
    }
}

new DigitalClock();
// lõpus kasutatud AI-d et kogu kood üle vaadata