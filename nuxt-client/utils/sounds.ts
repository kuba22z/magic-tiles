/**
 * @description plays a gameover sound
 * sounds from https://mixkit.co/free-sound-effects/instrument/
 */
export function playGameOverSound() {
    const falseSound = new window.Audio(
        "https://audio-previews.elements.envatousercontent.com/files/196781335/preview.mp3"
    );
    falseSound.play();
}

/**
 * @description plays the correct sound when the correct rectangle was clicked
 *  sounds from https://mixkit.co/free-sound-effects/instrument/
 */
export function playCorrectSound() {
    const correctSound = new window.Audio(
        // alternative sound:  https://audio-previews.elements.envatousercontent.com/files/117729019/preview.mp3
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/pause.wav"
    );

    correctSound.play();
}
