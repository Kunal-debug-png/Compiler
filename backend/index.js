const express= require("express");
const app=express();
const { generateFile}=require('./generateFile');
const {executeJava} = require("./executeJava");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get('/',(req,res)=>{
   return  res.json({hello:"world:"});
});
app.post("/run",async(req,res) => {
    const {language = "cpp",code} = req.body;
    if(code===undefined){
        return res.status(400).json({ success:false,error: "Empty code body"});
    }
    //need to generate a c++ file with content from the request
    const filepath=await generateFile(language,code);
    const output = await executeJava(filepath);
    //we need to run file and send the response
    return res.json({filepath,output});
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  