const fs = require('fs');

function saySomething(text) {
    console.log(text);
}

const saySomethingV2 = (text) => {
    console.log(text);
};

const saySomethingV3 = text => {
    console.log(text);
};

const saySomethingV4 = text => console.log(text);

function add(x, y) {
    setTimeout(() => {
        return x + y;
    }, 3000)
}

//asynchronous programming with callbacks
function addWithCallback(x, y, callback) {
    setTimeout(() => {
        callback(x + y);
    }, 3000)
}

//asynchronous programming with promises
function readFile(file_name, options) {
    return new Promise( (resolve, reject) => {
        fs.readFile(file_name, options, (err, data) => {
            if (err) reject(err);
            resolve(data);
          });
    });
    
}

function processData(data) {
    console.log(data);
}

async function main() {

    //base FS version
    /*
    fs.readFile('package.json', 'utf8', (err, data) => {
        if (err) throw err;
        processData(data);
      });
      */

    //new version with proimses
    /*
    readFile('package.json', 'utf8')
    .then(data => {console.log(data);})
    .catch(err => {console.log(err)});
    */

    //final cleanest version using await
    const data = await readFile('package.json', 'utf8');
    const data_object = JSON.parse(data);
    console.log(data_object.scripts.test);
    JSON.stringify(data_object);

    saySomething("hello");
    saySomethingV2("world!");
    saySomethingV3("this is");
    saySomethingV4("a test");
}

function a() {
    const a = 5;
    const b = 7;
    const result = addWithCallback(a, b, result => { console.log(result); });
}

main();