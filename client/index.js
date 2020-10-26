const io = require("socket.io");
const { app, BrowserWindow, ipcMain } = require('electron')

var connection;

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

ipcMain.on('server:connect', (event, address) => {
	connection = io(address);
});

io.on('get message', (msg) => {
	win.executeJavaScript(`newMessage("${msg}")`);
	console.log(msg);
});

ipcMain.on('message:send', (event, msg) => {
	connection.emit('send message', msg);
	console.log(msg);
});
