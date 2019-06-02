var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Tanocondor_7",
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;
    askOption();
});
function showProducts() {

    // select *
    connection.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        // print formatted
        let lenObj = {};
        let headers = [];
        let str = ""
        for(let header of Object.keys(result[0])){
            headers.push(header);
            lenObj[header] = getBiggestLength(result, header);
            str += " " + padding(lenObj[header],header) + " |";
        }
        console.log(str);
        for (let row of result) {
            let str = "";
            for(let header of headers){
                str += " " +padding(lenObj[header],row[header]) + " |"
            }
            console.log(str);
        }
        askOption();
    });

}
function getBiggestLength(result,colName){
    var largestLength = result.map((x) => {
        return x[colName].toString().length;
    })
    largestLength.push(colName.length);
    largestLength = largestLength.reduce((x, y) => {
        return x > y ? x : y;
    })
    return largestLength;
}
//tomar la longitud del producto mas largo
function padding(longestLength,word){
    word = word.toString()
    //variable con los espacios que le faltan a la palabra (resta).
    var missingSpaces = longestLength - word.length;
    //insertar el numero de espacios que faltan
    // for loop
    for (var i = 0; i < missingSpaces; i++) {
        word += " ";
    }
    // regresar el nuevo string
    return word;
}
function askOption(){
    // preguntar que quiere hacer
    //Mostrar tabla con productos
    inquirer.prompt(
        {
            type:"rawlist",
            name:"menu",
            choices:["Show products","Buy","Exit"]
        }
    ).then(function(result){
        if(result.menu=="Show products")
            showProducts()
        else if(result.menu=="Buy"){
            comprar()
        }
        else{
            connection.end();
        }
    })
}   

function comprar(){
    //pedir al usuario el ID del producto que le interesa
    inquirer
        .prompt([
            {
                name: "ID",
                type: "input",
                message: "What is the ID of the item you would like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Quantity",
                type: "input",
                message: "How many would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then((answers)=>{
            // haces lo que tengas que hacer
            // seleccionamos para ver si existe el id y si tiene las existencias
            connection.query("SELECT * FROM products where item_id= ? and stock_quantity > ?", 
                [answers.ID,answers.Quantity],
                function(err,result,fields){ 
                    // si regresa algo el query
                    if(result.length==1){
                        console.log("Purchase Confirmed");
                        // update
                        connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
                            [answers.Quantity, answers.ID],
                            function(err, result){
                                if(err) throw err;
                                askOption();
                            }                        
                        )
                    }
                    
                    // si no
                    else {
                        console.log("Purchase not possible");
                        console.log("Please check the product information");
                        // menu
                        askOption();
                    }
                });
           
        });
}