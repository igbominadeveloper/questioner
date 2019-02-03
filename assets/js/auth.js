// const apiDomain = 'https://questioner-api.herokuapp.com/api/v1';
const apiDomain = 'http://localhost:3000/api/v1';
const alertWrapper = document.querySelector('.alert-wrapper');
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
   */
  static login(event, form){
    event.preventDefault();
     let email = form["email"].value;
     let password = form["password"].value;
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
        if(response.error){
          const errorTemplate = `
            <div class="alert card">
              <i class="alert-icon fa fa-warning text-danger p-20"></i>
              <p class="alert-text text-primary">${ response.error }</p>
            </div>
          `;
          alertWrapper.classList.remove('hide');
          alertWrapper.innerHTML = errorTemplate;
          setTimeout(() => {
            alertWrapper.classList.add('hide');
            form["password"].value = '';
          }, 2000);
        }
        const user = response.data[0].user;
        const token = response.data[0].token;
        const successTemplate = `
            <div class="alert card">
              <i class="alert-icon fa fa-check text-primary p-20"></i>
              <p class="alert-text text-primary">Welcome back ${ user.firstname} ${ user.lastname }</p>
            </div>
          `;
        this.setState(token, user);
        alertWrapper.classList.remove('hide');
          alertWrapper.innerHTML = successTemplate;
          setTimeout(() => {
            alertWrapper.classList.add('hide');
          }, 2000);
      })
      .catch(error => console.log(error))
  }

  /**
   * 
   * @method register 
   * @param {event} event 
   * @param {HTMLObjectElement} form 
   */
  static register(event, form){
    event.preventDefault();
     let email = form["email"].value;
     let password = form["password"].value;
     let password_confirmation = form["password_confirmation"].value;
     if (password !== password_confirmation) {
      const errorTemplate = `
        <div class="alert card">
          <i class="alert-icon fa fa-warning text-danger p-20"></i>
          <p class="alert-text text-primary">Passwords don't match</p>
        </div>
      `;
       alertWrapper.classList.remove('hide');
       alertWrapper.innerHTML = errorTemplate;
       setTimeout(() => {
         alertWrapper.classList.add('hide');
         form["password"].value = '';
         form["password_confirmation"].value = '';
       }, 2000);
       return;
     }
     let firstname = form["firstname"].value;
     let lastname = form["lastname"].value;
     const data = { email, password, firstname, lastname };
    fetch(`${apiDomain}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(response => response.json())
      .then(response => {
        if(response.error){
          const errorTemplate = `
            <div class="alert card">
              <i class="alert-icon fa fa-warning text-danger p-20"></i>
              <p class="alert-text text-primary">${ response.error }</p>
            </div>
          `;
          alertWrapper.classList.remove('hide');
          alertWrapper.innerHTML = errorTemplate;
          setTimeout(() => {
            alertWrapper.classList.add('hide');
            form["password"].value = '';
          }, 2000);
        }
        const user = response.data[0].user;
        const token = response.data[0].token;
        const successTemplate = `
            <div class="alert card">
              <i class="alert-icon fa fa-check text-primary p-20"></i>
              <p class="alert-text text-primary">Thanks for signing up ${ user.firstname} ${ user.lastname }</p>
            </div>
          `;
        this.setState(token, user);
        alertWrapper.classList.remove('hide');
          alertWrapper.innerHTML = successTemplate;
          setTimeout(() => {
            alertWrapper.classList.add('hide');
          }, 2000);
      })
      .catch(error => console.log(error))
  }

  static setState(token, user) {
    if (this.getState() !== '') {
      this.removeState();
    }
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  static removeState() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static getState() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return { token, user };
  }

  static isLoggedIn() {
    if(this.getState() === ''){
      return false;
    }
    else if (this.getState()){
      return true;
    }
  }
}