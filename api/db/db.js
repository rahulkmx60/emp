// ***************** IMPORTS *****************//

const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

/////////////////= IMPORTS DONE =/////////////////


// ***************** FUNCTIONS *****************//

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true );
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true } , (err)=>{
    if(err){
    console.log("Error connecting database");}
});

const con = mongoose.connection;
    con.on('open', ()=>{
        console.log("Connected to database!");
});

// ***************** FUNCTIONS *****************//



module.exports  = mongoose;