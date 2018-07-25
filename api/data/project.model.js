var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	caption: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	picture: {
		type: String,
		required: true
	},
	tools: {
		type: String,
		required: true
	},
	links: {
		type: [[String, String]],
		required: true
	},
	type: {
		type: String,
		required: true
	},
	bullets: {
		type: [String],
		required: false
	}
});

mongoose.model('Project', projectSchema);