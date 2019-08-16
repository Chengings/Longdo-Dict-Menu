'use strict'
/* global browser */
const longdoMainMenuId = 'longdoMainMenu'

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
      const response = await window.fetch(`https://dict.longdo.com/mobile.php?search=${searchText}`)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }
})
