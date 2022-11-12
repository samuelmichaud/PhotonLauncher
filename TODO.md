

# Library management
- [P1] Onboarding
- [P1] Onboarding: Custom app from starting screen

# Design


# UX
- [P1] Add a detail page for apps with actions
- [P2] Animation on fav
- [P2] Disapear animation on hide

# Features
- [P1] Help popin
- [P2] Settings : Detect Shadow and launch only on mobile device
- [ ] Set good locale at first launch based on windows > https://stackoverflow.com/questions/46072248/node-js-how-to-detect-user-language
- [ ] Open source infos in a popin
- [ ] Shutdown computer
- [ ] Launch a refresh scan at startup

# Bugs
- [ ] Crash if we add multiple time the same custom app. Should verify unicity

# Refacto & code improvment
- [P1] Big refacto & cleanup on the scanning process
- [ ] Scan progress job reducers (remove or do something :)
- [ ] Move AppService to ts
- [ ] Refacto listener and store updater between backgroundProcess & renderer
- [ ] Handle errors in scan & fetch (in popin)
- [ ] Throttle mousemove
- [ ] Units Tests