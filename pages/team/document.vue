<template>
  <section class="container">
    <div class="m-b-20 clearfix">
      <p class="m-b-20">帮凶文档：</p>
      <ul class="p-l-20">
        <li class="member-list" v-for="obj in teamList"
        >
          {{obj.name}}
        </li>
        <li class="member-list doc-add">新增</li>
      </ul>

    </div>
    <hr>
    <section class="content">
      <div class="content__l">
        <ul>
          <li class="team-list" v-for="obj in teamList"
              @click="jumpPage('/team/document')"
          >
            {{obj.name}}
          </li>
        </ul>
      </div>
      <div class="content__r">
        <div class="m-t-10 m-b-20">
          <button type="button">修改</button>
          <button type="button">删除</button>
        </div>
        <div class="code"></div>
      </div>
    </section>

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
    margin-right: 10px;
    min-width: 54px;
    padding: 0 10px;
    text-align: center;

    line-height: 30px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;

    cursor: pointer;
  }
  .doc-add {
    color: #07d;
  }

  .content {
    display: flex;
  }
  .content__l {
    width: 210px;
    border-right: 1px solid #e0e0e0;
  }
  .content__r {
    flex: 1;
    padding-left: 10px;
  }

</style>
