'use strict'
/* global browser, screen */
const longdoMainMenuId = 'longdoMainMenu'
const popUpDimension = {
  height: 700,
  width: 500
}

browser.menus.create({
  id: longdoMainMenuId,
  contexts: ['selection'],
  title: browser.i18n.getMessage('menuLabel')
})

browser.menus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === longdoMainMenuId) {
    const searchText = info.selectionText.trim()
    if (!searchText) { return }

    try {
      const leftTopWindowObject = getLeftTopWindowObject(
        popUpDimension.width,
        popUpDimension.height
      )

      browser.windows.create({
        type: 'popup',
        height: popUpDimension.height,
        width: popUpDimension.width,
        left: leftTopWindowObject.left,
        top: leftTopWindowObject.top,
        url: `https://dict.longdo.com/mobile.php?search=${searchText}`
      })
    } catch (e) {
      console.log(e)
    }
  }
})

function getLeftTopWindowObject (w, h) {
  // Fixes dual-screen position                         Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY
  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height
  const systemZoom = width / window.screen.availWidth

  return {
    left: (width - w) / 2 / systemZoom + dualScreenLeft,
    top: (height - h) / 2 / systemZoom + dualScreenTop
  }
}
