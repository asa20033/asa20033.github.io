//import my jwt and bcrypt for hashing 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const mysql = require ('mysql');

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE,
});


//the function of login
// Import required modules and dependencies

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                message: 'Please provide an email and password'
            });
        }

        db.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log(results);
        if (!results || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).render('login', {
                message: 'Email or password is incorrect'
            });
        }

        const id = results[0].id;

        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN 
        });

        console.log("The token is: " + token);

        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true 
        };

        res.cookie('jwt', token, cookieOptions);
        res.status(200).redirect("/profile");

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};


// The function of register
exports.register = (req,res) => {
    console.log(req.body);

    
    const{name, email, password, passwordConfirm,} = req.body;
    db.query('SELECT email FROM users WHERE email =  ?', [email], async (error, results)=>{
        if (error){
            console.log(error);
        }
        if (results.length > 0){
            return res.render('register',{
            message: 'This email is already taken..'    
            })
        } else if (password !== passwordConfirm){
            return res.render('register', {
                message:'Passwords do not match'
            });
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

     db.query('INSERT INTO users SET ?' , {name: name, email:email, password:hashedPassword},)
     if(error){
        console.log(error);
     }
      else{
        console.log(results);
        return res.render('register',{
            message: 'User registered'
        });
      }  
        











    })
          



}
exports.logout = async (req, res ) => {
    res.cookie('jwt', 'logout',{
        expires: new Date(Date.now() + 2*1000),
        httpOnly: true

    });

    res.status(200).redirect('/');
}
