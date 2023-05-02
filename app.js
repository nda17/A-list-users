//Globals:
let userSelect = document.getElementById('users-list');
const userInformation = document.getElementById('user-information');
const usersInformationBlock = document.querySelector('.user-information');
const getUsersButton = document.querySelector('.get-users');
let users = []; //Полученые данные с сервера
let comments = []; //Полученые данные с сервера

//Attach events:
getUsersButton.addEventListener('click', initApp);

//Detach events:
function removeListenerButton() {
	document.querySelector('.get-users').removeEventListener('click', initApp);
}

//Basic logic:
//Функция показа модального окна с ошибкой:
function modalAlertError(error) {
        const parentElement = document.querySelector('body');
        const modalContainer = document.createElement('div');
        const modalContent = document.createElement('div');
        const modalClose = document.createElement('span');
        const modalText = document.createElement('p');
        modalContainer.className = 'modal';
        modalContent.className = 'modal__content';
        modalClose.className = 'modal__close-btn';
        modalText.className = 'modal__text';
        modalClose.innerHTML = '&times;';
        modalText.innerHTML = `${error}`;
        modalContainer.append(modalContent);
        modalContent.append(modalClose);
        modalContent.append(modalText);
        parentElement.append(modalContainer);
        modalClose.addEventListener('click', removeModalError);
}

//Функция закрытию модального окна с ошибкой:
function removeModalError() {
    const modalContainer = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal__close-btn');
    modalClose.removeEventListener('click', removeModalError);
    modalContainer.remove();
}

//Функция обновления изменений в карточке пользователя в массиве users:
function updateUserInformation(
	userId,
	name,
	email,
	phone,
	username,
	website,
	street,
	suite,
	city,
	company
) {
	users.map(user => {
		if (user.id === Number(userId)) {
			user.name = name;
			user.email = email;
			user.phone = phone;
			user.username = username;
			user.website = website;
			user.address.street = street;
			user.address.suite = suite;
			user.address.city = city;
			user.company.name = company;
		}
	});
	printUserUpdate(userId);
}

//Функция обновления HTML разметки после редактирования и сохранения изменений в карточке пользователя:
function printUserUpdate(userId) {
	const user = users.filter(user => user.id === Number(userId));
	hideUser();
	printUser(user);
	cancelChangeForm();
	userSelect
		.querySelectorAll('option:not([selected])')
		.forEach(user => user.remove());
	users.forEach(user => createUsersList(user));
	userSelect.options[userId].selected = true;
}

//Функция показа стандартного выбора в select
function userSelectDefault() {
	userSelect.options[0].selected = true;
}

//Функция удаления пользователя из HTML разметки после сохранения изменений на сервере:
function deleteUserHtml(userId) {
	users = users.filter(user => user.id !== Number(userId));
	hideUser();
	userSelect.removeChild(userSelect.querySelector(`[value="${userId}"]`));
	userSelectDefault();
}

//Функция отмены изменений и возврата на предыдущий шаг в карточке пользователя при нажатии кнопки Cancel:
function cancelChangeForm() {
	const form = document.querySelector('.user-information__form');
	const cancelChangesButton = form.querySelector('.cancel-changes');
	cancelChangesButton.removeEventListener('click', cancelChangeForm);
	form.remove();
	hideUserInformation();
}

//Функция cкрытия блока с информацией о пользователе при нажатии кнопки редактирования данных:
function hideUserInformation() {
	usersInformationBlock.classList.toggle('hide-user-information');
}

//Функция cкрытия кнопки запроса пользователей:
function hideButton() {
	getUsersButton.style.position = 'absolute';
	getUsersButton.style.top = '-100px';
	getUsersButton.style.transition = 'all ease 1.5s';
	setTimeout((repeat = () => (getUsersButton.style.display = 'none')), 1500);
	setTimeout(createButtonAddNewUser, 1100);
}

//Функция удаления блока HTML с информацией о пользователе перед показом информации о новом пользователе:
function hideUser() {
	const userInformationActive = userInformation.querySelector(
		'.user-information__active'
	);
	if (userInformationActive) {
		userInformationActive.remove();
	}
}

