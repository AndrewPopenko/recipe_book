export class User {
  constructor(
    email: string,
    id: string,
    private _token: string | null,
    private _tokenExpirationDate: Date,
  ) {}

  get token(): string | null | undefined {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}
