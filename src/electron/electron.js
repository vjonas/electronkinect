// src/electron/electron.js
//IPC inter process communication works like a message broker and handles the messages send from render-processes.
//var ipc = require('ipc');
const { app, BrowserWindow, Menu } = require('electron');
var exec = require('child_process').exec;
//const { ipcRenderer } = window.require('electron');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let server
let spawn, ls;
let cmd;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 1200, height: 720 })

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed. 
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

//creates electron menu
function createMenu() {
  //creates an electron menu
  const menuTemplate =
    [
      {
        label: "start",
        submenu:
        [
          {
            label: 'startkinect', click: () => { startKinect() }
          },
          {
            type: 'separator'
          },
          {
            label: 'quit', click: () => { app.quit() }
          }
        ]
      }
    ]
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

function startKinect() {
  //spawn a child process to receive the kinect data
  const { spawn, exec, fork } = require('child_process')
  var child = spawn('node', ['worker.js'], { detached: true, stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });
  child.on('message', function (frame) {
    if (JSON.stringify(frame).substr(1, 1)==("0")) { //checken of de frame van het kinectprocess een bodyframe of colorframe is
      win.webContents.send('bodyFrame', frame.substr(1,frame.size)); //substring om de header (0 of 1) weg te krijgen
    }
    else if (frame.substr(0, 1)==("1")) {
      win.webContents.send('colorFrame', frame.substr(1,frame.size)) //substring om de header (0 of 1) weg te krijgen
    }
    else
    {
      console.log("algemeen childprocess log: "+frame);
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  createMenu();
  // startKinect();
}
)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
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


