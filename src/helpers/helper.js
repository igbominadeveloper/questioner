import fs from 'fs';

const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  }
  return 1;
};

const checkErrorCode = (error) => {
  switch (error.status) {
    case 404: return response.status(404).json({
      status: 404,
      error: error.message
    });
    break; 
    case 400: return response.status(400).json({
      status: 400,
      error: error.message
    });
    break; 
    case 403: return response.status(403).json({
      status: 403,
      error: error.message
    });
    break;
    case 401: return response.status(401).json({
      status: 401,
      error: error.message
    });
    break;
    default: return response.status(400).json({
      status: 400,
      error: error.message
    });
  }
}


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
  checkErrorCode,
  now,
  getIndex,
  exists,
  writeToFile,
};
