<template>
  <section class="container">
    <div class="m-b-20 clearfix">
      <p class="m-b-20">团伙老大：kaikai</p>
      <div>
        <p class="m-b-20">团伙帮凶：</p>
        <ul class="p-l-20">
          <li class="member-list" v-for="obj in member"
          >
            {{obj.name}}
          </li>
        </ul>
      </div>

    </div>
    <hr>
    <ul>
      <li class="team-list" v-for="obj in teamList"
          @click="jumpPage('/team/document')"
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
          {name: '文档1'},
          {name: '文档2'},
          {name: '文档3'},
          {name: '文档4'},
        ],
        member: [
          {name: 'Alice'},
          {name: 'Walter'},
          {name: 'Scofail'},
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
  .member-list {
    float: left;
    text-align: center;
    margin-right: 10px;
    min-width: 54px;
    padding: 0 10px;

    line-height: 30px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;

    cursor: pointer;
  }

</style>

