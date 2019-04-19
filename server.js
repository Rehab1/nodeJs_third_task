var http=require('http');
const fs=require('fs');
const findHandler=require('finalhandler');
const Router=require('router');
const port=3000;
const router=Router();

router.get('/',(req,res)=>{
    fs.readdir('./assets',(err,files)=>{
        if(err)
        {
            res.statusCode=500;
            res.end('error hapend');
        }
        else{
            res.setHeader('content-type','application/json');
            res.end(JSON.stringify(files))
        }
    });
});
router.get(':/fileName',(req,res)=>{
    fs.readFile(`./assets/${req.params.fileName}`,(err,fileBuffer)=>{
        if(err){
            res.statusCode=404;
            res.end('not found');
        }
        else{
            res.end(fileBuffer);
        }
    })
});
const server=http.createServer((req,res)=>{
   router(req,res,findHandler(req,res));
});

server.listen(port,()=>{
    console.log(`server running at http:localhost:${port}/`);
});