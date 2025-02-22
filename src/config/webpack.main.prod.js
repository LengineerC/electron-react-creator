const path=require('path');
const process=require("process");

module.exports={
    target:"electron-main",
    mode:"production",
    entry:{
        main:path.resolve(process.cwd(),"./src/main/main.js"),
        preload:path.resolve(process.cwd(),"./src/main/preload.js"),
    },
    optimization:{
        minimize: true,
        // minimizer: [new TerserWebpackPlugin()], 
    },
    output: {
        path: path.resolve(process.cwd(), "./dist/main"),
        filename: "[name].js",
    },
    // resolve:{
    //     alias:{
    //         electron:require.resolve('electron'),
    //     },
    // },
};