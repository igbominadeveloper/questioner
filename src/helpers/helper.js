const getIndex = (array, id) => array.findIndex(item => item.id == id);

const now = () => new Date().toLocaleString();

export default {
  now,
  getIndex
};
