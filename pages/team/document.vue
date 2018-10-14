<template>
  <section class="container">
    <div class="m-b-20 clearfix">
      <p class="m-b-20">团伙老大：{{account}}</p>
      <div>
        <p class="m-b-20">团伙帮凶：</p>
        <ul class="p-l-20">
          <li class="member-list" v-for="obj in teamData.member"
          >
            {{obj}}
          </li>
        </ul>
      </div>
    </div>
    <div class="m-b-20 clearfix">
      <p class="m-b-20">帮凶文档：</p>
      <ul class="p-l-20">
        <li class="member-list" v-for="(obj, index) in teamData.docs"
            @click="fillData(index)"
            :class="{'member-list--active': obj.title === showTitle}"
        >
          {{obj.title}}
          <i class="cha" @click="docDelete(obj)"></i>
        </li>
        <li class="member-list doc-add"
            @click="addNewDoc">新增</li>
      </ul>

    </div>
    <hr>
    <section class="content">
      <!--<div class="content__l">
        <ul>
          <li class="team-list" v-for="obj in teamList"
              @click="jumpPage('/team/document')"
          >
            {{obj.name}}
          </li>
        </ul>
      </div>-->
      <div class="content__r">
        <div class="m-t-10 m-b-20">
          <button type="button" v-show="!edit" @click="switchEdit">修改</button>
          <button type="button" v-show="edit" @click="docUpdate">更新</button>
          <button type="button" v-show="edit" @click="docAdd">新增</button>
        </div>
        <div class="code__box">
          <div>
            <label>
              武林秘籍：
              <input type="text" v-show="edit" v-model="docTitle">
              <input type="text" v-show="!edit" v-model="showTitle" readonly>
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
            <pre class="" v-show="!edit">
              <code class="code p-20" v-for="item in sourceCodeList"
                    v-show="item.name === curCode"
                    v-html="item.code"
              >
              </code>
            </pre>

            <div v-show="edit">
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

      </div>
    </section>

  </section>
</template>

<script>

  export default {
    data () {
      return {
        account: '',
        teamId: '',
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
        docTitle: '',
        showTitle: '',
        curIndex: '',
        edit: false,
        isHtmlReg: /<(\/?[a-z]+?)>/g,
        sourceCode: '',
        teamData: {
          member: []
        },
      }
    },
    mounted () {
      this.account = localStorage.getItem('account');
      this.teamId = this.$route.query.id;
      this.teamFindById();
    },
    methods: {
      jumpPage(path) {
        this.$router.push({
          path
        })
      },
      teamFindById () {
        api.teamFindById({id: this.teamId}).then(res => {
          let data = res.data;
          if (data.code === '0') {
            this.teamData = data.data;
            this.teamData.docs = this.teamData.docs || [];
            this.fillData();
            this.saveCode();
            console.log(this.teamData);
          } else {
            this.$notify({ group: 'code-mirror', type: 'error', text: data.msg})
          }
        })
      },
      isSameTitle() {
        for (let [index, val] of this.teamData.docs.entries()) {
          if (val.title === this.docTitle) {
            return false;
          }
        }
        return true;
      },
      fillData (index = 0) {
        let docs = this.teamData.docs;
        if (docs.length) {
          let doc = docs[index];
          this.curIndex = index;
          this.sourceCodeList[0].code = this.editCodeList[0].code = doc.other;
          this.sourceCodeList[1].code = this.editCodeList[1].code = doc.js;
          this.sourceCodeList[2].code = this.editCodeList[2].code = doc.css;
          this.sourceCodeList[3].code = this.editCodeList[3].code = doc.html;
          this.docTitle = doc.title;
          this.showTitle = doc.title;
        }
      },
      docAdd () {
        if (!this.docTitle) {
          this.$notify({ group: 'code-mirror', type: 'error', text: '请填写标题'});
          return false;
        }
        if (!this.isSameTitle()) {
          this.$notify({ group: 'code-mirror', type: 'error', text: '标题已存在'});
          return false;
        }
        let apiData = {
          id: this.teamId,
          doc: {
            title: this.docTitle,
            other: this.editCodeList[0].code,
            js: this.editCodeList[1].code,
            css: this.editCodeList[2].code,
            html: this.editCodeList[3].code,
          }
        };
        api.docAdd(apiData).then(res => {
          let data = res.data;
          if (data.code === '0') {
            this.teamFindById();
            this.$notify({ group: 'code-mirror', type: 'success', text: '新增成功'})
          } else {
            this.$notify({ group: 'code-mirror', type: 'error', text: data.msg})
          }
          this.edit = false;
        })
      },
      docUpdate () {
        if (!this.docTitle) {
          this.$notify({ group: 'code-mirror', type: 'error', text: '请填写标题'});
          return false;
        }
        if (this.curIndex === -1) {
          this.$notify({ group: 'code-mirror', type: 'error', text: '索引错误'});
          return false;
        }
        let apiData = {
          id: this.teamId,
          index: this.curIndex,
          doc: {
            title: this.docTitle,
            other: this.editCodeList[0].code,
            js: this.editCodeList[1].code,
            css: this.editCodeList[2].code,
            html: this.editCodeList[3].code,
          }
        };
        api.docUpdate(apiData).then(res => {
          let data = res.data;
          if (data.code === '0') {
            this.teamFindById();
            this.$notify({ group: 'code-mirror', type: 'success', text: '更新成功'})
          } else {
            this.$notify({ group: 'code-mirror', type: 'error', text: data.msg})
          }
          this.edit = false;
        })
      },
      docDelete (data) {
        api.docDelete({id: this.teamId,title: data.title}).then(res => {
          let data = res.data;
          if (data.code === '0') {
            this.teamFindById();
            this.$notify({ group: 'code-mirror', type: 'success', text: '删除成功'})
          } else {
            this.$notify({ group: 'code-mirror', type: 'error', text: data.msg})
          }
          this.edit = false;
        })
      },
      addNewDoc () {
        this.edit = true;
        this.docTitle = '';
        this.showTitle = '';
        this.sourceCodeList[0].code = this.editCodeList[0].code = '';
        this.sourceCodeList[1].code = this.editCodeList[1].code = '';
        this.sourceCodeList[2].code = this.editCodeList[2].code = '';
        this.sourceCodeList[3].code = this.editCodeList[3].code = '';
      },
      switchEdit () {
        this.edit = !this.edit;
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
    position: relative;

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
  .member-list--active {
    background: #07d;
    color: #fff;
    border-color: #07d;
  }
  .member-list:hover {
    .cha {
      display: block;
    }
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
    padding-right: 10px;
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
