const apiDomain = 'https://questioner-api.herokuapp.com/api/v1';
const errorAlert = document.querySelector('.bg-danger');
let response;
/**
 * Handle authentication and authorization
 * Login and register new accounts
 */

class Authentication{

  /**
   * Login a user
   * @param {Object} event 
   * @param {HTMLObjectElement} form
   * @returns {Object} User 
   */
  static login(event, form){
    event.preventDefault();
     const email = form["email"].value;
     const password = form["password"].value;
     const data = { email, password };
    fetch(`${apiDomain}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(response => response.json())
      .then(response => {
        if(response.status !=200){
          errorAlert.classList.remove('hide');
          errorAlert.classList.add('show');
          errorAlert.textContent = response.error;
        }
      })
      .catch(error => console.log(error))
  }
}