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
- npm: `npm install -g electron-react-reator`
- yarn: `yarn global add electron-react-reator`

### 🚀Start to develop
- Check cli version: `ercli --version` or `ercli -v`

- Create a new project: `ercli create <project-name>`
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
- <u>**`npm run start-dev` will disabled** after ejecting</u>


## Updating...