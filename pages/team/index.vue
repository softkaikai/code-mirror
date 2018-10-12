<template>
  <section class="container">
    <div class="m-b-20">
      <label>
        团伙名字：
        <input type="text" v-model="searchName">
      </label>
      <button type="button" @click="teamFind">搜索</button>
    </div>
    <div class="m-b-20">
      <label>
        新增团伙：
        <input type="text" v-model="newTeam">
      </label>
      <button type="button" @click="teamAdd">新增</button>
    </div>
    <hr>
    <div class="m-t-20">
      <div class="f-l m-r-100">
        <p>我自己创建的团伙</p>
        <ul>
          <li class="team-list" v-for="obj in searchOwn"
              @click="jumpPage('/team/document', obj)"
          >
            {{obj.name}}
            <i class="cha" @click.stop="teamDelete(obj)"></i>
          </li>
        </ul>
      </div>
      <div class="f-l m-r-100">
        <p>我加入的团伙</p>
        <ul>
          <li class="team-list" v-for="obj in searchJoin"
              @click="jumpPage('/team/document', obj)"
          >
            {{obj.name}}
            <i class="cha" @click.stop="teamDeleteTeam(obj)"></i>
          </li>
        </ul>
      </div>
      <div class="f-l">
        <p>我未加入的团伙</p>
        <ul>
          <li class="team-list" v-for="obj in searchForeign"
              @click="jumpPage('/team/document', obj)"
          >
            {{obj.name}}
            <i class="add" @click.stop="teamAddTeam(obj)"></i>
          </li>
        </ul>
      </div>
    </div>

  </section>
</template>

<script>

  export default {
    data () {
      return {
        newTeam: '',
        account: '',
        searchName: '',
        teamList: [],
        searchOwn: [],
        searchJoin: [],
        searchForeign: [],
      }
    },
    mounted() {
      this.account = localStorage.getItem('account');
      this.teamFind();
    },
    methods: {
      teamAdd () {
        api.teamAdd({name: this.newTeam, account: this.account}).then(res => {
          let data = res.data;
          if (data.code === '0') {
            this.$notify({ group: 'code-mirror', type: 'success', text: '新增成功'});
            this.newTeam = '';
            this.teamFind();
          } else {
            this.$notify({ group: 'code-mirror', type: 'error', text: data.msg})
          }
        })
      },
      teamFind () {
        api.teamFind({name: this.searchName, account: this.account}).then(res => {
          let data = res.data;
          if (data.code === '0') {
            this.searchOwn = data.data.searchOwn;
            this.searchJoin = data.data.searchJoin;
            this.searchForeign = data.data.searchForeign;
          } else {
            this.$notify({ group: 'code-mirror', type: 'error', text: data.msg})
          }
        })
      },
      teamDelete (data) {
        api.teamDelete({id: data._id}).then(res => {
          let data = res.data;
          if (data.code === '0') {
            this.teamFind();
            this.$notify({ group: 'code-mirror', type: 'success', text: '删除成功'})
          } else {
            this.$notify({ group: 'code-mirror', type: 'error', text: data.msg})
          }
        })
      },
      teamAddTeam (data) {
        api.teamAddTeam({id: data._id, account: this.account}).then(res => {
          let data = res.data;
          if (data.code === '0') {
            this.teamFind();
            this.$notify({ group: 'code-mirror', type: 'success', text: '新增成功'})
          } else {
            this.$notify({ group: 'code-mirror', type: 'error', text: data.msg})
          }
        })
      },
      teamDeleteTeam (data) {
        api.teamDeleteTeam({id: data._id, account: this.account}).then(res => {
          let data = res.data;
          if (data.code === '0') {
            this.teamFind();
            this.$notify({ group: 'code-mirror', type: 'success', text: '删除成功'})
          } else {
            this.$notify({ group: 'code-mirror', type: 'error', text: data.msg})
          }
        })
      },
      jumpPage(path, data) {
        this.$router.push({
          path,
          query: {
            id: data._id
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .container {
    padding: 20px 0 0 20px;
  }
  .team-list {
    position: relative;

    margin: 10px 0;
    width: 200px;
    padding: 0 10px;

    line-height: 30px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;

    cursor: pointer;
  }
  .team-list:hover {
    .cha, .add {
      display: block;
    }
  }

</style>
