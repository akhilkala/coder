const fs = require('fs');
const path = require('path');
const Problem = require('./Problem');

module.exports = async () => {
  const dir = fs.opendirSync('./problems');
  let dirent;
  //TODO: understand this
  while ((dirent = dir.readSync()) !== null) {
    pathName = path.join(__dirname, 'problems', dirent.name);
    const problems = JSON.parse(fs.readFileSync(pathName, 'utf-8'));
    await Problem.create(problems);
    console.log(`${dirent.name} seeded`);
  }
};
