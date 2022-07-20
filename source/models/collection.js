const mongoose = require('mongoose');

const CollectionSchema = new mongoose.schema({
    name: String,
	desc: String,
	img:
	{
		data: Buffer,
		contentType: String
	}
})

const Collection = new mongoose.model('Collection',CollectionSchema);

module.exports = Collection;