const { app, BrowserWindow, ipcMain } = require('electron')

var win;

function createWindow() {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	win.loadFile('frontend/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
});

var socket;

ipcMain.on('server:connect', (event, address) => {
	socket = require('socket.io-client')(address);

	socket.on('get msg', (msg) => {
		win.executeJavaScript(`newMessage("${msg}")`);
		console.log(msg);
	});
});

ipcMain.on('message:send', (event, msg) => {
	socket.emit('send msg', msg);
	console.log(msg);
});
