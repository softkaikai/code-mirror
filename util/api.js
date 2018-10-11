import Qs from 'qs';

import axios from '@nuxtjs/axios';

function http(body) {
  let apiData = {
    method: 'get',
    url: 'http://10.50.50.11:3334',

    paramsSerializer: function (params) {
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
  };
  if (body.method) apiData.method = body.method;
  if (apiData.method === 'post') {
    apiData.data = body.data;
  } else {
    apiData.params = body.data;
  }

  return axios(apiData);
}


export default {
  getAll() {
    return http({
      url: '/book/getAll'
    })
  }
}
