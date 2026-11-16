# Desktop Jumping Bird

A small, interactive desktop bird that jumps, sings, and keeps you company while you work.

Inspired by my budgie **Kavurma**, the little bird in my GitHub profile picture. I created this project in his memory, combining my love for birds with software development.

## Preview


https://github.com/user-attachments/assets/2f8e57c4-8963-491f-b7f0-babaaec46324

## Features

- Sits right above the Dock or Taskbar.
- Gently breathes while idle.
- Jumps and plays a bird sound when clicked.
- Displays animated musical notes.
- Stays behind other application windows.
- Automatically hides when fullscreen applications are active.

## Installation

No coding required.

1. Go to the **Releases** section.
2. Download the application for your operating system, if available.
3. Extract the ZIP file.
4. Double-click `Bird` to launch.

### macOS Security Notice

macOS may display a security warning because the application is not notarized by Apple.

If you encounter this issue and trust the application, move `Bird.app` to your Downloads folder and run:

```bash
xattr -dr com.apple.quarantine ~/Downloads/Bird.app
```

Then open the application normally.

## Run from Source

Requirements: Node.js and npm.

Clone this repository and navigate to the project directory.

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

Stop the application:

```bash
npm stop
```

## Build

Build for macOS:

```bash
npm run build:mac
```

Build for Windows:

```bash
npm run build:win
```

## Roadmap

- [ ] Movement along the Dock and Taskbar
- [ ] Interactive jumping
- [ ] Autonomous walking
- [ ] Selectable behavior modes
- [ ] More animations and interactions

## Contributing

Feel free to open an issue for suggestions, feature requests, or bug reports. Pull requests are also welcome.

If you like the project, consider giving it a star!

---

In loving memory of Kavurma. ♡

