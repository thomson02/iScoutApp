// Sets up the mongodb schema
exports.configureSchema = function(Schema, mongoose) {

    var userSchema = new mongoose.Schema({
        name: String,
        email: String,
        phone: String,
        mobile: String,
        patrol: {
            name: String,
            rank: String
        },
        medical: String,
        attendance: [{
            date: Date,
            points: {
                shirt: Number,
                trousers: Number,
                neckie: Number,
                belt: Number,
                shoes: Number,
                penPaper: Number,
                book: Number,
                behaviour: Number
            }
        }]
    });

    var metaDataSchema = new mongoose.Schema({
        key: String,
        value: String // JSON Formatted
    });

    mongoose.model('User', userSchema);
    mongoose.model('MetaData', metaDataSchema);
};