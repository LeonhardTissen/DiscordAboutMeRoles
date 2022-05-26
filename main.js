const emojis = ['🔴','🟠','🟡','🟢','🔵','🟣','🟤','⚫','⚪'];
const rolecontainer = document.getElementById('roles');
const newrolebutton = document.getElementById('newrolebutton');
const copybutton = document.getElementById('copybutton');
const output = document.getElementById('output');
const helpbutton = document.getElementById('helpbutton')
newrolebutton.onclick = () => {
	const newrole = prompt('Enter Role Name:');
	if (newrole !== null) {
		createRole(newrole);
	}
}
copybutton.onclick = () => {
	output.select();
	document.execCommand('copy');
	copybutton.innerText = 'Copied to clipboard!';
	setTimeout(function() {
		copybutton.innerText = 'Copy';
	}, 1000)
}
helpbutton.onclick = () => {
	event.target.remove();
	document.getElementById('help').style.display = 'block';
}
function openColorMenu() {
	const colormenu = document.createElement('div');
	colormenu.innerHTML = '<button class="colormenuclose" onclick="this.parentElement.remove();">Close</button>';
	emojis.forEach((emoji) => {
		const elem = document.createElement('span');
		elem.onclick = function() {
			document.getElementById(this.id.replace('r','')).innerText = this.innerText;
			closeColorMenu();
			updateString();
		}
		elem.classList.add('roleicondropdown');
		elem.id = 'r' + event.target.id;
		elem.innerText = emoji;
		colormenu.appendChild(elem);
	})
	colormenu.classList.add('colormenu');
	colormenu.style.left = event.clientX + 'px';
	colormenu.style.top  = event.clientY + 'px';
	document.body.appendChild(colormenu);
}
function closeColorMenu() {
	document.querySelectorAll('.colormenu').forEach(elem => elem.remove());
}
let identifier = 0;
function createRole(text) {
	const role = document.createElement('div');
	role.classList.add('role');
	role.innerHTML += `<span id="${identifier}" class="roleicon" onclick="openColorMenu()">🔴</span>${text}`;
	role.ondblclick = removeRole;
	identifier ++;
	rolecontainer.appendChild(role)
	updateString();
}
function removeRole() {
	event.target.remove();
	updateString();
}
function updateString() {
	let outputstring = '';
	document.querySelectorAll('.role').forEach((role) => {
		const str = role.innerText;
		const emoji_size = role.children[0].innerText.length;
		outputstring += '` ' + str.substring(0, emoji_size) + ' ' + str.substring(emoji_size) + ' ` '
	})
	output.value = outputstring;
}
createRole('Made by Warze')