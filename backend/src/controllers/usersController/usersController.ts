// Methods to be executed on routes
const get = (req, res)=>{
    res.send("Hello, Welcome to our Page");
}
  
const getById = (req, res)=>{
    res.send("Hello, This was a post Request");
}

const post = (req, res)=>{
    res.send("Hello, This was a post Request");
}

// Export of all methods as object
export default {
    get,
    getById,
    post
}