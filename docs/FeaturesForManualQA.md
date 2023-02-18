
# UX
- Empty library should display a welcoming message + scan button
- Detect input type (keyboard, mouse, gamepad) and change help bar below accordingly, based on the view/popin
- Focus item should always have a "glowing border"
- Navigating between apps in grid must autoscroll for keyboard & gamedpad but not for mouse

# Responsive 
- If screen ratio is less than 3/2, the GRID of apps MUST be 2 rows
- If screen ratio is less than 1/1, the GRID of apps MUST be 1 rows (portrait mode)
- The size of everything (font, buttons, ...) depends on the DPI of the screen. Higher DPI meens bigger. So it's not too small on a 4K TV, neither on a 4k phone.

# Navigation
- Keyboard nav with arrow & enter
- Gamepad navigation
- Mouse (clic & scroll)

## Features
- Launch at startup settings
- Language settings
- Settings must be saved between launches (stored in a file in user's folder)

# Favourite
- Fav app have a heart icon in grid
- Favourites app should always be first in grid
- Add to favourite add the app the very first (because if you add a game to your favourite it's a new game you want to play with)

# Hide app
- Hide app feature
- Hidden app are not displaid unless the toggle at the end of library is triggered
- Toggle button to display hidden apps is not shown if there is no hidden app

# Scanning process
- Scan games from multiple external launchers
- When a steam game is detected, a Steam big picture app is added to library
- The scan process show a popin
- The popin close by itself at the end of the scan

# Adding custom app
- Add custom app is possible only with a mouse, button must be disabled for keyboard navigation
- After a adding a custom app, an image should be retreived from internet (RAWG.io)
- The custom app selection filter for .exe, .url & .lnk.
- The name of the custom app is cleaned of the extension

## Add custom background image
- Add custom background image is possible only with a mouse, button must be disabled for keyboard navigation
- The button to add custom image MUST not be focused by default when the popin open
- The filer MUST filter image extensions to : ".jpg", ".jpeg", ".png", ".webp", ".svg", ".apng"
- Custom image MUST NOT be removed & replaced by a new scan


# App launch
- The tile & launch button must be disable for 10s after a launch to avoid multiple app launch

# Shortcuts
- Escape key close any popin
- Clic on blured overlay should close any popin
- with a gamepad, alt+tab is done with start/select + RB/LB