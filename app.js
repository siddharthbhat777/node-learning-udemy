/* Watch Section 3 if you have any doubts */
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);
    // process.exit(); // it will close server as soon as the request is sent.

    const url = req.url; // url = '/' or '/message'
    const method = req.method; // GET/POST

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="yourmessage" /><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => { // data is event listener to fetch the data and chunk is raw buffered data
            console.log(chunk);
            body.push(chunk);
        }); // 'on' helps in invoking event listeners
        req.on('end', () => { // end is also an event listener which will be executed after an 'res.end'
            const parsedBody = Buffer.concat(body).toString();
            /*
            - whatever message you type in textbox must be added in the message.txt local file
            - as you fetch message from textbox it comes with a buffer format
            - so you need to convert that buffer message into a normal readable text
              which can be done as shown on line number 27.
            - The buffer output = "<Buffer 79 6f 75 72 6d 65 73 73 61 67 65 3d 68 65 6c 6c 6f 2b 66 61 6d>"
            - after converting buffer to readable text, we do not get just the text
              but along with the text, the name of textbox also gets fetched
            - the output will be like this "yourmessage=hello+fam"
            - here "yourmessage" is the name assigned to the textbox on line number 15
            - then to just consider the message refer line number 40
            */
            const message = parsedBody.split('=')[1]
            /*
            original message - yourmessage=hello+fam
            after using "split('=')" - yourmessage  hello+fam
                                            0           1
            [1] points to index '1' i.e. hello+fam
            so 'hello+fam' text will be added in message.txt file
            */
            /* 
                THIS IS NORMAL SYNCHRONOUS WAY
                fs.writeFileSync('message.txt', message);
                res.statusCode = 302; // 302 is a status code for 'rediretion'
                res.setHeader('Location', '/');
                return res.end(); 
            */

            /*
            - The problem is the above SYNCHRONOUS code from line 50-53 is 
              blocking the further code from execution
            - Blocking basically means the further code won't be executed
              unless and until it finishes this task
            - So to avoid blocking, we need to execute code asynchronously
            - it has been done from line 70-81
            - this asynchronous way is not having much impact on this operation as such,
              but let's consider we are having GBs or TBs of file to write.
            - In such cases it will take alot of time to execute the operation,
              but along with that it will also block further execution.
            - So, this is the main reason to write files asynchronously
            */

            fs.writeFile('message.txt', message, err => { // same as (err) => {}
                // res.writeHead(302); 
                res.statusCode = 302; // 302 is a status code for 'rediretion'
                res.setHeader('Location', '/');
                /*
                - at the time of execution, the line 73 is calling lines 85-90,
                  so those lines will continue the execution
                - and blocks ofline number 22 and 26 will work asynchronously in the background and 
                  will trigger other functionalities when they are needed
                */
                return res.end();
            });
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);