import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/nodechallenge');

mongoose.Promise = global.Promise;

export default mongoose;