/* eslint-disable semi */
// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gallery = document.querySelector('.gallery');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-info-container');
const modalClose = document.querySelector('.modal-close-btn');
const employeeNumber = 12

// fetch data from API
fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err));

function displayEmployees (employeeData) {
  employees = employeeData;
  // store the employee HTML as we create it
  let employeeHTML = '';
  // loop through each employee and create HTML markup
  employees.forEach((employee, index) => {
    const name = employee.name;
    const email = employee.email;
    const city = employee.location.city;
    const picture = employee.picture;
    const state = employee.location.state
    // template literals make this so much cleaner!
    employeeHTML += `
    <div class="card" data-index="${index}">
    <div class="card-img-container">
            <img class="card-img" src="${picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${city}, ${state} </p>
        </div>
    </div>
    `
  });
  gallery.innerHTML = employeeHTML;
}
function displayModal (index) {
  // use object destructuring make our template literal cleaner
  const { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
  const date = new Date(dob.date);

  const modalHTML = `
      <img class="modal-img" src="${picture.large}" alt="profile picture">
      <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
      <p class="modal-text">${email}</p>
      <p class="modal-text cap">${city}</p>
      <hr>
      <p class="modal-text">${phone}</p>
      <p class="modal-text">${street.name} ${street.number}, ${state} ${postcode}</p>
      <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    `

  overlay.classList.remove('hidden');
  modalContainer.innerHTML = modalHTML;
}

modalClose.addEventListener('click', () => {
  overlay.classList.add('hidden');
});

const index = ''
gallery.addEventListener('click', e => {
  // make sure the click is not on the gridContainer itself
  // select the card element based on its proximity to actual element clicked
  const card = e.target.closest('.card');
  console.log(card)
  const index = card.getAttribute('data-index')
  displayModal(index);
})

// // PREVIOUS AND NEXT BUTTONS FOR MODAL
// document.addEventListener('click', (e) => {
//   if (e.target && e.target.id === 'modal-next') {
//     document.querySelector('.modal').style.classList = 'hidden';
//     if (employeeNumber <= 10) {
//       displayModal(employeeNumber + 1);
//     } else {
//       displayModal(0);
//     }
//   } else if (e.target && e.target.id === 'modal-prev') {
//     document.querySelector('.modal').style.classList = 'hidden';
//     if (employeeNumber === 0) {
//       displayModal(11);
//     } else {
//       displayModal(employeeNumber - 1);
//     }
//   }
// });
