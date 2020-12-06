'use strict';
var express = require('express');
var cors = require('cors')
var db = require('./db');
var mysql = require('mysql');
var app = express();
const fs = require('fs');

app.use(cors());

app.use(
    express.urlencoded({
      extended: true
    })
  )
  
app.use(express.json())

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'mypassword',
    database: 'testDB',
    socketPath: '/var/run/mysqld/mysqld.sock'
});

connection.connect(function(err) {
    if (!!err) {
        console.log('Error' + err);
    } else {
        console.log('Connect');
    }
});

app.get('/deleteReservation', function(req, resp) {
    connection.query("SELECT * FROM passenger_info;", function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log(rows);
            resp.send(rows);
        }
    });
})

// mysql> INSERT INTO pet
// VALUES ('Puffball','Diane','hamster','f','1999-03-30',NULL);

app.post('/createReservation', function(req, resp) {
    connection.query("INSERT INTO passenger_info", function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log(rows);
            resp.send(rows);
        }
    });
})


app.get('/getReservation', function(req, resp) {
    // get passenger id from UI
    // query purchase_tickets table using passenger id and get ticket id
    // query train_tickets using ticket id to get trainsched id
    // query train_scehdule using trainsched id and get details
    connection.query("SELECT * FROM PURCHASED_TICKETS;", function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log(rows);
            resp.send(rows);
        }
    });
})

app.get('/getTicketInfo', function(req, resp) {
    // resp.send(`Test:${req.body.location}`);
    // var fName = req.query.fName;
    const queryUrl = req.query;
    // console.log(queryUrl + ' &&&&');
    const urlParams = new URLSearchParams(queryUrl);
    const fname = urlParams.get('fname');
    const lname = urlParams.get('lname');
    const email = urlParams.get('email');
    const quantity = urlParams.get('quantity');
    
    fs.readFile('user-config.json', (err, data) => {
        if (err) throw err;
        const userData = JSON.parse(data);
        processReq(userData);
    });

    function processReq(userData) {
        console.log('inside getTicketInfo');
        var sql_query = "INSERT INTO `purchased_tickets` (`PassID`, `TrainSchedID`, `NumTickets`) VALUES (?, ?, ?)";

        connection.query(sql_query, [userData.userID, userData.ticketsToBuy, quantity], function(error, rows, fields) {
            if (!!error) {
                console.log('Error in the query ' + error);
            } else {
                sql_query = "UPDATE `train_schedule` TS SET TicketsAvail = TicketsAvail - ? WHERE TS.TrainSchedID = ?";

                connection.query(sql_query, [quantity, userData.ticketsToBuy], function(error, rows, fields) {
                    if (!!error) {
                        console.log('Error in the query ' + error);
                    } else {
                        console.log(rows);
                        resp.send([fname, lname, quantity, userData.ticketsToBuy]);
                    }
                });    
                
            }
        });

    }
})

app.get('/getEmployeeInfo', function(req, resp) {
    // resp.send(`Test:${req.body.location}`);
    // var fName = req.query.fName;
    const queryUrl = req.query;
    // console.log(queryUrl + ' &&&&');
    const urlParams = new URLSearchParams(queryUrl);
    console.log(urlParams.get('traveldate'));
    const fname = urlParams.get('fname');
    const lname = urlParams.get('lname');
    const empID = urlParams.get('empID');
    const traveldate = urlParams.get('traveldate');
    console.log(fname + ' ' + lname + ' ' + empID + ' ' + traveldate);
    return true;
    // connection.query("", function(error, rows, fields) {
    //     if (!!error) {
    //         console.log('Error in the query');
    //     } else {
    //         // console.log(rows);
    //         resp.send(fname);
    //     }
    // });
})

app.get('/getSchedule', function(req, resp) {
    // console.log('.....');
    const queryUrl = req.query;
    const urlParams = new URLSearchParams(queryUrl);
    const location = urlParams.get('location');
    const destination = urlParams.get('destination');
    const arrivaldate = urlParams.get('traveldate');
    var sql_query = "SELECT StationID FROM station_info SI WHERE SI.Location = ? OR SI.Location = ?;"
    
    console.log('Query input: ' + location + ' ' + destination + ' ' + arrivaldate);
    
    connection.query(sql_query, [location, destination], function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the 1st query');
        } else {
            var curr_station = rows[0].StationID;
            var next_station = rows[1].StationID;

            console.log(curr_station, next_station);
            sql_query = "SELECT TrainSchedID, TrainID, EmpID, SchedDate, ArriveTime, TicketsAvail FROM `train_schedule` TS WHERE TS.CurrentStation=? AND TS.Destination=?";
            connection.query(sql_query, [curr_station, next_station], function(error, rows, fields) {
                if (!!error) {
                    console.log('Error in the 2nd query');
                } else {
                    console.log(rows);                 
                    resp.send([location, destination, rows]);
                }
            });        
        }
    });

    
})

