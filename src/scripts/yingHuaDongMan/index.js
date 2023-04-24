// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.yhpdm.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yhpdm.net
// @grant        none
// ==/UserScript==

// video.pause()
// video.requestFullscreen();

window.palyVideo = document.querySelector('.dplayer-video-wrap video')
window.palyVideo.playbackRate = 2
window.palyVideo.play()
window.palyVideo.currentTime = 1 * 60 + 45
