// In javascript a class Error exists then contains all the attrinutes of a error .
//Here we will be defining name of our errors and their status codes by extending properties from this class

class c_ErrorHandling extends Error{
    constructor(status ,message ){
        super();
        this.status = status;
        this.message = message;
    }
}

module.exports = c_ErrorHandling;