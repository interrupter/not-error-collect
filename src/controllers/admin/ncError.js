/* global notFramework  */
class ncError extends notFramework.notController {
	constructor(app, params) {
		//notFramework.notCommon.log('init site app ', redirect, 'login');
		super(app, params);
		this.setModuleName('error');
		return this;
	}
}

export default ncError;
