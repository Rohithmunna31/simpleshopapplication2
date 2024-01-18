const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const sequelize = require("./util/database.js");

const Product = require('./models/product.js');

const User = require('./models/User.js')

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.use((req,res,next)=>{
    User.findById(1)
    .then(user=>{
      req.user = user
      next();
    })
    .catch(err => console.log(err));
})

Product.belongsto(User,{constrainst:true, onDelete:'CASCADE'});

User.hasMany(Product);

sequelize
  .sync()
  .then((res) => {
   return  User.findId(1);
  })
  .then(user=>{
    if(!user){
    return User.create({name:'max',email:'test@gmail.com'}
    )
    }
    return User;
  })
  then(user=>{
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000);
