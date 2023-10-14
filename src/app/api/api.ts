export class Api {
  static readonly authUrl = 'https://identitytoolkit.googleapis.com';
  static readonly apiVersion = '/v1';
  static readonly signup = Api.authUrl + Api.apiVersion + '/accounts:signUp';
  static readonly signin =
    Api.authUrl + Api.apiVersion + '/accounts:signInWithPassword';
  static readonly key = 'AIzaSyDc-ZRzBF7KxP9R6P36EK0g50WIoj7NqNg';
  static readonly baseUrl =
    'https://ng-course-recipe-book-79a0e-default-rtdb.europe-west1.firebasedatabase.app';
}
