const loginButton = document.querySelector('#login-button');
const logoutButton = document.querySelector('#logout-button');
const inventoryLink = document.querySelector('#inventory');
const ordersLink = document.querySelector('#orders');
const usersLink = document.querySelector('#users');
const registerLink = document.querySelector('#register');
const currentUser = document.querySelector('#currentUser');;
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
const accountInfo = document.querySelector('#accountInfo');
const orderHistoryLink = document.querySelector('#orderHistory');

const previewLink = document.querySelector('#preview');
const menuLink = document.querySelector('#menu');


loginButton.addEventListener('click', () => {
	let email = document.querySelector('#login-email').value;
	let password = document.querySelector('#login-password').value;
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((user) => {
			console.log('logged in', user);
		})
		.catch((error) => {
			currentUser.textContent = error;
		});
	document.querySelector('#login-email').value = '';
	document.querySelector('#login-password').value = '';
});

logoutButton.addEventListener('click', () => {
	firebase.auth().signOut().then(() => currentUser.textContent = 'Signed out.');
});


// START -- Nav Code
function myFunction() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}
// END -- Nav Code

// START - Switch content depending on the user
const checkManager = firebase.functions().httpsCallable('checkManager');
firebase.auth().onAuthStateChanged(user => {
	//logged in user sees:
	if (user) {
		logoutButton.style.display = 'block';
		loginButton.style.display = 'none';
		registerLink.style.display = 'none';
		currentUser.textContent = `Logged in as ${user.email}`;
		loginEmail.style.display = 'none';
		loginPassword.style.display = 'none';
		accountInfo.style.display = 'block';
		inventoryLink.style.display = 'none';
		ordersLink.style.display = 'none';
		usersLink.style.display = 'none';
		loginPassword.style.display = "none";
		orderHistoryLink.style.display = 'block';
		
		previewLink.style.display = "none";
		menuLink.style.display = 'block';
		
		//Managers sees:
		checkManager().then((result) => {
			if (result.data === true) {
				inventoryLink.style.display = 'block';
				ordersLink.style.display = 'block';
				usersLink.style.display = 'block';
				
				previewLink.style.display = "block";
				menuLink.style.display = 'block';
			}
		});
	}
	//Not logged in user sees:
	else {
		logoutButton.style.display = 'none';
		loginButton.style.display = 'block';
		inventoryLink.style.display = 'none';
		ordersLink.style.display = 'none';
		registerLink.style.display = 'block';
		usersLink.style.display = 'none';
		currentUser.textContent = '';
		loginEmail.style.display = 'block';
		loginPassword.style.display = 'block';
		accountInfo.style.display = 'none';
		orderHistoryLink.style.display = 'none';
		
		previewLink.style.display = "block";
		menuLink.style.display = 'none';
	}
});
// END -- Switch content depending on the user
