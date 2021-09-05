import mongoose from 'mongoose';

// MongoDB database connection.
mongoose.connect('mongodb://localhost/nodechallenge');

mongoose.Promise = global.Promise;

export default mongoose;