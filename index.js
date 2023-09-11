const express = require("express");
const app = express();
const path = require("path");
const {v4 : uuidv4} = require("uuid");
const mysql = require("mysql2");
const methodOverride = require("method-override");
const { unsubscribe } = require("diagnostics_channel");
const { CONNREFUSED } = require("dns");


//database connection
const connection = mysql.createConnection(
    {
        host : "localhost",
        user : "root",
        database : "to_do_list",
        password : "Samsung_soundbar@161254"
    }
);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));




//posts
app.get("/social/posts", (req,res) => {
    let q = "SELECT * FROM posts";

    try {
        connection.query(q, (err,result) => {
            let posts = result;
            res.render("posts.ejs", {posts});
        });
    }
    catch(e) {
        console.log("some problem");
    }
});


//ADD NEW POSTS -> GET REQUEST
app.get('/social/posts/new', (req,res) => {
    res.render('newpost.ejs');
});

//ADD NEW POST -> POST REQUEST
app.post('/social/posts/new', (req,res) => {
    let id = uuidv4();
    let {image, content} = req.body;
    let q = `INSERT INTO posts VALUES('${id}','${image}','${content}')`;

    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            console.log("Database updated");
            res.redirect("/social/posts");    
        })
    }
    catch(e) {
        console.log("some problem");
    }
});


//SEE IN DETAILS -> GET REQUEST
app.get("/social/posts/:id", (req,res) => {
    let {id} = req.params;
    let q = `SELECT * FROM posts WHERE id = '${id}'`;

    try {
        connection.query(q, (err,result) => {
            let post = result[0];
            res.render("showpost.ejs", {post});
        })
    }
    catch(e) {
        console.log('some problem');
    }
});

//EDIT POST -> GET REQUEST
app.get("/social/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    try {
        let q = `SELECT * FROM posts WHERE id = '${id}'`;
        connection.query(q, (err, result) => {
            if(err) throw err;
            let post = result[0];
            console.log(post);
            res.render("editpost.ejs", {post});
        }) 
    }
    catch(e) {
        console.log('some problem');
    }
});

//EDIT POST -> PATCH REQUEST
app.patch("/social/posts/:id", (req,res) => {
    let {id} = req.params;
    let content = req.body.content;
    let image = req.body.image;
    console.log(id, content, image);

    let q = `UPDATE posts SET content = '${content}', image = '${image}' WHERE id = '${id}'`;

    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            res.redirect("/social/posts");
        })
    }
    catch(e) {
        console.log('some problem');
    }
});


//DELETE POST -> DELETE REQUEST
app.delete("/social/posts/:id", (req,res) => {
    let {id} = req.params;
    let q = `DELETE FROM posts WHERE id = '${id}'`;

    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            res.redirect("/social/posts");
        })
    }
    catch(e) {
        console.log("sum problem!");
    }
})




















//to-do sign-up route
app.get("/social/sign-up", (req,res) => {
    res.render("to-do-sign-up.ejs");
});

app.post("/social/sign-up", (req,res) => {
    let { email, username, age, password } = req.body;
    let id = uuidv4();
    let q = `INSERT INTO accounts VALUES('${id}','${email}','${username}','${age}','${password}');`;

    try {
        connection.query(q, (err,results) => {
            if(err) throw err;
            res.redirect("/social/sign-in");
        });
    }
    catch(e) {
        res.send("Some database problem!");
    }

});


//to-do sign-in route
app.get("/social/sign-in", (req,res) => {
    res.render("to-do-sign-in.ejs");
});

app.post("/social/sign-in", (req,res) => {
    let {email : userEmail, password : userPasword} = req.body;
    let q = `SELECT password,username FROM accounts WHERE email = '${userEmail}';`;

    try {
        connection.query(q, (err,result) => {
            if(err) throw err;
            if(result.length >= 1) {
                let {password, username} = result[0];
                if(password == userPasword) {
                    res.render("login-success.ejs", {username});
                } else {
                    res.render("invalid.ejs");
                }
            } else {
                res.render("invalid.ejs");
            }        
        })
    }
    catch(e) {
        console.log(e);
    }
});



//SOCIAL MEDIA HOME PAGE 
app.get("/social", (req,res) => {
    res.render("to-do.ejs");
});



//NEWS WEBSITE ROUTE
app.get("/news", (req,res) => {
    res.render("news-index.ejs");
});


//QUIZ ROUTE
app.get("/quiz", (req,res) => {
    res.render("quiz-index.ejs");
});


//SIMON GAME ROUTE
app.get("simongame", (req,res) => {
    res.render("simongame.ejs");
})



//HOME ROUTE
app.get("/home", (req,res) => {
    res.render("home.ejs");
});

app.get("/", (req,res) => {
    res.render("home.ejs");
});


let port = 8080;
app.listen(port, (req,res) => {
    console.log("Port listenning on ",port);
});