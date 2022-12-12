const { getPost, searchPost} = require('./dbQueries');

exports.handler = (event, context, callback) =>{

    if(event.path === '/api/getPosts'){ //get all blog posts
        getPost().then(result => callback(null, result));
        
    }else if(event.path === '/api/searchPost'){ //search for a specific post
        var param = event.queryStringParameters.title;
        searchPost(param).then(result => callback(null, result));
        
    }else{
        callback(null, [{message:"resource not found"}]);
    }

};