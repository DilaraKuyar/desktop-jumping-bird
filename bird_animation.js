
'use strict';

const { app, BrowserWindow, screen } = require('electron');
const fs = require('fs');
const path = require('path');

let birdWindow = null;
const WIN_WIDTH = 70;
const WIN_HEIGHT = 90;

function positionAboveDockOrTaskbar() {
  if (!birdWindow || birdWindow.isDestroyed()) return;

  // workArea: net desktop area after automatically removing the space taken by the os.
  const primaryDisplay = screen.getPrimaryDisplay();
  const workArea = primaryDisplay.workArea;

  // position: bottom left corner, right on top of the Dock / Taskbar
  const x = workArea.x + 12;
  const y = workArea.y + workArea.height - WIN_HEIGHT;

  birdWindow.setPosition(Math.round(x), Math.round(y), false);
}

function createBirdDesktopWindow() {
  birdWindow = new BrowserWindow({
    width: WIN_WIDTH,
    height: WIN_HEIGHT,
    transparent: true,
    frame: false,
    resizable: false,
    movable: true,
    alwaysOnTop: false, // makes the bird stay behind when another window comes on top of it
    skipTaskbar: true,
    hasShadow: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  if (process.platform === 'darwin') {
    birdWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: false });
    if (app.dock) app.dock.hide();
  }

  positionAboveDockOrTaskbar();

  // automatically updates the position if the Dock size/place changes
  screen.on('display-metrics-changed', positionAboveDockOrTaskbar);
  screen.on('display-added', positionAboveDockOrTaskbar);
  screen.on('display-removed', positionAboveDockOrTaskbar);

  const imageBase64 = fs.readFileSync(path.resolve(__dirname, 'bird.png')).toString('base64');
  const audioBase64 = fs.readFileSync(path.resolve(__dirname, 'bird_voice.m4a')).toString('base64');
  const imageUrl = `data:image/png;base64,${imageBase64}`;
  const audioUrl = `data:audio/mp4;base64,${audioBase64}`;

  const htmlContent = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
            <style>
              html, body {
                margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              background: transparent;
              user-select: none;
    }

              /* jumping at the same place */
              @keyframes kavurmaJumpInPlace {
                  0% {
                    transform: scale(1, 1) translateY(0);
                  }
                20% {
                    transform: translateY(2px) scale(1.08, 0.92);
      }
              45% {
                transform: translateY(-14px) scale(0.94, 1.12);
      }
              70% {
                transform: translateY(-17px) scale(1.04, 0.98);
      }
              85% {
                transform: translateY(-2px) scale(1.02, 0.98);
      }
              100% {
                transform: scale(1, 1) translateY(0);
      }
    }

              /* breathing when it is still */
              @keyframes kavurmaIdlePerch {
                  0%, 100% {
                    transform: scaleX(-1) translateY(0px) rotate(0deg);
                  }
      50% {
                    transform: scaleX(-1) translateY(-1.5px) rotate(-1.5deg);
      }
    }

              /* notes */
              @keyframes chirpRise {
                  0% {
                    transform: translateY(0) scale(0.6);
        opacity: 0;
                  }
      30% {
                    opacity: 1;
                  }
      100% {
                    transform: translateY(-22px) translateX(6px) scale(1.1);
        opacity: 0;
                  }
                }

    #kavurma-jumping-bird-root {
                position: fixed;
              left: 32px;
              bottom: 4px;
              width: 40px;
              height: auto;
              cursor: pointer;
              user-select: none;
              -webkit-user-drag: none;
              filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.45));
              transform-origin: bottom center;
    }

              #kavurma-jumping-bird-root.kavurma-jumping {
                animation: kavurmaJumpInPlace 0.7s cubic-bezier(0.25, 1, 0.5, 1) !important;
    }

              #kavurma-jumping-bird-img {
                width: 100%;
              height: auto;
              display: block;
              pointer-events: auto;
              user-select: none;
              -webkit-user-drag: none;
              transform: scaleX(-1);
              animation: kavurmaIdlePerch 3s ease-in-out infinite;
    }

              .kavurma-chirp-note {
                position: fixed;
              color: #fde047;
              font-size: 11px;
              font-family: serif;
              pointer-events: none;
              z-index: 1000000;
              animation: chirpRise 1.2s ease-out forwards;
              filter: drop-shadow(0 0 4px rgba(253, 224, 71, 0.85));
    }
            </style>
          </head>
          <body>
            <div id="kavurma-jumping-bird-root">
              <img id="kavurma-jumping-bird-img" src="${imageUrl}" alt="Jumping Bird" />
            </div>

            <script>
              const birdWrapper = document.getElementById('kavurma-jumping-bird-root');
              const voiceAudio = new Audio(${JSON.stringify(audioUrl)});
              voiceAudio.preload = 'auto';

              function jumpInPlace() {
                birdWrapper.classList.remove('kavurma-jumping');
              void birdWrapper.offsetWidth;
              birdWrapper.classList.add('kavurma-jumping');
      setTimeout(() => {
                birdWrapper.classList.remove('kavurma-jumping');
      }, 700);
    }

              function playChirpSound() {
      try {
                voiceAudio.currentTime = 0;
        voiceAudio.play().catch(() => { });
      } catch (e) { }
    }

              function spawnChirpNotes() {
      const rect = birdWrapper.getBoundingClientRect();
              const baseX = rect.left + rect.width * 0.65;
              const baseY = rect.top + rect.height * 0.15;
              const notes = ['♪', '♫', '✦', '✧', '♬'];

              for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                  const note = document.createElement('span');
                  note.className = 'kavurma-chirp-note';
                  note.textContent = notes[Math.floor(Math.random() * notes.length)];
                  note.style.left = baseX + (Math.random() * 12 - 6) + 'px';
                  note.style.top = baseY + (Math.random() * 8 - 4) + 'px';
                  document.body.appendChild(note);
                  setTimeout(() => note.remove(), 1200);
                }, i * 140);
      }
    }

    birdWrapper.addEventListener('click', (e) => {
                e.stopPropagation();
              jumpInPlace();
              playChirpSound();
              spawnChirpNotes();
    });
            </script>
          </body>
        </html>`;

  birdWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));
}

app.whenReady().then(createBirdDesktopWindow);
app.on('window-all-closed', () => app.quit());
