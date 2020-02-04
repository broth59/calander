const path = require('path');

    
    //server context path => required to be equal with backend
exports.CONTEXT_PATH = "/"
exports.DOMAIN = "http://localhost:8088"
    //front module primary path of folders
exports.SRC_PATH= path.resolve(__dirname, "../src")
exports.CLASS_PATH= path.resolve(__dirname, "../src/js/class")
exports.VIEWS_PATH= this.SRC_PATH+"/views"
exports.DIST_PATH= path.resolve(__dirname, "../../src/main/webapp")

    //front module path resolver
exports.VIEWS= (road,ext)=>`${this.VIEWS_PATH}/${road}/${road}.${ext}` //view path resolver
    



