<template>
  <div class="administration">
    <el-card class="box-card">
      <div class="app-container">
        <div class="tab_box">
          <div class="tab_btn">
            <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="dialogFormVisible = true"
            >新增
            </el-button>
          </div>
          <div class="tab">
            <el-table
                :data="CurrencyInfo"
                border
                style="width: 100%"
                :header-cell-style="{color: '#515a6e', fontSize: '12px'}"
            >
              <el-table-column
                  prop="title"
                  label="标题"
              >
              </el-table-column>
              <el-table-column
                  prop="content"
                  label="内容"
              >
              </el-table-column>
              <el-table-column
                  fixed="right"
                  label="操作"
              >
                <template slot-scope="scope">
                  <el-button @click="delClick(scope.row.coinId)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
                v-show="total>0"
                :total="total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                :page-sizes="[10, 20, 30]"
                @pagination="administrationList"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- 添加表单区域   -->
      <div class="zujian">
        <el-dialog title="新增" :visible.sync="dialogFormVisible" width="850px">
          <div class="form_box">
            <el-form ref="form" :model="form" label-width="180px">

              <el-form-item label="标题">
                <el-input v-model="form.title" placeholder="请输入标题"/>
              </el-form-item>

              <quill-editor
                  v-model="content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                  @change="onEditorChange($event)" class="quillEditor">
              </quill-editor>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="addCurrency">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>

</template>

<script>

export default {
  data() {
    return {
      total: 0, // 总条数
      queryParams: {// 查询参数
        pageNum: 1,
        pageSize: 10
      },
      CurrencyInfo: [
        {
          title: 'webstrom',
          content: 'webstrom',
        }
      ],
      form: {},
      dialogTableVisible: false,
      dialogFormVisible: false,
      content: null,
      editorOption: {}
    }
  },
  methods: {
    addCurrency() {
      this.dialogFormVisible = false
    },
    onEditorBlur() {//失去焦点事件
    },
    onEditorFocus() {//获得焦点事件
    },
    onEditorChange() {//内容改变事件
    },
    delClick(row) {//删除
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //.....
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //列表
    administrationList() {
      //....
    },
  },
  created() {//初始化数据
    this.administrationList()
  }
}
</script>

<style scoped>
.tab_btn {
  margin-bottom: 20px;
}

.tab >>> .el-table th > .cell {
  text-align: center;
}

.tab >>> .el-table .cell {
  text-align: center;
}

.page {
  text-align: right;
  padding: 22px 0;
}

.form_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.tab >>> .el-table th.gutter {
  display: table-cell !important
}

.administration >>> .el-card__header {
  padding: 20px 20px 0 20px;
}

.administration >>> .el-input__inner {
  height: 32px;
  line-height: 32px;
}
.zujian>>>.ql-editor{
  height:200px;
}
@media (max-width: 920px) {
  .zujian>>>.el-dialog{
    width: 800px !important;

  }
  .form_box{
    display: flex;
    flex-wrap: wrap;
  }
}
@media (max-width: 860px) {
  .zujian>>>.el-dialog{
    width: 600px !important;

  }
  .zujian>>>.el-col-12{
    width: auto !important;
  }
}
@media (max-width: 860px) {
  .zujian>>>.el-dialog{
    width: 500px !important;

  }
}
@media (max-width: 380px) {
  .zujian>>>.el-dialog{
    width: 350px !important;
  }
  .zujian>>>.el-form-item__label{
    width: 100px !important;
  }
  .zujian>>>.el-form-item__content{
    margin-left: 120px!important;
  }
}
</style>
