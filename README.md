# Cotton Farm Tycoon – Expo (React Native)

Run the clicker game on iOS, Android, or web via Expo.

## Getting started

```sh
npm install
npm run start       # opens Expo dev server (choose a platform)
# or
npm run android     # launch Android emulator/device
npm run ios         # launch iOS simulator (macOS only)
npm run web         # run in Expo web runtime
```

## Notes

- State is saved locally with AsyncStorage (`cotton_clicker_save`).
- The app uses only React Native primitives—no browser APIs or Tailwind.
- If you see asset warnings about icons/splash, you can add your own under `app.json` later.
