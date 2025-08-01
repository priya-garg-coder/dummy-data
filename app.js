const express = require("express");
const app = express();
const path = require("path");
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
let userModel = require("./modles/users")


app.get('/', (req, res) => {
  res.render("index");
});

app.get('/ok',async (req, res) => {
   let usered = await userModel.find();
  res.render("datas",{usered});

});
app.get("/delete/:id", async(req,res)=>{
  let usered = await userModel.findOneAndDelete({_id: req.params.id});
   res.redirect("/ok")

})
app.post('/create',async (req, res) => {
  let {name,salary,email,language} = req.body;
   let createsuser = await userModel.create({
    name,
    email,
    language,
    salary
   })
   res.redirect("/ok");
  });

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

