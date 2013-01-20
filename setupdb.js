/**
 * Created with JetBrains WebStorm.
 * User: thomson02
 * Date: 19/01/2013
 * Time: 15:21
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var models = require('./models');

models.configureSchema(mongoose.Schema, mongoose);
var db = mongoose.createConnection("mongodb://heroku_app11090846:qm6nh3haadk63pq84f7vn35u92@ds049347.mongolab.com:49347/heroku_app11090846");

var User = db.model('User');
var MetaData = db.model('MetaData');

User.collection.remove();
MetaData.collection.remove();

// Dummy User Data
var andrew = new User({
    name: "Andrew Thomson",
    email: "andrew@gotwoggle.com",
    phone: "01698XXXXXX",
    mobile: "07764491827",
    patrol: {
        name: "Stag",
        rank: "SPL"
    },
    medical: "N/A",
    attendance: [
        {
            date: new Date(2013, 0, 15),
            points: {
                shirt: 5,
                trousers: 5,
                neckie: 5,
                belt: 5,
                shoes: 5,
                woggle: 0,
                penPaper: 5,
                book: 5,
                behaviour: 5
            }
        },
        {
            date: new Date(2013, 0, 22),
            points: {
                shirt: 4,
                trousers: 4,
                neckie: 4,
                belt: 4,
                woggle: 0,
                shoes: 4,
                penPaper: 4,
                book: 4,
                behaviour: 4
            }
        }
    ]
});

andrew.save();


var kirstin = new User({
    name: "Kirstin Aitken",
    email: "kirstin@gotwoggle.com",
    phone: "01698XXXXXX",
    mobile: "07939906395",
    patrol: {
        name: "Eagle",
        rank: "PL"
    },
    medical: "Diabetic",
    attendance: [
        {
            date: new Date(2013, 0, 15),
            points: {
                shirt: 5,
                trousers: 5,
                neckie: 5,
                belt: 5,
                shoes: 5,
                woggle: 0,
                penPaper: 5,
                book: 5,
                behaviour: 5
            }
        },
        {
            date: new Date(2013, 0, 22),
            points: {
                shirt: 4,
                trousers: 4,
                neckie: 4,
                belt: 4,
                shoes: 4,
                woggle: 0,
                penPaper: 4,
                book: 4,
                behaviour: 4
            }
        }
    ]
});

kirstin.save();

// Dummy MetaData Data
var patrols = new MetaData({
    key: "patrols",
    value: '{"Patrols":["Eagle","Stag"]}'
});

patrols.save();