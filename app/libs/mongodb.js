var mongoose = require('mongoose');
var mongoUrl = process.env.MONGODB_URL || 'mongodb://leonardo:q1w2e3@ds025379.mlab.com:25379/blogjs';

mongoose.connect(mongoUrl);
