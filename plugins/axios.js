import Qs from 'qs';
import Vue from 'vue';
import axios from 'axios'

Vue.use(function() {
  function http(body) {
    let apiData = {
      method: 'get',
      url: 'http://localhost:3334',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      // headers: { 'content-type': 'application/json' },
      paramsSerializer: function (params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },
      /*transformRequest: [function (data, headers) {
        return JSON.stringify(data);
        // return Qs.stringify(data, {arrayFormat: 'brackets'})
      }],*/
    };
    apiData.url = apiData.url + body.url;
    if (body.method) apiData.method = body.method;
    if (apiData.method === 'post') {
      apiData.data = Qs.stringify(body.data, {arrayFormat: 'brackets'});
    } else {
      apiData.headers['content-type'] = 'application/json';
      apiData.params = body.data;
    }

    return axios(apiData);
  }


  window.api = {
    getAll() {
      return http({
        url: '/book/getAll'
      })
    },
    register(data) {
      return http({
        method: 'post',
        url: '/codeMirrorLogin/add',
        data: data
      })
    },
    login(data) {
      return http({
        method: 'post',
        url: '/codeMirrorLogin/login',
        data: data
      })
    },

    teamAdd(data) {
      return http({
        method: 'post',
        url: '/codeMirrorTeam/add',
        data: data
      })
    },
    teamFind(data) {
      return http({
        url: '/codeMirrorTeam/find',
        data: data
      })
    },
    teamFindById(data) {
      return http({
        url: '/codeMirrorTeam/findById',
        data: data
      })
    },
    teamDelete(data) {
      return http({
        method: 'post',
        url: '/codeMirrorTeam/delete',
        data: data
      })
    },
    teamAddTeam(data) {
      return http({
        method: 'post',
        url: '/codeMirrorTeam/addTeam',
        data: data
      })
    },
    teamDeleteTeam(data) {
      return http({
        method: 'post',
        url: '/codeMirrorTeam/deleteTeam',
        data: data
      })
    },

    docAdd(data) {
      return http({
        method: 'post',
        url: '/codeMirrorDoc/add',
        data: data
      })
    },
    docUpdate(data) {
      return http({
        method: 'post',
        url: '/codeMirrorDoc/update',
        data: data
      })
    },
    docDelete(data) {
      return http({
        method: 'post',
        url: '/codeMirrorDoc/delete',
        data: data
      })
    },
  }
})
