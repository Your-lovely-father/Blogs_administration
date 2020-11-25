<template>
  <div class="administration">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章详情发布</span>
      </div>
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
                  prop="author"
                  label="作者"
              >
              </el-table-column>
              <el-table-column
                  prop="link"
                  label="本文网址"
              >
              </el-table-column>
              <el-table-column
                  prop="content"
                  label="内容"
              >
			  <template slot-scope="scope">
				<span v-html="scope.row.content"></span>
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

              <el-form-item label="作者">
                <el-input v-model="form.author" placeholder="请输入作者"/>
              </el-form-item>
              <el-form-item label="本文网址">
                <el-input v-model="form.link" placeholder="请输入本文网址"/>
              </el-form-item>

              <quill-editor
                  v-model="form.content"
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
import Api from '../../../api/detailsRelease.js'
export default {
  data() {
    return {
      total: 0, // 总条数
      queryParams: {// 查询参数
        pageNum: 1,
        pageSize: 10
      },
      CurrencyInfo: [],
      form: {},
      dialogFormVisible: false,
      dialogFormVisible1: false,
      content: null,
      editorOption: {}
    }
  },
  methods: {
    addCurrency() {
      this.dialogFormVisible = false
	  this.form.id=this.$store.state.essayDesc
	  Api.addDetails(this.form).then((res) => {
	    if (res.code ==0) {
	      this.$message.success(res.message);
	      this.administrationList();
	    } else {
	      this.$message.error(res.message);
	    }
	  });
    },
	onEditorBlur() {//失去焦点事件
	},
	onEditorFocus() {//获得焦点事件
	},
	onEditorChange() {//内容改变事件
	},
    //列表
    administrationList() {
     Api.getDetails(this.$store.state.essayDesc).then((res) => {
       if (res.code ==0) {
		   this.CurrencyInfo=res.data.details_list
       } 
     });
    },
  },
  created() {//初始化数据
    this.administrationList()
  },
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
.administration >>> .el-input__inner {
  height: 32px;
  line-height: 32px;
}
.zujian>>>.ql-editor{
  height:200px;
}
.box-card:nth-child(2){
  margin-top: 15px;
}
.box-card:nth-child(3){
  margin-top: 15px;
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
