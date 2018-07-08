class Auth {
    
      /**
       * Authenticate a user. Save a token string in Local Storage
       *
       * @param {string} token
       */
      static authenticateUser(token) {
        localStorage.setItem('token', token);
      }


      /**
       * Authenticate a user. Save a token string in Local Storage
       *
       * @param {string} username
       */
      

      static addUserName(username) {
        localStorage.setItem('userName',username);
      }
      
    
      /**
       * Check if a user is authenticated - check if a token is saved in Local Storage
       *
       * @returns {boolean}
       */
      static isUserAuthenticated() {
        return localStorage.getItem('token') !== undefined &&  localStorage.getItem('token') !== null;
      }
    
      /**
       * Deauthenticate a user. Remove a token from Local Storage.
       *
       */
      static deauthenticateUser() {
        localStorage.removeItem('token');
      }
    
      /**
       * Get a token value.
       *
       * @returns {string}
       */
    
      static getToken() {
        return localStorage.getItem('token');
      }
    
        /**
       * Get a token value.
       *
       * @returns {string}
       */

       static getUserName() {
         return localStorage.getItem('userName');
       }

       static removeUSerName() {
         localStorage.removeItem('userName');
       }
    

    }
    
    export default Auth;
    