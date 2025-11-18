import { useEffect, useState } from 'react'
import logo from './../src/images/logo.png'
import { useFocusTrap } from './hooks/useFocusTrap'

const App = () => {
    const [isEnabled, setIsEnabled] = useState<boolean>(true)

    useFocusTrap()

    useEffect(() => {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.sync.get(['rulesetEnabled'], (result) => {
                const storedValue =
                    result &&
                    typeof (result as any).rulesetEnabled === 'boolean'
                        ? (result as any).rulesetEnabled
                        : true
                setIsEnabled(storedValue)
            })
        }
    }, [])

    const toggleEnabled = () => {
        const newIsEnabled = !isEnabled
        setIsEnabled(newIsEnabled)
        if (
            typeof chrome !== 'undefined' &&
            chrome.storage &&
            chrome.declarativeNetRequest
        ) {
            chrome.storage.sync.set({ rulesetEnabled: newIsEnabled }, () => {
                chrome.declarativeNetRequest.updateEnabledRulesets({
                    enableRulesetIds: newIsEnabled ? ['ruleset_1'] : [],
                    disableRulesetIds: newIsEnabled ? [] : ['ruleset_1'],
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
                isEnabled ? 'bg-red-700' : 'bg-green-800'
            } text-zinc-50 flex flex-col gap-4 font-sans`}
        >
            <div className="flex flex-row gap-4 m-auto items-center font-semibold">
                <h1 className="text-3xl">Ad Blocker</h1>
                <img src={logo} alt="Ad Blocker" className="w-8 h-8" />
            </div>
            <button
                onClick={toggleEnabled}
                className={`bg-zinc-50 text-zinc-800 font-medium text-base rounded-md w-1/2 m-auto py-1
                outline outline-2 ${
                    isEnabled ? 'outline-red-900' : 'outline-green-700'
                }
                focus-visible:outline-[3px] focus-visible:outline-zinc-800
                hover:bg-zinc-200 hover:cursor-pointer
                active:bg-zinc-300 active:text-zinc-950 active:outline-zinc-950`}
                autoFocus
            >{`Turn ${isEnabled ? 'OFF' : 'ON'}`}</button>
            <p className="m-auto text-base">{`You are currently ${
                isEnabled ? 'ad-free' : 'allowing ads'
            }.`}</p>
            <button
                onClick={reloadPage}
                className={`text-zinc-50 text-base rounded-md w-1/2 m-auto py-1
                outline outline-2 ${
                    isEnabled ? 'outline-red-900' : 'outline-green-700'
                }
                focus-visible:outline-[3px] focus-visible:outline-zinc-800
                ${
                    isEnabled ? 'hover:bg-red-600' : 'hover:bg-green-700'
                } hover:cursor-pointer
                ${
                    isEnabled
                        ? 'active:bg-red-500/20'
                        : 'active:bg-green-600/30'
                } active:outline-zinc-950`}
            >
                Reload Page
            </button>
        </main>
    )
}

export default App
