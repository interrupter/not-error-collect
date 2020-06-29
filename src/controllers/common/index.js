export default class Common{
  static CLASS_OK = 'is-success';
	static CLASS_ERR = 'is-danger';
  static goDashboard(app) {
    document.location.assign(this.getUserAfterLoginRedirectURL(app));
  }
  static isError(e){
    return e instanceof Error;
  }
};
