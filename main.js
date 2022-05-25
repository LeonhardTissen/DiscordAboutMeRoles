const emojis = ['🔴','🟠','🟡','🟢','🔵','🟣','🟤','⚫','⚪']
const rolecontainer = document.getElementById('roles')
const newrolebutton = document.getElementById('newrolebutton');
const output = document.getElementById('output')
newrolebutton.onclick = () => {
	createRole(prompt('Enter Role Name:'))
}
function openColorMenu() {
	const colormenu = document.createElement('div');
	colormenu.innerHTML = '<button class="colormenuclose" onclick="this.parentElement.remove();">Close</button>'
	emojis.forEach((emoji) => {
		const elem = document.createElement('span')
		elem.onclick = function() {
			document.getElementById(this.id.replace('r','')).innerText = this.innerText;
			closeColorMenu();
			updateString();
		}
		elem.classList.add('roleicondropdown')
		elem.id = 'r' + event.target.id
		elem.innerText = emoji;
		colormenu.appendChild(elem);
	})
	colormenu.classList.add('colormenu');
	colormenu.style.left = event.clientX + 'px';
	colormenu.style.top  = event.clientY + 'px';
	document.body.appendChild(colormenu)
}
function closeColorMenu() {
	const colormenus = document.querySelectorAll('.colormenu')
	colormenus.forEach(elem => elem.remove())
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
	let outputstring = ''
	document.querySelectorAll('.role').forEach((role) => {
		const str = role.innerText;
		let emoji_size;
		if (['⚫','⚪'].includes(role.children[0].innerText)) {
			emoji_size = 1;
		} else {
			emoji_size = 2;
		}
		outputstring += '` ' + str.substring(0, emoji_size) + ' ' + str.substring(emoji_size) + ' ` '
	})
	output.value = outputstring;
}
createRole('Made by Warze')