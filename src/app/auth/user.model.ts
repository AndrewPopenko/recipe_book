export class User {
  constructor(
    private _email: string,
    private _id: string,
    private _token: string | null,
    private _tokenExpirationDate: Date,
  ) {}

  get token(): string | null | undefined {
    if (!this._token) {
      return null;
    }
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }

  get email(): string {
    return this._email;
  }

  get id(): string {
    return this._id;
  }
}
