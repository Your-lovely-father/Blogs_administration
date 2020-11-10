<template>
    <div class="browse">
      <div class="admin_box">
       <div class="lf">
         <el-card class="box-card">
           <div slot="header" class="clearfix">
             <span>admin管理员</span>
             <el-button style="float: right; padding: 3px 0" type="text">说说修改</el-button>
           </div>
           <div class="portrait">
             <img src="../../assets/img/hei.jpg" alt="">
             <el-upload
                 class="upload-demo"
                 action="https://jsonplaceholder.typicode.com/posts/"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :before-remove="beforeRemove"
                 :limit="3"
                 :show-file-list="false"
                 :on-exceed="handleExceed"
                 :file-list="fileList"
             >
               <el-button size="small" type="primary">更换头像</el-button>
             </el-upload>
           </div>
           <div class="describe">
             <el-input
                 type="textarea"
                 :rows="2"
                 placeholder="请输入内容"
                 v-model="textarea">
             </el-input>
           </div>
         </el-card>
       </div>
        <div class="ri">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>浏览量</span>
            </div>
            <div class="browse_content">
              <div class="single border">
                <p>999</p>
                <p>用户访问量</p>
              </div>
              <div class="single border">
                <p>999</p>
                <p>文章访问量</p>
              </div>
              <div class="single border">
                <p>999</p>
                <p>文章评论总条数</p>
              </div>
              <div class="single">
                <p>999</p>
                <p>留言总条数</p>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          textarea:"正因为有要好好实现的梦想， 所以今天也要好好加油。",
          fileList: [{name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
      },
      methods: {
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        }
      }
    }
</script>

<style scoped>
  .browse{
    padding: 10px;
    box-sizing: border-box;
  }
  .browse>>>.el-card__header{
    padding: 10px 20px;
  }
  .browse_content{
    width: 100%;
    display: flex;
  }
  .single{
    width: 25%;
    text-align: center;
  }
  .single>p:nth-child(1){
    font-size: 20px;
    color: blue;
    font-weight: 700;
    margin-bottom: 5px;
  }
  .single>p:nth-child(2){
    font-weight: 700;
    color: #333;
  }
  .border{
    border-right: 1px #eee solid;
  }
  .admin_box{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .lf{
    width: 40%;
  }
  .ri{
    width: 59%;
  }
  .portrait{
    text-align: center;
  }
  .portrait>img{
    display: block;
    margin: 0 auto;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .describe{
    margin-top: 10px;
  }
  @media (max-width:1000px) {
    .admin_box{
      flex-flow: wrap;
    }
    .lf{
      width: 100%;
    }
    .ri{
      width: 100%;
      margin-top: 15px;
    }
  }

  @media (max-width:520px) {
    .browse_content{
      display: flex;
      flex-flow: wrap;
    }
    .single{
      width: 49%;
    }
    .border{
      border-right: none;
    }
    .single{
      margin-top: 10px;
    }
    /*.ri{*/
    /*  width: 100%;*/
    /*  margin-top: 15px;*/
    /*}*/
  }
</style>