app.get('/getScheduleFrom', function(req, resp) {
    // console.log('.....');
    const queryUrl = req.query;
    const urlParams = new URLSearchParams(queryUrl);
    const location = urlParams.get('location');
    var sql_query = "SELECT CurrentStation, ArriveTime, TrainSchedID, SchedDate, TrainID FROM `train_schedule` TS WHERE TS.CurrentStation = (SELECT StationID FROM `station_info` SI WHERE SI.Location = ?);";
    var res_query;
    var trainID = [];
    var idx;

    connection.query(sql_query, location, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query' + error);
        } else {
            // console.log(fields);
            // console.log(rows[0].CurrentStation);
            for (idx = 0; idx < rows.length; idx++) {
                // get variable here
                trainID[idx] = rows[idx].TrainID;
            }
            res_query = rows;
            console.log(trainID + ' inside');
        }
    });
    
    sql_query = "SELECT TrainID, TrainName FROM `train_info` TI WHERE TI.TrainID = ?";
    var temp = 1200;
    connection.query(sql_query, temp, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query' + error);
        } else {
            console.log('second query');
            // var arriveTime = rows.ArriveTime'
            console.log(rows);
        }
    });
    // connection.query("SELECT * FROM passenger_info;", function(error, rows, fields) {
    //     if (!!error) {
    //         console.log('Error in the query');
    //     } else {
    //         console.log(rows);
    //         resp.send(rows);
    //     }
    // });
})

app.post('/updatePassenger', (req, resp) => {
    // console.log(req.body);
    // console.log(req);
    fs.readFile('user-config.json', (err, data) => {
        if (err) throw err;
        const userData = JSON.parse(data);
        processReq(userData);
    });

    function processReq(data) {
        const fname = req.body.fname;
        const lname = req.body.lname;
        const phone = req.body.phone;
        const email = req.body.email;
        const pw = req.body.password;

        var sql_query = "UPDATE `passenger_info` PI SET PI.PassFName = ?, PI.PassLname = ?, PI.PassPhoneNum = ?, PI.PassEmail = ?, PI.PassPssw = ? WHERE PI.PassID = ?";
        // console.log(fname + ' ' + lname  + ' ' + phone  + ' ' + email  + ' ' + pw);
        
        
        // resp.send('ok')
        connection.query(sql_query, [fname, lname, phone, email, pw, data.userID], function(error, rows, fields) {
            if (!!error) {
                console.log('Error in the query ' + error);
            } else {
                resp.send(true);
                // resp.send(rows);
            }
        });
    }
})

app.post('/registerPassenger', (req, resp) => {
    // console.log(req.body);
    // console.log(req);

    // console.log(req);
    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone = req.body.phone;
    const email = req.body.email;
    const pw = req.body.password;
    
    var sql_query = "SELECT MAX(PassID) AS PrevID FROM `passenger_info`";
    // console.log(fname + ' ' + lname  + ' ' + phone  + ' ' + email  + ' ' + pw);
    
    connection.query(sql_query, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log(rows);
            var newID = rows[0].PrevID + 1;

            var sql_query = "INSERT INTO `passenger_info`(`PassID`, `PassFName`, `PassLName`, \
                 `PassPhoneNum`, `PassEmail`, `PassPssw`) \
                 VALUES (?, ?, ?, ?, ?, ?)";
            
            connection.query(sql_query, [newID, fname, lname, phone, email, pw], function(error, rows, fields) {
                if (!!error) {
                    console.log('Error in the query');
                } else { 
                    console.log('Update successful')
                    resp.send(true);
                }
            });
        }
    });

    
    // resp.send('ok')

})

