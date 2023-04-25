// ==UserScript==
// @name         樱花动漫快捷键
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Avan
// @match        https://www.yhpdm.net/vp/*.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yhpdm.net
// @grant        none
// ==/UserScript==

// video.requestFullscreen();

function onKeydownListener(e) {
  const liArr = Array.from(window.document.querySelector('.movurl[style="display: block;"]').querySelectorAll('li'))
  const curIndex = liArr.findIndex(li => li.innerHTML.includes('background:'))
  let preIndex = -1,
    nextIndex = -1
  if (curIndex !== 0) {
    preIndex = curIndex - 1
  }
  if (curIndex < liArr.length) {
    nextIndex = curIndex + 1
  }

  const playVideoEl = iframe.querySelector('.dplayer-video-wrap video')
  const code = e.code.toLocaleLowerCase()
  if (e.ctrlKey) {
    switch (code) {
      case 'keyp': {
        if (playVideoEl.paused) {
          playVideoEl.play()
        } else {
          playVideoEl.pause()
        }
        break
      }
      case 'keyn': {
        if (e.shiftKey) {
          if (preIndex !== -1) {
            liArr[preIndex].querySelector('a').click()
          }
        } else {
          if (nextIndex !== -1) {
            liArr[nextIndex].querySelector('a').click()
          }
        }
      }
    }
  }
}

window.onload = () => {
  setTimeout(() => {
    const iframe = window.frames[0].frameElement.contentDocument
    const playVideoEl = iframe.querySelector('.dplayer-video-wrap video')
    playVideoEl.playbackRate = 2
    playVideoEl.play()
    playVideoEl.currentTime = 1 * 60 + 45

    iframe.addEventListener('keydown', onKeydownListener)
    window.addEventListener('keydown', onKeydownListener)
  }, 1000)
}
