<template>
  <div class="administration">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :model="queryParams" ref="queryForm" :inline="true">
          <div class="search_box">
            <div class="search">
              <div>
                <el-form-item label="友链名称" prop="link">
                  <el-input
                    v-model="queryParams.link"
                    placeholder="请输入友链名称"
                    class="search_select"
                    @keyup.enter.native="handleQuery"
                  ></el-input>
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
              type="cyan"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
              >重置</el-button
            >
          </div>
          <div class="tab">
            <el-table
              :data="CurrencyInfo"
              border
              style="width: 100%"
              :header-cell-style="{ color: '#515a6e', fontSize: '12px' }"
            >
              <el-table-column prop="name" label="友链名称"> </el-table-column>
              <el-table-column prop="url" label="友链地址"> </el-table-column>
              <el-table-column prop="icon" label="LOGO地址"> </el-table-column>
              <el-table-column prop="desc" label="友链描述"> </el-table-column>
              <el-table-column prop="postbox" label="联系邮箱">
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click="operationClick(scope.row)"
                    type="text"
                    size="small"
                    >通过</el-button
                  >
                  <el-button
                    @click="delClick(scope.row._id)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              v-show="total > 0"
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
    </el-card>
  </div>
</template>

<script>
import Api from "../../../api/linkAudit";
export default {
  data() {
    return {
      total: 0, // 总条数
      queryParams: {
        // 查询参数
        pageNum: 1,
        pageSize: 10,
      },
      CurrencyInfo: [],
    };
  },
  methods: {
    //通过
    operationClick(val) {
      let {state,_id} =val
      status=''
      if(state==0){
        status=1
      }else{
        status=0
      }
      Api.updList(_id,Number(status)).then((res)=>{
        if(res.code==0){
          this.$message.success(res.message);
          this.administrationList()
        }
      })
    },
    //删除
    delClick(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Api.delList(id).then((res) => {
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
    //搜索按钮操作
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.administrationList();
    },
    //重置按钮操作
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    //列表
    administrationList() {
      Api.getLink().then((res) => {
        this.CurrencyInfo = res.data.list;
        this.total = res.data.count;
      });
    },
  },
  created() {
    //初始化数据
    this.administrationList();
  },
};
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
  display: table-cell !important;
}
.administration >>> .el-card__header {
  padding: 20px 20px 0 20px;
}
.search {
  display: flex;
}
.administration >>> .el-input__inner {
  height: 32px;
  line-height: 32px;
}
</style>
