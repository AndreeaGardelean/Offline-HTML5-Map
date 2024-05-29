const fs = require('fs');
const paths = [];

/**
 * Retrieves all file paths from the specified directories
 * and writes the files to a file. The file paths are used for
 * adding files in the cache by the service worker
 * @param {string} directory
 */
const getFiles = (directory) => {
	const files = fs.readdirSync(directory);
	console.log(files);

	files.forEach((file) => {
		if (file == 'files.json' || file == 'registerServiceWorker.js') {
			return;
		}
		// add path to the array
		paths.push('../' + directory + file);
	});
	// write the array with the file paths to a json file
	fs.writeFileSync('public/json/files.json', JSON.stringify(paths));
};

// directories to get the file paths from
getFiles('public/icons/');
getFiles('public/json/');
getFiles('src/scripts/');
