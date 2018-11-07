const path = require('path');
module.exports = {
	name: 'not-error-collect',
	paths: {
		routes:				path.join(__dirname, 'routes'),
		controllers:	path.join(__dirname, 'controllers'),
		models:				path.join(__dirname, 'models'),
		//views:				path.join(__dirname, 'src', 'views'),
		templates:		path.join(__dirname, 'templates'),
		//locales:			path.join(__dirname, 'src', 'locales')
	}
};
