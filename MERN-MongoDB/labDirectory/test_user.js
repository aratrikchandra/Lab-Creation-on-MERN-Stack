const cursor = db.Users.find({}, { _id: 0 });
const outputFile = 'outputs/output7.txt';
const fs = require('fs');
const file = fs.openSync(outputFile, 'w');

fs.writeSync(file, '[');
let first = true;
cursor.forEach(doc => {
    if (!first) {
        fs.writeSync(file, ',');
    } else {
        first = false;
    }
    fs.writeSync(file, JSON.stringify(doc, null, 2));
});
fs.writeSync(file, ']');
fs.closeSync(file);

print('Query output saved to ' + outputFile);
