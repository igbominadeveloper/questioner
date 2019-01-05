import fs from 'fs';

const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  }
  return 1;
};

const getIndex = (array, id) => array.findIndex(item => item.id == id);

const now = () => new Date().toLocaleString();

const exists = (array, id) => {
  const row = array.find(one => one.id == id);
  if (row) {
    return row;
  }
  return false;
};

const writeToFile = (filename, content) => {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8');
};

export default {
  getNewId,
  now,
  getIndex,
  exists,
  writeToFile,
};
