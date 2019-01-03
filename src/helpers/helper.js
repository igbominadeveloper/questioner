import fs from 'fs';

const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  }
  return 1;
};

const now = () => new Date().toLocaleString();

const exists = (array, id) => {
  const row = array.find(row => row.id == id);
  if (row) {
    return row 
  }
  return false
}

const writeToFile = (filename, content) => {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (error) => {
    if (error) {
      console.log(error);
    }
  });
};

export default {
  getNewId,
  now,
  exists,
  writeToFile,
};
