const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.createConnection(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.log(err)
		process.exit(1);
	}
};

module.exports = connectDB;
