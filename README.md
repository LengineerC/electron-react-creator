## Electron React Creator
A simple creator to build a electron+react project.
```
new-project/
|- node_modules/        #dependencies
|- scripts/             #develop scripts
|- config/              #webpack configurations
|- src/
    |- main/            #electron main process
    |   |- main.js      #main entry
    |   |- preload.js   #preload script
    |
    |- renderer/        #electron renderer process(A React project)
```

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


## Updating...