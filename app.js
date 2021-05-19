var express =require("express");
var app=express();

const pug=require("pug");

app.use(express.static(__dirname+"/public"));


var perros_array=[
    {raza:"Doberman",texto:"Perro de ataque",imagen:"doberman.jpg"},
    {raza:"Pastor Aleman",texto:"Perro de caza",imagen:"pastor.jpg"},
    {raza:"Pug",texto:"Perro de caza",imagen:"pug.jpg"},
    {raza:"San Bernardo",texto:"Perro de caza",imagen:"sanbernardo.jpg"}
]

app.get("/",(req,res)=>{
//res.send("index.html");
res.render("index.pug",{
   titulo:"Perros del mundo",
   texto:"Selecciona un perro",
   imagen:"perros.jpg",///enviando parametro a index.pug
   perros:perros_array 
});
});

app.get("/perro/:raza",(req,res)=>{
   var datosPerro= perros_array.filter((perro)=>{
if(req.params.raza==perro.raza){
    return perro;
}
   })[0];

    res.render("perro.pug",{
    raza: req.params.raza,
    data: datosPerro
    });
    });


app.use((req,res)=>{
res.status(400);

let error = req.originalUrl;
res.render("404.pug",{text:error});

});

app.listen(3000,()=>{
    console.log("Servidor en el puerto 3000");
});