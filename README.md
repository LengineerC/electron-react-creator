## Electron React Creator
A simple creator to build a electron+react project.
```
new-project/
|- node_modules/        # dependencies
|- scripts/             # develop scripts
|- config/              # webpack configurations (after ejecting)
|- src/
|   |- main/            # electron main process
|   |   |- main.js      # main entry
|   |   |- preload.js   # preload script
|   |
|   |- renderer/        # electron renderer process(A React project)
|
|- dist                 # build outFile
|- release              # Application out file
```

### 🎁Install
- npm: `npm install -g erc-cli`
- yarn: `yarn global add erc-cli`

### 🚀Start to develop
- Run both of main and renderer processes: `npm run start-dev`

**If you want to run processes separately:**
- main process: `npm run start-main`
- renderer process: `npm run start-renderer`

### 📦Build
- Build as a nsis installer: `npm run gen-exe`

**Build processes separately:**
- main process: `npm run build-main`
- renderer process: `npm run build-renderer`

### 💣Eject
- You can run `npm run eject` to expose client webpack configurations, then you can edit it
- <u>**`npm run start-dev` unavailable** after ejecting.</u>


## Updating...