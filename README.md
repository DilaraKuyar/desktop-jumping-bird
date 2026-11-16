# desktop jumping bird

a small bird animation which jumps and sings on the bottom left corner of your desktop (right above the Dock / Taskbar).

### what it does?

- sits quietly on the desktop and breathes slightly when it is still.
- jumps at the same place, plays a bird sound and shows little music notes when you click on it.
- stays behind other windows when you open something on top of it, and doesn't show up on full screen apps.

---

### how to use (without coding) 

you can download the ready app from the **Releases** section on the right side, unzip it and just double click on `Bird` to open.

sağ taraftaki **Releases** kısmından hazır uygulamayı indirip zip'ten çıkararak direkt çift tıklayıp açabilirsin.

### how to run from code / koddan çalıştırma

if you cloned the repo:

```bash
npm install
npm start
```

to close the bird:

```bash
npm stop
```

to build the `.app` or `.exe` yourself / uygulamayı paketlemek için:

```bash
npm run build:mac
npm run build:win
```
