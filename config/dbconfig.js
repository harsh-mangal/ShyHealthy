const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://devharshmangal:harsh786@cluster0.pwltp9k.mongodb.net/SheyHealthy');
const connection = mongoose.connection;

connection.on('connected', ()=>{
    console.log('Connected to Database');
});
connection.on('error', (error)=>{
    console.log('Error connecting to Database' ,error);
});

module.exports = mongoose; 