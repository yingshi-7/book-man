<!-- 图书管理页面 -->
<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
const bookData = ref([
  { bookName: '《三国演义》', author: '罗贯中', publishingHouse: '北京出版社', category: '文学', createTime: '1997-05-01', updateTime: '1997-05-01' },
  { bookName: '《水浒传》', author: '施耐奄', publishingHouse: '北京出版社', category: '文学', createTime: '1997-05-01', updateTime: '1997-05-01' },
  { bookName: '《西游记》', author: '吴承恩', publishingHouse: '北京出版社', category: '文学', createTime: '1997-05-01', updateTime: '1997-05-01' },
  { bookName: '《红楼梦》', author: '曹雪芹', publishingHouse: '北京出版社', category: '文学', createTime: '1997-05-01', updateTime: '1997-05-01' },
])

// 获取所有图书信息列表
import { addBookService, getBookListService } from '@/api/man.js';
import { ElMessage } from 'element-plus';
const getAllBookList = async () => {
  let res = await getBookListService()
  console.log(res);
  bookData.value = res.data
}
getAllBookList()

const searchData = ref({
  bookName: '',
  author: '',
  publishingHouse: '',
  category: '',
})

// 添加新增图书弹窗控制器
const dialogVisible = ref(false)

// 添加新增图书数据模型(与图书搜索数据模型一致)
const bookModel = ref({
  bookName: '',
  author: '',
  publishingHouse: '',
  category: '',
  createUser: ''
})

//添加分类表单校验
const rules = {
  bookName: [
    { required: true, message: '请输入图书名称', trigger: 'blur' },
  ],
  author: [
    { required: true, message: '请输入图书作者', trigger: 'blur' },
  ],
  publishingHouse: [
    { required: true, message: '请输入图书出版社', trigger: 'blur' },
  ],
  category: [
    { required: true, message: '请输入图书类别', trigger: 'blur' },
  ]
}

// 新增图书
const addBook = async () => {
  let res = await addBookService(bookModel.value)
  ElMessage.success(res.message ? res.message : '新增图书成功')
  // 关闭弹窗
  dialogVisible.value = false
  // 刷新图书列表
  getAllBookList()
}
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <div class="select">
          <div>
            <span>书名：</span>
            <el-input class="input" v-model="searchData.bookName" placeholder="请输入图书名称" />
            <span>作者：</span>
            <el-input class="input" v-model="searchData.author" placeholder="请输入作者名称" />
            <span>出版社：</span>
            <el-input class="input" v-model="searchData.publishingHouse" placeholder="请输入出版社名称" />
            <span>类别：</span>
            <el-input class="input" v-model="searchData.category" placeholder="请输入类别名称" />
          </div>
          <el-button class="search" type="primary">搜索</el-button>
        </div>
        <div class="extra">
          <el-button type="primary" @click="dialogVisible = true">新增图书</el-button>
        </div>
      </div>
    </template>
    <el-table :data="bookData" style="width: 100%">
      <el-table-column label="序号" width="100" type="index" />
      <el-table-column prop="bookName" label="图书" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="publishingHouse" label="出版社" />
      <el-table-column prop="category" label="分类" />
      <el-table-column prop="createUser" label="入库人员" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <!-- row 代表当前行的数据,后续在按钮的点击事件中可以用 row 获取当前行的数据 -->
          <el-button :icon="Edit" circle plain type="primary"></el-button>
          <el-button :icon="Delete" circle plain type="danger"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 添加新增图书弹窗 -->
    <el-dialog v-model="dialogVisible" title="添加弹窗" width="30%">
      <el-form :model="bookModel" :rules="rules" label-width="100px" style="padding-right: 30px;">
        <el-form-item label="图书名称" prop="bookName">
          <el-input v-model="bookModel.bookName" minlength="1" maxlength="10" />
        </el-form-item>
        <el-form-item label="图书作者" prop="author">
          <el-input v-model="bookModel.author" minlength="1" maxlength="10" />
        </el-form-item>
        <el-form-item label="出版社" prop="publishingHouse">
          <el-input v-model="bookModel.publishingHouse" minlength="1" maxlength="10" />
        </el-form-item>
        <el-form-item label="图书类别" prop="category">
          <el-input v-model="bookModel.category" minlength="1" maxlength="10" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addBook"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped lang="scss">
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .select {
    display: flex;

    .input {
      width: 200px;
    }

    .search {
      margin-left: 15px;
    }
  }
}
</style>