app.get('/signIn', (req, resp) => {
    console.log('.....');
    const queryUrl = req.query;
    const urlParams = new URLSearchParams(queryUrl);
    const email = urlParams.get('email');
    const pass = urlParams.get('pass');

    var sql_query = "SELECT PassID, PassFName, PassLName FROM `passenger_info` PI WHERE PI.PassEmail = ? AND PI.PassPssw = ?;"
    
    // console.log('Query input: ' + email + ' ' + pass);
    
    connection.query(sql_query, [email, pass], function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query' + error);
        } else {
            console.log(rows);
            if(rows.length == 1) {
                var uID = rows[0].PassID;
                var uName = rows[0].PassFName;
                var uLName = rows[0].PassLName;

                let user = {
                    "userID": uID,
                    "userName": uName,
                    "userLName": uLName,
                    "userEmail": email,
                    "userType": "P",
                    "ticketsToBuy": -1
                };
              
                let data = JSON.stringify(user);
                fs.writeFileSync('user-config.json', data);
                resp.send([true, rows[0].PassID, rows[0].PassFName, 'P']);
            }
            else {
                sql_query = "SELECT EmpID, EmpFName FROM `employee_info` EI WHERE EI.EmpEmail = ? AND EI.EmpPssw = ?";
                connection.query(sql_query, [email, pass], function(error, rows, fields) {
                    if (!!error) {
                        console.log('Error in the query' + error);
                    } else {
                        console.log(rows);
                        if(rows.length == 1) {
                            
                            var uID = rows[0].EmpID;
                            var uName = rows[0].EmpFName;
                
                            let user = {
                                "userID": uID,
                                "userName": uName,
                                "userType": "E"
                            };
             
                            let data = JSON.stringify(user);
                            fs.writeFileSync('user-config.json', data);
                            resp.send([true, rows[0].EmpID, rows[0].EmpFName, 'E']);
                        }
                        else {
                            
                            console.log('wrong credentials');
                            resp.send([false]);
                        }
                    }
                });               
            }
        }
    });
})

app.get('/viewPurchased', function(req, resp) {
    
    fs.readFile('user-config.json', (err, data) => {
        if (err) throw err;
        const userData = JSON.parse(data);
        processReq(userData);
    });

    function processReq(userData) {
        // console.log('Inside viewPurchased');
        // console.log(userData.userID);
        // console.log(userData.userName);

        var sql_query = "SELECT * FROM `train_schedule` A INNER JOIN `station_info` B ON (B.StationID = A.CurrentStation OR B.StationID = A.Destination) INNER JOIN `purchased_tickets` C ON (C.TrainSchedID = A.TrainSchedID) WHERE C.PassID = ?";

        connection.query(sql_query, userData.userID, function(error, rows, fields) {
            if (!!error) {
                console.log('Error in the query ' + error);
            } else {
                // console.log(rows);
                resp.send([rows, rows.length]);
            }
        });    
    }
    
})

app.get('/viewAllTickets', function(req, resp) {
    
    fs.readFile('user-config.json', (err, data) => {
        if (err) throw err;
        const userData = JSON.parse(data);
        processReq(userData);
    });

    function processReq(userData) {
        // console.log('Inside viewPurchased');
        // console.log(userData.userID);
        // console.log(userData.userName);

        var sql_query = "SELECT PassFname, PassLname, NumTickets, SchedDate, ArriveTime, A.PassID, A.TrainSchedID FROM `purchased_tickets` A INNER JOIN `train_schedule` B ON A.TrainSchedID = B.TrainSchedID INNER JOIN `passenger_info` C ON A.PassID = C.PassID";

        connection.query(sql_query, userData.userID, function(error, rows, fields) {
            if (!!error) {
                console.log('Error in the query ' + error);
            } else {
                // console.log('successfully queried');
                resp.send([rows, rows.length]);
            }
        });    
    }
})

app.get('/purchaseTicket', function(req, resp) {
    // console.log(Object.keys(resp.req.query));
    var ticket_id = resp.req.query.trainSchedID;

    fs.readFile('user-config.json', (err, data) => {
        if (err) throw err;
        const userData = JSON.parse(data);
        processReq(userData);
    });

    function processReq(userData) {
        let user = {
            "userID": userData["userID"],
            "userName": userData["userName"],
            "userLName": userData["userLName"],
            "userEmail": userData["userEmail"],
            "userType": "P",
            "ticketsToBuy": ticket_id
        };
      
        let data = JSON.stringify(user);
        fs.writeFileSync('user-config.json', data);
        resp.send(true);         
    }
})

app.get('/getUserInfo', function(req, resp) {
    // console.log(Object.keys(resp.req.query));

    fs.readFile('user-config.json', (err, data) => {
        if (err) throw err;
        const userData = JSON.parse(data);
        processReq(userData);
    });

    function processReq(userData) {
        console.log(userData);
        resp.send(userData);         
    }
})

app.get('/returnTicket', function(req, resp) {
    
    console.log(resp.req.query);
    var sql_query = "DELETE FROM `purchased_tickets` WHERE PassID = ?;";

    connection.query(sql_query, resp.req.query.passID, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query ' + error);
        } else {
            console.log(rows);
            resp.send(true);
        }
    });        
})

app.listen(3000);