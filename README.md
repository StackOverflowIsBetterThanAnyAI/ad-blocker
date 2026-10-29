<div align="center">

<img src="src/images/logo.png" alt="Ad Blocker logo" width="96" />

# Ad Blocker

**Keep your screen ad-free with this Chrome extension.**

![Manifest V3](https://img.shields.io/badge/Manifest-V3-4285F4?logo=googlechrome&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

</div>

## Features

-   Blocks on-screen ads using Chrome's built-in `declarativeNetRequest` API.
-   Toggle between blocking and allowing ads with a single click.
-   Reload the current page directly from the popup.
-   Minimal permissions: only `declarativeNetRequest` and `storage`.

## Installation

There are two ways to get the extension running in Chrome.

### Option 1: Build from source

1. Clone the repository:

    ```bash
    git clone https://github.com/StackOverflowIsBetterThanAnyAI/ad-blocker.git
    cd ad-blocker
    ```

2. Install the dependencies and build the extension:

    ```bash
    npm install
    npm run build
    ```

3. [Load the `build` folder in Chrome](#load-the-extension-in-chrome).

### Option 2: Download a release

1. Go to the [latest release](https://github.com/StackOverflowIsBetterThanAnyAI/ad-blocker/releases).
2. Download the `build.rar` archive and extract it.
3. [Load the extracted `build` folder in Chrome](#load-the-extension-in-chrome).

### Load the extension in Chrome

1. Open `chrome://extensions` in Google Chrome.
2. Enable **Developer mode** in the top right corner.
3. Click **Load unpacked** in the top left corner and select the `build` folder.

## Development

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Starts the Vite dev server for the popup UI      |
| `npm run build`   | Type-checks and builds the extension to `build/` |
| `npm run preview` | Serves the production build locally              |

> [!NOTE]
> The Chrome extension APIs are only available when the extension is loaded in Chrome. In the dev server, the popup renders, but the toggle has no effect.

## License

Released under the [MIT License](LICENSE).
