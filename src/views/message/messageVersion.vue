<template>
	<div class="administration">
		<el-card class="box-card">
			<div class="app-container">
				<div class="tab_box">
					<div class="tab">
						<el-table :data="CurrencyInfo" border style="width: 100%" :header-cell-style="{color: '#515a6e', fontSize: '12px'}">
							<el-table-column prop="avatar" label="头像">
								<template slot-scope="scope">
									<img :src="scope.row.avatar" alt="">
								</template>
							</el-table-column>
							<el-table-column prop="name" label="用户名">
							</el-table-column>
							<el-table-column prop="cname" label="城市">
							</el-table-column>
							<el-table-column prop="content" label="内容">
								<template slot-scope="scope">
									<span v-html="scope.row.content"></span>
								</template>
							</el-table-column>
							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button @click="delClick(scope.row._id)" type="text" size="small">删除</el-button>
									<el-button type="text" size="small"  @click="desc(scope.row._id)">详情</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="page">
						<el-pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
						 :page-sizes="[10, 20, 30]" @pagination="administrationList">
						</el-pagination>
					</div>
				</div>
			</div>
		</el-card>
		<!-- 详情区域   -->
		<div class="zujian">
		  <el-dialog title="详情" :visible.sync="dialogFormVisible" width="500px">
			 <div class="tab_box">
			 	<div class="tab">
			 		<el-table :data="detailsList" border style="width: 100%" :header-cell-style="{color: '#515a6e', fontSize: '12px'}">
			 			<el-table-column prop="avatar" label="头像">
			 				<template slot-scope="scope">
			 					<img :src="scope.row.avatar" alt="">
			 				</template>
			 			</el-table-column>
			 			<el-table-column prop="name" label="用户名">
			 			</el-table-column>
			 			<el-table-column prop="cname" label="城市">
			 			</el-table-column>
			 			<el-table-column prop="content" label="内容">
			 				<template slot-scope="scope">
			 					<span v-html="scope.row.content"></span>
			 				</template>
			 			</el-table-column>
			 		</el-table>
			 	</div>
			 </div> 
		    <div class="form_box">
		      <el-form ref="form" :model="form" label-width="180px">
		        <el-form-item label="state状态">
					<el-input v-model="form.state" placeholder="请输入回复内容"/>
		        </el-form-item>
				<el-form-item label="回复内容">
				  <el-input type="textarea" v-model="form.content"></el-input>
				</el-form-item>
		      </el-form>
		    </div>
		    <div slot="footer" class="dialog-footer">
		      <el-button @click="dialogFormVisible = false">取消</el-button>
		      <el-button type="primary" @click="addCurrency">确 定</el-button>
		    </div>
		  </el-dialog>
		</div>
	</div>

</template>

<script>
	import Api from "../../api/messageVersion.js";
	export default {
		data() {
			return {
				total: 0, // 总条数
				queryParams: { // 查询参数
					pageNum: 1,
					pageSize: 10
				},
				CurrencyInfo: [],
				detailsList:[],
				form: {
					state:1,
					name:'博主',
					avatar:'http://jion.3vfree.net/logo.png',
					cname:returnCitySN["cname"],
					create_Time:new Date(),
					id:'',
					content:'',
				},
				dialogTableVisible: false,
				dialogFormVisible: false,
			}
		},
		methods: {
			//博主回复
			addCurrency() {
				this.dialogFormVisible = false;
				var createTime =this.timestampToTime(this.form.create_Time)
				this.form.create_Time=createTime
				Api.addReply(this.form).then((res) => {
					if (res.code == 0) {
						this.$message.success(res.message);
					} else {
						this.$message.error(res.message);
					}
				});
			},
			
			// 时间 格式化成 2018-12-12 12:12:00
			timestampToTime(timestamp){
				const date = new Date(timestamp);
				const Y = date.getFullYear() + '-';
				const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
				const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
				const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
				const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
				return Y + M + D + h + m + s;
			},
			
			//查看详情
			desc(val){
				this.dialogFormVisible = true
				this.form.id=val
				Api.detailsList(val).then((res) => {
					if (res.code == 0) {
						this.detailsList=res.data.reply_list
						this.$message.success(res.message);
					} else {
						this.$message.error(res.message);
					}
				});
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
							if (res.code == 0) {
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
				Api.getLink().then((res) => {
					this.CurrencyInfo = res.data.list;
					this.total = res.data.count;
				});
			},
		},
		
		created() { //初始化数据
			this.administrationList()
		}
	}
</script>

<style scoped>
	.tab_btn {
		margin-bottom: 20px;
	}

	.tab>>>.el-table th>.cell {
		text-align: center;
	}

	.tab>>>.el-table .cell {
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

	.tab>>>.el-table th.gutter {
		display: table-cell !important
	}

	.administration>>>.el-card__header {
		padding: 20px 20px 0 20px;
	}

	.administration>>>.el-input__inner {
		height: 32px;
		line-height: 32px;
	}

	.zujian>>>.ql-editor {
		height: 200px;
	}
</style>
