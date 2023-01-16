const fs = require('fs');

const requestHandeler = (req,res)=>{
    const url = req.url;
    const method = req.method;
    if(url === "/"){
        res.write('<html>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === "/message" && method === "POST"){
        const body = [];
        req.on("data",(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        return req.on("end",()=>{
            console.log("Body:=");
            console.log(body);
            const parseBody = Buffer.concat(body).toString();
            console.log("parseBody:=");
            console.log(parseBody);
            const message = parseBody.split("=")[1];
            console.log(message);
            fs.writeFile('message.text',message, (err) => {
                res.statusCode = 302;
                res.setHeader("Location","/");
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<body><h1>Hello devansh From node server</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports = requestHandeler;