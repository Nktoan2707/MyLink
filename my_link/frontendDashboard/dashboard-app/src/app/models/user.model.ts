export class User {
  constructor(
    public id?: string,
    public email?: string,
    public username?: string,
    private _token?: string,
    private _tokenExpirationDate?: string
  ) {}

  get token() {
    if (
      !this._tokenExpirationDate ||
      new Date() > new Date(this._tokenExpirationDate)
    ) {
      return null;
    }
    return this._token;
  }
}
