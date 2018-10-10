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
          <button type="button" @click="saveCode">修改</button>
          <button type="button">删除</button>
        </div>
        <div class="code__box">
          <div>
            <label>
              武林秘籍：
              <input type="text">
            </label>
          </div>

          <div class="m-t-20 m-b-20">
            <button type="button"
                    class="m-r-10"
                    v-for="item in editCodeList"
                    @click="choiceCode(item.name)"
            >{{item.name}}</button>
          </div>

          <div class="code__pre">
            <pre class="">
              <code class="code p-20" v-for="item in sourceCodeList"
                    v-show="item.name === curCode"
                    v-html="item.code"
              >
              </code>
            </pre>

            <div class="code__textarea"
                 v-for="item in editCodeList"
                 v-show="item.name === curCode"
            >
              <textarea v-model="item.code">

              </textarea>
            </div>
          </div>

        </div>

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
        ],
        curCode: 'other',
        sourceCodeList: [
          {
            name: 'other',
            code: '',
          },
          {
            name: 'js',
            code: '',
          },
          {
            name: 'css',
            code: '',
          },
          {
            name: 'html',
            code: '',
          },
        ],
        editCodeList: [
          {
            name: 'other',
            code: '1',
          },
          {
            name: 'js',
            code: '2',
          },
          {
            name: 'css',
            code: '3',
          },
          {
            name: 'html',
            code: '4',
          },
        ],
        isHtmlReg: /<(\/?[a-z]+?)>/g,
        sourceCode: ''
      }
    },
    mounted () {

      let temp = hljs.highlightAuto('var a = 213')
      console.log(temp);

    },
    methods: {
      jumpPage(path) {
        this.$router.push({
          path
        })
      },
      inputCode() {
        console.log(this.sourceCode);
      },
      escapeHtmlCode(code) {
        return code.replace(this.isHtmlReg, '&lt$1&gt');
      },
      returnFormatCode(code) {
        let temp = hljs.highlightAuto(code);
        return temp.value
      },
      saveCode() {
        this.editCodeList.forEach((item, index) => {
          this.sourceCodeList[index].code = this.returnFormatCode(item.code);
        });
        setTimeout(() => {
          this.formatCode();
        }, 0)
      },
      formatCode() {
        let codeElms = document.querySelectorAll('.code');
        codeElms = Array.prototype.slice.call(codeElms);
        codeElms.forEach(e => {
          hljs.highlightBlock(e)
        })
      },
      choiceCode(name) {
        this.curCode = name;
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
  .code__box {
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #e0e0e0;
  }
  .code__textarea {
    width: 100%;
    height: 300px;
    textarea {
      width: 100%;
      height: 100%;
    }

  }

</style>
