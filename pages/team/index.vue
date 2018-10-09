<template>
  <section class="container">
    <div class="m-b-20">
      <label>
        团伙名字：
        <input type="text">
      </label>
      <button type="button">搜索</button>
    </div>
    <hr>
    <ul>
      <li class="team-list" v-for="obj in teamList"
          @click="jumpPage('/team/member')"
      >
        {{obj.name}}
      </li>
    </ul>
  </section>
</template>

<script>

  export default {
    data () {
      return {
        teamList: [
          {name: 'team1'},
          {name: 'team2'},
          {name: 'team3'},
          {name: 'team4'},
        ]
      }
    },
    methods: {
      jumpPage(path) {
        this.$router.push({
          path
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
    margin: 10px 0;
    width: 200px;
    padding: 0 10px;

    line-height: 30px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;

    cursor: pointer;
  }

</style>
