const apiDomain = 'https://questioner-api.herokuapp.com/api/v1';
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
      .then(response => {
       console.table(response.body);
      })
      .catch(error => console.log(error))
  }
}