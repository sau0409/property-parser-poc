const path = require("path");
const propertiesParser = require('./properties-parser/index')();

propertiesParser.parse(path.join(__dirname, '/property/user.properties'));


console.log(propertiesParser.get('user.age'));
propertiesParser.set('user.age', 45);
console.log(propertiesParser.get('user.age'));

propertiesParser.save(path.join(__dirname, '/property/user.properties'));













/*
let file = fs.readFileSync(filePath, 'utf-8');
let obj = {}
let lines = [];



function parse(file) {
    let line = '';
    for (let char of file) {
        
        if(char === '\r' || char === '\n') {
            console.log('line changed');
            lines.push(line);
            createObject(line);
            line = '';
        }
        else {
            line+= char;
        }
    }
    if(line) {
        lines.push(line);
        createObject(line);
        line=''
    }
    console.log(lines);
    
}


function write(lines) {
    lines.forEach(line => {
        if(line) {
            fs.appendFileSync(path.join(__dirname, '/property/user3.properties'), `${line}\n`)
        }
    })
}

function createObject(line) {
    if(line.includes('=')) {
        let [key, value] = line.split('=');
        key = key.trim();
        value = value.trim();
        obj[key] = value;
        console.log(obj);
    }
}

function set(key, value) {

    if(obj[key]) {
        obj[key] = value;
        setLine(key);
    }
}

function setLine(key) {
    let ind = lines.findIndex(el=> {
        return el.includes(key);
    });

    lines[ind] = `${key}=${obj[key]}`;
}

parse(file);

console.log(obj);
console.log(lines);

set('user.age', 65);
write(lines)

console.log(obj);
console.log(lines);

*/