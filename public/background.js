// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.sync.set({ rulesetEnabled: true })
})
