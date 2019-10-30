import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const getBlog = id => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then(response => response.data);
};

const create = newObject => {
  const config = {
    headers: { Authorization: token }
  };
  const request = axios.post(baseUrl, newObject, config);
  return request.then(response => response.data);
};

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  };
  const request = axios.put(`${baseUrl}/${id}`, newObject, config);
  return request.then(response => response.data);
};

const addComment = (id, comment) => {
  const config = {
    headers: { Authorization: token }
  };
  const commentObject = {
    comment
  };
  const request = axios.post(
    `${baseUrl}/${id}/comments`,
    commentObject,
    config
  );
  return request.then(response => response.data);
};

const remove = id => {
  const config = {
    headers: { Authorization: token }
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then(response => response.data);
};

export default {
  getAll,
  getBlog,
  create,
  update,
  addComment,
  remove,
  setToken
};
