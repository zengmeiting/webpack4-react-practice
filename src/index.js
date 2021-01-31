/*
 * @Author: zengmeiting
 * @Date: 2021-01-30 15:57:57
 * @Description: 
 * @FilePath: \webpack-4\src\index.js
 */
// require('./assets/css/index/index.css');
import "./assets/css/index/index.css";

let img = new Image();  //let是es6的语法，uglifyjs不支持压缩let,需要用balel转换
img.src = require("./assets/images/1.jpg");

document.getElementById('img').appendChild(img);

class Person{
    constructor(){
        this.name = "AAA";
    }
    getName(){
        return this.name;
    }
}

let person = new Person();
console.log(person.getName())
