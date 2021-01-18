//file and path modules of Node
const fs = require("fs");
const path = require("path");

module.exports = function propertyParser() {

  //to store all lines of file
  let _lines = [];
  //to store all key value pairs of file
  let _keyValuePairs = {};
  //to store original properties file path
  let _origFilePath = null;

  return {

    //this will parse whole file create key-value pairs and lines array 
    parse(filePath) {
      let line = "";
      file = fs.readFileSync(filePath, "utf-8");
      _origFilePath = filePath;
      //reading each char from file
      for (let char of file) {
        //breaking if found \r crriage return or \n new line character
        if ((char === "\r" || char === "\n") && line[line.length-1] !== '\\') {
          //storing each line in lines array
          _lines.push(line);
          
          createKeyValuePairs(line, _keyValuePairs);
          line = "";
        } else {
          line += char;
        }
      }
      //handling last line
      if (line && (line.includes('=') || line.includes(':'))) {
        _lines.push(line);
        createKeyValuePairs(line, _keyValuePairs);
        line = "";
      }
    },
    //get key value
    get(key) {
      return _keyValuePairs[key];
    },
    //set new value to key
    set(key, value) {
      setLine(key,value, _lines, _keyValuePairs);
      _keyValuePairs[key] = value;
    },
    //delete a key
    delete(key) {
      if (_keyValuePairs[key]) {
        delete _keyValuePairs[key];
        deleteLine(key, _lines);
      }
    },
    //save changes and create a backup
    save(filepath) {
      if (_origFilePath === filepath) {
        let fileName = path.basename(_origFilePath);
        fs.renameSync(_origFilePath, _origFilePath.replace(fileName, `backup_${fileName}`));
      }
      _lines.forEach((line) => {
        if (line) {
          fs.appendFileSync(filepath, `${line}\n`);
        }
      });
    },
  };
};

//create key value pairs
function createKeyValuePairs(line, obj) {
  if (line.includes("=")) {
    let [key, value] = line.split("=");
    key = key.trim();
    value = value.trim();
    obj[key] = value;
  }
  else if(line.includes(":")) {
    let [key, value] = line.split(":");
    key = key.trim();
    value = value.trim();
    obj[key] = value;
  }
}

//update lines array
function setLine(key,value, lines, obj) {
  let ind = lines.findIndex((el) => {
    return el.includes(key);
  });
  console.log("set", ind);
  if (ind > 0 && (key in obj)) {
    lines[ind] = `${key}=${value}`;
  } else {
    console.log("in lese");
    lines.push(`${key}=${value}`);
  }
}

//deletes line from lines array
function deleteLine(key, lines) {
  let ind = lines.findIndex((el) => {
    return el.includes(key);
  });

  if (ind) {
    lines.splice(ind, 1);
  }
}
