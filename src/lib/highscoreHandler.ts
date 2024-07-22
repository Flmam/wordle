import { get, writable } from "svelte/store";

export const WinStreak = writable(0);
export const HighScore = writable(0);

export function checkValuesLocalStorage() {
    let streak = localStorage.getItem("streak")
    if (streak) {
        WinStreak.set(Number.parseInt(streak))
    }

    let highscore = localStorage.getItem("highscore")
    if (highscore) {
        HighScore.set(Number.parseInt(highscore))
    }
}

// handle wrong
export function handleLoss() {
    WinStreak.set(0);
    saveValues();
}

// handle right
export function handleWin() {
    let winStreak = get(WinStreak);
    winStreak++;
    WinStreak.set(winStreak);
    let highScore = get(HighScore);
    if (winStreak > highScore) {
        HighScore.set(winStreak)
    }
    saveValues();
}

function saveValues() {
    let winStreak = get(WinStreak);
    localStorage.setItem("streak", winStreak + "");

    let highScore = get(HighScore);
    localStorage.setItem("highscore", highScore + "");
}