# Changelog

## 1.0.2

### Changes
- Mini card on a single row: the state shows in color under the name (with the exit / entry delay countdown, or the open sensor when the alarm goes off), next to the round arm / disarm buttons and the detail button. No more state pill and state line repeating each other. With `show_logo: false`, the state shield takes the logo's place.

### Maintenance
- Test for the compact layout (18 in all); screenshots regenerated.

## 1.0.1

### Changes
- New card logo: a red shield sending out radar waves on a slate background, lighter so that it stands out on dark themes.

### Maintenance
- Screenshots regenerated.

## 1.0.0

### Changes
- First release: **Alarm Card** and **Alarm Mini Card** for any alarm control panel (Alarmo, Manual…).
- State shield colored by state and mode, pulsing during the exit / entry delay and flashing when triggered.
- Arm buttons from the panel's supported features (`modes` to narrow them), Disarm / Cancel.
- Exit and entry delay countdown with a progress bar.
- Code pad (digits or text field) when the panel needs a code.
- Sensors section; arming with a sensor open asks first and forces the arming with Alarmo.
- Open and bypassed sensors, last trigger and who changed the state (Alarmo).
- Optional confirmation before disarming, collapsible sensors, detail button on the mini card.
- Visual editors, English and French.

### Maintenance
- Build, unit tests (17), Biome, jscpd, pre-commit, HACS validation and release workflows.
