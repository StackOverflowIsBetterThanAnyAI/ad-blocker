import { useEffect, useState } from 'react'
import logo from './../src/images/logo.png'

const App = () => {
    const [enabled, setEnabled] = useState(true)

    useEffect(() => {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.sync.get(['rulesetEnabled'], (result) => {
                setEnabled(result.rulesetEnabled)
            })
        }
    }, [])

    const toggleEnabled = () => {
        const newEnabled = !enabled
        setEnabled(newEnabled)
        if (
            typeof chrome !== 'undefined' &&
            chrome.storage &&
            chrome.declarativeNetRequest
        ) {
            chrome.storage.sync.set({ rulesetEnabled: newEnabled }, () => {
                chrome.declarativeNetRequest.updateEnabledRulesets({
                    enableRulesetIds: newEnabled ? ['ruleset_1'] : [],
                    disableRulesetIds: newEnabled ? [] : ['ruleset_1'],
                })
            })
        }
    }

    const reloadPage = () => {
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0].id) {
                    chrome.tabs.reload(tabs[0].id)
                }
            })
        }
    }

    return (
        <main
            className={`p-8 min-w-96 ${
                enabled ? 'bg-red-600' : 'bg-green-700'
            } text-zinc-50 flex flex-col gap-4 font-sans`}
        >
            <div className="flex flex-row gap-4 m-auto font-semibold">
                <h1 className="text-2xl">Ad Blocker</h1>
                <img src={logo} alt="Ad Blocker" className="w-8" />
            </div>
            <button
                onClick={toggleEnabled}
                className="bg-zinc-50 text-zinc-800 rounded-md w-1/2 m-auto
                focus:outline focus:outline-2 focus:outline-zinc-800
                hover:bg-zinc-200 hover:cursor-pointer
                active:bg-zinc-300 active:text-zinc-950 active:outline-zinc-950"
                autoFocus
            >{`Turn ${enabled ? 'OFF' : 'ON'}`}</button>
            {enabled ? (
                <p className="m-auto">You are currently ad-free.</p>
            ) : (
                <p className="m-auto">You are currently allowing ads.</p>
            )}
            <button
                onClick={reloadPage}
                className={`text-zinc-50 rounded-md w-1/2 m-auto outline outline-2 outline-zinc-50
                focus:outline-zinc-800
                ${
                    enabled ? 'hover:bg-red-500' : 'hover:bg-green-600'
                } hover:cursor-pointer
                ${
                    enabled ? 'active:bg-red-400' : 'active:bg-green-500'
                } active:outline-zinc-950`}
            >
                Reload Page
            </button>
        </main>
    )
}

export default App
