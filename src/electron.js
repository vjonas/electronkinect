const { app, BrowserWindow, Menu, path, ipcMain } = require('electron');
const { spawn, exec, fork } = require('child_process');
const fs = require('fs');

//var workerjsScript = require(`${__dirname}/worker.js`);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let server
let cmd;
let child;
let colorWorkerChild;
let colorProcessing = false;
var interval;

function createWindow() {
    win = new BrowserWindow({ width: 1200, height: 720 })

    // and load the index.html of the app.
    //win.loadURL(`file://${__dirname}/index.html`)
    win.loadURL(`file:///${__dirname}/index.html`);
    win.maximize();

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed. 
    win.on('close', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
        if (child != null) child.kill();
    })
}

//creates electron menu
function createMenu() {
    //creates an electron menu
    const menuTemplate = [{
            label: "start",
            submenu: [{
                    label: 'startkinect',
                    click: () => { startKinect(false) }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'record kinect mockdata',
                    click: () => { startKinect(true) }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'quit',
                    click: () => {
                        if (child != null) child.kill();
                        app.quit();
                    }
                }
            ],

        },
        {
            label: "mock",
            submenu: [{
                    label: "arrow to the knee",
                    click: () => { streamMockFile(0) }
                },
                {
                    label: "full test",
                    click: () => { streamMockFile(1) }
                },
                {
                    label: "full test fast",
                    click: () => { streamMockFile(2) }
                },
                {
                    label: "testje voor de zekerheid",
                    click: () => { streamMockFile(3) }
                }
            ]
        }
    ]
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

function streamMockFile(id) {
    var counter = 0;;
    clearInterval(interval);
    if (child != null) {
        child.kill();
    }
    if (id === 0) {
        var array = require('./assets/arrow-to-the-knee2.json');
    }
    if (id === 1) {
        var array = require('./assets/full-test.json');
    }
    if (id === 2) {
        var array = require('./assets/full-test-fast.json');
    }
    if (id === 3) {
        var array = require('./assets/testje-voor-de-zekerheid.json');
    }
    interval = setInterval(function() {
        if (counter < array.length && win != null) {
            win.webContents.send("bodyFrame", JSON.stringify(array[counter]));
            counter++;
        } else {
            clearInterval(interval);
        }
    }, 1000 / 30);
}

function startKinect(mock) {
    clearInterval(interval);
    var setBeginningOfJson = true;
    //child = spawn('node', [`${__dirname}/worker.js`], { detached: true, stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });
    if (child != null) {
        child.kill();
    }
    child = spawn('node', [`${__dirname}/worker.js`], { detached: true, stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });
    child.on('message', function(frame) {
        if (child != null && win != null) {
            win.webContents.send('bodyFrame', frame); //substring om de header (0 of 1) weg te krijgen      
        }
        if (mock) {
            if (setBeginningOfJson) {
                fs.appendFile('./src/assets/mockdata.json', "[");
                setBeginningOfJson = false;
            }
            fs.appendFile('./src/assets/mockdata.json', frame + ",");
        }
    });
    child.stderr.on('data', err => {
        win.webContents.send('log', (err) + "stderr child");
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
    createMenu();
    startKinect(false);
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (child != null) child.kill();
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('before-quit', () => {

    console.log("app.exit");
    if (child != null) child.kill();
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//listen to messages from a render proces, does not matter which and we don't have to know