//Функция отрисовки блока HTML c формой редактирования информации о выбранном пользователе:
function createFormEditUser({
	name,
	email,
	username,
	phone,
	address,
	company,
	website,
}) {
	const main = document.querySelector('main');
	const blockForm = document.createElement('div');
	blockForm.className = 'user-information__form';

	//Заголовок:
	const title = document.createElement('h2');
	title.className = 'user-information__title';
	title.innerText = 'User card editing:';

	//Форма:
	const form = document.createElement('form');
	form.className = 'user-information__form-edit';
	form.autocomplete = 'off';

	//Поля ввода формы:
	const inputHintName = document.createElement('p');
	inputHintName.innerText = 'Editing full name:';
	inputHintName.className = 'input-hint';
	const inputName = document.createElement('input');
	inputName.className = 'input-name';
	inputName.type = 'text';
	inputName.placeholder = 'Enter full name';
	inputName.value = `${name}`;

	const inputHintUsername = document.createElement('p');
	inputHintUsername.innerText = 'Editing username:';
	inputHintUsername.className = 'input-hint';
	const inputUsername = document.createElement('input');
	inputUsername.className = 'input-username';
	inputUsername.type = 'text';
	inputUsername.placeholder = 'Enter username';
	inputUsername.value = `${username}`;

	const inputHintEmail = document.createElement('p');
	inputHintEmail.innerText = 'Editing Email:';
	inputHintEmail.className = 'input-hint';
	const inputEmail = document.createElement('input');
	inputEmail.className = 'input-email';
	inputEmail.type = 'email';
	inputEmail.placeholder = 'Enter Email';
	inputEmail.value = `${email}`;

	const inputHintPhone = document.createElement('p');
	inputHintPhone.innerText = 'Editing phone number:';
	inputHintPhone.className = 'input-hint';
	const inputPhone = document.createElement('input');
	inputPhone.className = 'input-phone';
	inputPhone.type = 'tel';
	inputPhone.placeholder = 'Enter phone number';
	inputPhone.value = `${phone}`;

	const inputHintCity = document.createElement('p');
	inputHintCity.innerText = 'Editing city:';
	inputHintCity.className = 'input-hint';
	const inputCity = document.createElement('input');
	inputCity.className = 'input-city';
	inputCity.type = 'text';
	inputCity.placeholder = 'Enter city';
	inputCity.value = `${address.city}`;

	const inputHintStreet = document.createElement('p');
	inputHintStreet.innerText = 'Editing street:';
	inputHintStreet.className = 'input-hint';
	const inputStreet = document.createElement('input');
	inputStreet.className = 'input-street';
	inputStreet.type = 'text';
	inputStreet.placeholder = 'Enter street';
	inputStreet.value = `${address.street}`;

	const inputHintSuite = document.createElement('p');
	inputHintSuite.innerText = 'Editing suite:';
	inputHintSuite.className = 'input-hint';
	const inputSuite = document.createElement('input');
	inputSuite.className = 'input-suite';
	inputSuite.type = 'text';
	inputSuite.placeholder = `Enter suite`;
	inputSuite.value = `${address.suite}`;

	const inputHintCompany = document.createElement('p');
	inputHintCompany.innerText = 'Editing company name:';
	inputHintCompany.className = 'input-hint';
	const inputCompany = document.createElement('input');
	inputCompany.className = 'input-company';
	inputCompany.type = 'text';
	inputCompany.placeholder = 'Enter company name';
	inputCompany.value = `${company.name}`;

	const inputHintWebsite = document.createElement('p');
	inputHintWebsite.innerText = 'Editing website adress:';
	inputHintWebsite.className = 'input-hint';
	const inputWebsite = document.createElement('input');
	inputWebsite.className = 'input-website';
	inputWebsite.type = 'text';
	inputWebsite.placeholder = 'Enter website address';
	inputWebsite.value = `${website}`;

	//Блок с кнопками формы:
	const div = document.createElement('div');
	div.className = 'button-form';

	const resetButton = document.createElement('button');
	resetButton.innerText = 'Clear';
	resetButton.type = 'reset';
	resetButton.className = 'reset-changes';

	const cancelChangesButton = document.createElement('button');
	cancelChangesButton.innerText = 'Cancel changes';
	cancelChangesButton.type = 'button';
	cancelChangesButton.className = 'cancel-changes';
	cancelChangesButton.addEventListener('click', cancelChangeForm);

	const saveChangesButton = document.createElement('button');
	saveChangesButton.innerText = 'Save changes';
	saveChangesButton.type = 'submit';
	saveChangesButton.className = 'save-changes';
	saveChangesButton.addEventListener('click', handleSaveChanges);

	main.append(blockForm);
	blockForm.append(title);
	blockForm.append(form);
	form.append(inputHintName);
	form.append(inputName);
	form.append(inputHintUsername);
	form.append(inputUsername);
	form.append(inputHintEmail);
	form.append(inputEmail);
	form.append(inputHintPhone);
	form.append(inputPhone);
	form.append(inputHintCity);
	form.append(inputCity);
	form.append(inputHintStreet);
	form.append(inputStreet);
	form.append(inputHintSuite);
	form.append(inputSuite);
	form.append(inputHintCompany);
	form.append(inputCompany);
	form.append(inputHintWebsite);
	form.append(inputWebsite);
	form.append(div);
	div.append(resetButton);
	div.append(cancelChangesButton);
	div.append(saveChangesButton);
}

