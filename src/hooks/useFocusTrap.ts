import { useEffect } from 'react'

export const useFocusTrap = () => {
    useEffect(() => {
        const handleFocusTrap = (e: KeyboardEvent) => {
            const focusableButtons = Array.from(
                document.querySelectorAll('button')
            )
            const firstButton = focusableButtons[0]
            const lastButton = focusableButtons[focusableButtons.length - 1]

            if (e.key !== 'Tab') return

            if (e.shiftKey && document.activeElement === firstButton) {
                e.preventDefault()
                lastButton.focus()
            } else if (document.activeElement === lastButton) {
                e.preventDefault()
                firstButton?.focus()
            }
        }

        document.addEventListener('keydown', handleFocusTrap)

        return () => {
            document.removeEventListener('keydown', handleFocusTrap)
        }
    }, [])
}
