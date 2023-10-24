import { Key } from './key';

export class Api {
  static readonly authUrl = 'https://identitytoolkit.googleapis.com';
  static readonly apiVersion = '/v1';
  static readonly signup = Api.authUrl + Api.apiVersion + '/accounts:signUp';
  static readonly signin =
    Api.authUrl + Api.apiVersion + '/accounts:signInWithPassword';
  static readonly databaseURL =
    'https://ng-course-recipe-book-79a0e-default-rtdb.europe-west1.firebasedatabase.app';
  static readonly key = Key.key;
}
