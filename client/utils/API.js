import axios from 'axios';

const createService = () => {
  // Ascertain if this is being run in the browser or the Next.js server to
  // allocate the correct API entrypoint
  axios.defaults.baseURL =
    typeof window === 'undefined'
      ? process.env.INTERNAL_API_ENTRYPOINT
      : process.env.EXTERNAL_API_ENTRYPOINT;

  const handleSuccess = response => {
    return response;
  };

  const handleError = error => {
    return Promise.reject(error);
  };

  const service = axios.create({
    withCredentials: true
  });
  service.interceptors.response.use(handleSuccess, handleError);

  return service;
};

const get = (path, headers, callback) => {
  return createService()
    .get(path, {
      withCredentials: true,
      headers
    })
    .then(response => callback(response));
};

const post = (path, payload, callback) => {
  return createService()
    .post(path, payload, { withCredentials: true })
    .then(response => callback(response));
};

export const ApiGet = (url, headers) => {
  return get(url, headers, response => {
    return response;
  }).catch(error => {
    return error.response;
  });
};

export const ApiPost = (url, payload) => {
  return post(url, payload, response => {
    return response;
  }).catch(error => {
    return error.response;
  });
};
