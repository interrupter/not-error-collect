const path = require('path');
module.exports = {
	name: 'not-error-collect',
	paths: {
		routes:				path.join(__dirname, 'src', 'routes'),
		controllers:	path.join(__dirname, 'src', 'controllers'),
		models:				path.join(__dirname, 'src', 'models'),
		//views:				path.join(__dirname, 'src', 'views'),
		templates:		path.join(__dirname, 'src', 'templates'),
		//locales:			path.join(__dirname, 'src', 'locales')
	}
};
