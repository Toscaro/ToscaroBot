const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
let db = new sqlite3.Database("database/database.db");

module.exports.select = async (param, table, hasWhere, where) => {

}

module.exports.insert = async (table, values, params) => {
    let helper = "";
    values.forEach(element => {
        helper += " " + element;
    });
    let value = helper.trim().replace(" ", ", ");
    helper = "";

    params.forEach(element => {
        helper += " " + `\"${element}\"`;
    });
    let param = helper.trim().replace(" ", ", ");

    console.log(`table: ${table} value: ${value} param: ${param}`);
    console.log(`INSERT INTO ${table} (${value}) VALUES (${param})`);
    db.run(`INSERT INTO ${table} (${value}) VALUES (${param})`);
}

module.exports.delete = async (table, condition, value) => {
db.run(`DELETE FROM ${table} WHERE ${condition} = ${value}`, (result, err) => {
    console.log(`DELETE FROM ${table} WHERE ${condition} = ${value}`);
    console.log(result);
    console.log(err);
});
}


module.exports.help = {
    name: "query"
}