//Функция отрисовки блока HTML c информацией о выбранном пользователе:
function printUser([
	{ id, name, email, username, phone, address, company, website },
]) {
	const li = document.createElement('li');
	li.className = 'user-information__active';
	li.dataset.id = id;
	li.innerHTML = `<p class='user-information__content'>Name: ${name}<br>Username: ${username}<br>Email: ${email}<br>Phone: ${phone}<br>City: ${address.city}<br>Street: ${address.street}<br>Suite: ${address.suite}<br>Company: ${company.name}<br>Website: ${website}</p>`;
	const userInformationContent = li.querySelector('.user-information__content');

	const close = document.createElement('span');
	close.className = 'user-information__close';
	close.innerHTML = '&#8617;';
	close.addEventListener('click', handleClose);

	const edit = document.createElement('span');
	edit.className = 'user-information__edit';
	edit.innerHTML = '&#9998;';
	edit.addEventListener('click', handleEdit);

	const remove = document.createElement('span');
	remove.className = 'user-information__delete';
	remove.innerHTML = '&#128465;';
	remove.addEventListener('click', handleDelete);

	userInformation.append(li);
	userInformationContent.append(close);
	userInformationContent.append(edit);
	userInformationContent.append(remove);
}

//Функция отрисовки выпадающего списка с пользователями:
function createUsersList(user) {
	const option = document.createElement('option');
	option.value = user.id;
	option.innerText = user.name;
	userSelect.append(option);
}

//Event logic:
//Функция инициализации приложения:
function initApp() {
	Promise.all([getUsers(), getComments()]).then(values => {
		[users, comments] = values;

		users.forEach(user => createUsersList(user));
		document
			.getElementById('users-list')
			.addEventListener('click', handleActiveUser);
	});

	removeListenerButton();
	hideButton();
}

//Функция обработки клика по кнопке сохранения изменений в карточке пользователя:
function handleSaveChanges(event) {
	event.preventDefault();
	const form = document.querySelector('.user-information__form-edit');
	const userId = userInformation.querySelector('.user-information__active')
		.dataset.id;
	const name = form.querySelector('.input-name').value;
	const username = form.querySelector('.input-username').value;
	const email = form.querySelector('.input-email').value;
	const street = form.querySelector('.input-street').value;
	const suite = form.querySelector('.input-suite').value;
	const city = form.querySelector('.input-city').value;
	const company = form.querySelector('.input-company').value;
	const phone = form.querySelector('.input-phone').value;
	const website = form.querySelector('.input-website').value;
	saveChangesUser(
		userId,
		name,
		email,
		phone,
		username,
		website,
		street,
		suite,
		city,
		company
	);
}

//Функция обработки клика по кнопке удаления карточки пользователя:
function handleDelete() {
	const userId = userInformation.querySelector('.user-information__active')
		.dataset.id;
	deleteUser(userId);
}

//Функция обработки клика по кнопке редактирования информации в карточке пользователя:
function handleEdit() {
	const userId = userInformation.querySelector('.user-information__active')
		.dataset.id;
	const user = users.find(user => user.id === Number(userId));
	createFormEditUser(user);
	hideUserInformation();
}

//Функция обработки клика по кнопке закрытия карточки пользователя:
function handleClose() {
	document.querySelector('.user-information__active').remove();
	userSelectDefault();
}

//Функция обработки клика по выбранному пользователю:
function handleActiveUser(event) {
	const target = Number(event.target.value);
	if (target) {
		const user = users.filter(user => user.id === target);
		hideUser();
		printUser(user);
	}
}

//Async logic:
//Запрос всех пользователей:
async function getUsers() {
	try {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/users?_limit=10'
		);
		const data = response.json();
		// const data = await response.json();
		// console.log(data);
		return data;
	} catch (error) {
		modalAlertError(error);
	}
}

//Запрос всех комментариев:
async function getComments() {
	try {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/comments?_limit=10'
		);
		const data = response.json();
		// const data = await response.json();
		// console.log(data);
		return data;
	} catch (error) {
		modalAlertError(error);
	}
}

//Изменение данных в карточке пользователя:
async function saveChangesUser(
	userId,
	name,
	email,
	phone,
	username,
	website,
	street,
	suite,
	city,
	company
) {
	try {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/users/${userId}`,
			{
				method: 'PUT',
				body: JSON.stringify({
					name: name,
					username: username,
					email: email,
					phone: phone,
					website: website,
					address: {
						street: street,
						suite: suite,
						city: city,
					},
					company: {
						name: company,
					},
				}),
				headers: {
					'Content-type': 'application/json', //Ожидание ответа в виде  json строки
				},
			}
		);

		// const data = await response.json();
		// console.log(data);
		if (response.ok) {
			updateUserInformation(
				userId,
				name,
				email,
				phone,
				username,
				website,
				street,
				suite,
				city,
				company
			);
		}
		if (!response.ok) {
			throw new Error('Failed to connect width the server! Please try later.'); //Ошибка если ответ сервера отрицательный
		}
	} catch (error) {
		modalAlertError(error);
	}
}

//Удаление карточки пользователя:
async function deleteUser(userId) {
	try {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/users/${userId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json', //Ожидание ответа в виде  json строки
				},
			}
		);

		if (response.ok) {
			deleteUserHtml(userId); //Если действие выполнено, вызов функции удаления пользователя в HTML
		} else {
			throw new Error('Failed to connect width the server! Please try later.');
		}
	} catch (error) {
		modalAlertError(error);
	}
}
