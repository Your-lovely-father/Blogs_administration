<template>
  <div class="administration">	  
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :model="queryParams" ref="queryForm" :inline="true">
          <div class="search_box">
            <div class="search">
              <div>
                <el-form-item label="文章标题" prop="title">
                  <el-input v-model="queryParams.title" placeholder="请输入文章标题" class="search_select"
                            @keyup.enter.native="handleQuery"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="是否置顶" prop="placedTop">
                  <el-select
                      v-model="queryParams.placedTop"
                      placeholder="请选择是否置顶"
                      clearable
                      size="small"
                  >
                    <el-option
                        v-for="itme in placedTopList"
                        :key="itme.value"
                        :label="itme.label"
                        :value="itme.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
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
            <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
                  prop="tags"
                  label="标签"
              >
              </el-table-column>
              <el-table-column
                  prop="img_url"
                  label="配图"
              >
                <template slot-scope="scope">
                  <img :src="scope.row.img_url" alt="图片加载失败" style="width: 100px;height: 100px;">
                </template>
              </el-table-column>
              <el-table-column
                  prop="desc"
                  label="描述"
              >
              </el-table-column>
              <el-table-column
                  prop="origin"
                  label="原创"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.origin==1?'原创':'转载'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="top"
                  label="置顶"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.top==1?'是':'否'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="create_time"
                  label="时间"
                  :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                  fixed="right"
                  label="操作"
              >
                <template slot-scope="scope">
                  <el-button @click="delClick(scope.row._id)" type="text" size="small">删除</el-button>
				  <el-button @click="seeClick(scope.row._id)" type="text" size="small">详情操作</el-button>
                  <el-button @click="updClick(scope.row)" type="text" size="small">是否置顶</el-button>
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
              <el-row>
                <el-col :span="12">
                  <el-form-item label="标题">
                    <el-input v-model="form.title" placeholder="请输入标题"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="标签">
                    <el-input v-model="form.tags" placeholder="请输入标签"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="是否置顶">
                    <el-select v-model="form.top" placeholder="请选择">
                      <el-option v-for="dict in placedTopList" :key="dict.value" :label="dict.label"
                                 :value="dict.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="原创/转载">
                    <el-select v-model="form.origin" placeholder="请选择">
                      <el-option v-for="dict in reprintList" :key="dict.value" :label="dict.label"
                                 :value="dict.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="文章描述">
                <el-input v-model="form.desc" type="textarea" placeholder="请输入文章描述"></el-input>
              </el-form-item>
              <el-form-item label="文章配图">
					<el-input v-model="form.img_url" placeholder="请输入图片链接"/>
              </el-form-item>
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
import Api from "../../../api/articleRelease.js";
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      total: 0, // 总条数
      queryParams: {// 查询参数
        pageNum: 1,
        pageSize: 10
      },
      CurrencyInfo: [],
      form: {},
      dialogTableVisible: false,
      dialogFormVisible: false,
      placedTopList: [{
        value: '1',
        label: '是'
      }, {
        value: '2',
        label: '否'
      }],
      reprintList: [{
        value: '1',
        label: '原创'
      }, {
        value: '2',
        label: '转载'
      }]
    }
  },
  methods: {
    seeClick(row){
      this.$router.push('/detailsRelease')
	  this.$store.commit('detailsFn',row)
	  
    },
    updClick(row){
		let {_id,top} = row;
		var data={
			id:_id,
			top:''
		}
		if(top == 1){
			data.top=0
		}else{
			data.top=1
		}
		Api.updArticle(data).then((res) => {
		  if (res.code ==0) {
		    this.$message.success(res.message);
		    this.administrationList();
		  } else {
		    this.$message.error(res.message);
		  }
		});
		
    },
    addCurrency() {
      this.dialogFormVisible = false
	  Api.addArticle(this.form).then((res) => {
	    if (res.code ==0) {
	      this.$message.success(res.message);
	      this.administrationList();
	    } else {
	      this.$message.error(res.message);
	    }
	  });
    },
    //搜索按钮操作
    handleQuery() {
      this.queryParams.pageNum = 1
      this.administrationList()
    },
    //重置按钮操作
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
   //删除
   delClick(id) {
     this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
       confirmButtonText: "确定",
       cancelButtonText: "取消",
       type: "warning",
     })
       .then(() => {
         Api.delArticle(id).then((res) => {
           if (res.code ==0) {
             this.$message.success(res.message);
             this.administrationList();
           } else {
             this.$message.error(res.message);
           }
         });
       })
       .catch(() => {
         this.$message({
           type: "info",
           message: "已取消删除",
         });
       });
   },
    //列表
    administrationList() {
		Api.getArticle().then((res) => {
		  this.CurrencyInfo = res.data.list;
		  this.total = res.data.count;
		});
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
.administration>>>.el-card__header{
  padding: 20px 20px 0 20px;
}
.search {
  display: flex;
}
.administration>>>.el-input__inner{
  height: 32px;
  line-height: 32px;
}
@media (max-width: 790px) {
  .search{
    display: flex;
    flex-wrap: wrap;
  }
}
@media (max-width: 920px) {
  .zujian>>>.el-dialog{
    width: 800px !important;

  }
  .form_box{
    display: flex;
    flex-wrap: wrap;
  }
  .el-button--text{
    margin-left: 10px;
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
  .el-button--text{
    margin-left: 10px;
  }
}
</style>
<style>
@media (max-width: 455px) {
  .el-message-box{
    width: 350px !important;
  }
}
@media (max-width: 380px) {
  .el-message-box{
    width: 330px !important;
  }
}
</style>
