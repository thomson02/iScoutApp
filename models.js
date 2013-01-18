// Sets up the mongodb schema
exports.configureSchema = function(Schema, mongoose) {

    var userSchema = new mongoose.Schema({
        name: String,
        email: String,
        fbid: String,
        fblink: String,
        fbimg: String
    });

    var uniqueObjectSchema = new mongoose.Schema({
        name: String,
        type: String,
        owner: String,
        ownerId: String,
        typeId: String,
        value: String, // need to convert to and from the JSON
        images:  [{ title: String, ind: Number }],
        receipt: String
    });

    var objectTypeSchema = new mongoose.Schema({
        name: String,
        parent: String,
        image: String,
        parentId: String,
        template: String,
        wallpaper: String
    });

    mongoose.model('ObjectType', objectTypeSchema);
    mongoose.model('UniqueObject', uniqueObjectSchema);
    mongoose.model('User', userSchema);
};