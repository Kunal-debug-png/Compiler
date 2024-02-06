//these header files are for path os
const fs=require('fs');
const path=require('path');

//for unique id generation. v4 renamed to uuid
const{v4 : uuid}=require('uuid');

//locate to path where file of code should be stored
const dirCodes = path.join(__dirname,"codes");

//if the folder is not present then create one
if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive:true});
}


const generateFile=async (format,content)=> {
    //unique filename generation
    const jobId=uuid();
    const filename = `${jobId}.${format}`;
    const filepath=path.join(dirCodes,filename);
    await fs.writeFileSync(filepath,content);
    return filepath;
};
module.exports={
    generateFile,
};