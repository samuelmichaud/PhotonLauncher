

# Library management
- [ ] Show hidden apps

# Design
- [ ] Enter key instead of 'E' in NavHelper

# UX
- [ ] Animation on fav
- [ ] Disapear animation on hide

# Features
- [P1] Settings : Detect Shadow and launch only on mobile device
- [ ] Shutdown computer
- [ ] Open source infos in a popin
- [ ] Help popin
- [ ] Launch a refresh scan at startup

# Bugs
- [ ] Crash if we add multiple time the same custom app. Should verify unicity

# Refacto & code improvment
- [P1] Big refacto & cleanup on the scanning process
- [ ] Move AppService to ts
- [ ] Input management => add custom events & move listener to components so we can have contextualized nav (for the settings popin, ...)
- [ ] Refacto listener and store updater between backgroundProcess & renderer
- [ ] Handle errors in scan & fetch (in popin)
- [ ] Throttle mousemove
- [ ] Units Tests
- [ ] Z-index constants on popins