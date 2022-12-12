const {Pool} = require('pg');


const pool = new Pool({
    host: process.env.host,
    port: process.env.port,
    database: process.env.database,
    user: process.env.username,
    password: process.env.password
});

const getPost = async () =>{
    const result = await pool.query("SELECT written_on, title, author, body FROM blog");
    await pool.end();
    return buildReturnObj(200, result.rows );
};

const searchPost = async (title)=>{

    const result = await pool.query(`SELECT written_on, title, author, body FROM blog WHERE title LIKE '% ${title} %'`);
   
    await pool.end();
    return buildReturnObj(200, result.rows);
};



const buildReturnObj = (statuscode, body)=>{ //function builds response object for apigateway to consume
    return {
        statuscode:statuscode,
        Headers:{
            
        },
        body: JSON.stringify(body),
        isbase64encoded: false
    };

};


module.exports={
    getPost:getPost,
    searchPost:searchPost
};