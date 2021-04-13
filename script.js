#!/usr/bin/env node

//node module to interact with file system
let fs = require("fs");

let cmd = process.argv.slice(2);

let files = [];
let options = [];
let str = "";

//to make arrays of options and files
(function(){    
for(let x in cmd){
    if(cmd[x].startsWith("-") && cmd[x].length == 2){
        options.push(cmd[x]);
    } else{
        if(fs.existsSync(cmd[x]) == false){
            console.log(cmd[x] + " does not exists");
            return;
        }
        files.push(cmd[x]);
    }
}

if(files.length == 0){
    console.log("No files entered");
    return;
}

// append data of files in a string
for(let x in files){
    str += fs.readFileSync(files[x]).toString();
}

// making str an array
str = str.split("\n");

// removing large spaces in an array
if(options.includes("-s")){
    str = removeLargeSpaces(str);
}

if(options.includes("-n") && options.includes("-b")){
    if(options.indexOf("-b") > options.indexOf("-n")){
        str = addNumAll(str);
    } else{
        str = addNumLines(str);
    }
} else{
    if(options.includes("-n")){
        str = addNumAll(str);
    } else if(options.includes("-b")){
        str = addNumLines(str);
    }
}

// converting arr to string
str = str.join("\n");

console.log(str);

})();

// for -s
function removeLargeSpaces(arr){
    let ans = [];
    for(let i = 0; i < arr.length; i++){
        let curr = i;
        let next = i + 1;
        if((arr[curr] == "\r" && arr[next] == "\r") || (arr[curr] == "" && arr[next] == "")){
        } else{
            ans.push(arr[curr]);
        }
    }
    return ans;
}

// for -n
function addNumAll(arr){
    let ans = [];
    for(let x in arr){
        ans[x] = Number(x) + 1 + " " + arr[x];
    }
    return ans;
}

// for -b
function addNumLines(arr){
    let ans = [];
    let num = 1;
    for(let x in arr){
        if(arr[x] == "" || arr[x] == "\r"){
            ans[x] = arr[x];
        } else{
            ans[x] = num + " " + arr[x];
            num++;
        }
    }
    return ans;
}



