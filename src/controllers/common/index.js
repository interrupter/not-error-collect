export default class Common{
  static CLASS_OK = 'is-success';
	static CLASS_ERR = 'is-danger';
  static goDashboard(app) {
    document.location.assign(this.getUserAfterLoginRedirectURL(app));
  }
  static isError(e){
    return e instanceof Error;
  }
  static LocalizeTimestamp(timestamp, offset = 0){
    let offsetLocal  = new Date().getTimeZoneOffset();
    let deltaOffset = (offsetLocal - parseInt(offset)) * 60 * 1000;
    let localDateTime = new Date(parseInt(timestamp) - deltaOffset);
    return = localDateTime.toLocaleString(window.navigator.language);
  }
};
