const fs = require('fs');
const axios = require('axios');

let file_test = 'order';
let volume = 50;
let base_url_request = `http://localhost:30000/booking`;
let file_name = `${file_test}.txt`

executer = () => {
    console.log(`Start at : ${Date.now().toString()}`)
    for (let i = 1; i <= volume; i++) {
            const identity = "50" + i.toString();

            const data_input = {
                "code": `X ${identity}`,
                "name": `Ao ca sa ${identity}`
            }

            axios.create({})
            .post(encodeURI(base_url_request), data_input)
            .then((body) => {
                console.log(`OK row ${i}`);
                fs.appendFileSync(file_name, `${JSON.stringify(body.data)}\r\n`);
                console.log(`End of succeed ${i} at : ${Date.now().toString()}`)
            })
            .catch((err) => {
                console.log(`ERROR ${i}`);
                fs.appendFileSync(file_name, `${JSON.stringify(err)}\r\n`)
                console.log(`End of error ${i} at : ${Date.now().toString()}`)
            })

    }
}

executer();



