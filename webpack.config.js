const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/BidirectionalMap.js',
	output: {
		filename: `bidirectional-map.min.js`,
		libraryExport: 'default',
		libraryTarget: 'umd',
		globalObject: 'this',
		path: path.resolve(__dirname, 'dist'),
	},
};
