<!-- 图书管理页面 -->
<script setup>
import { Edit, Delete, Checked } from '@element-plus/icons-vue'
import { ref } from 'vue'
const bookData = ref([
  { bookName: '《三国演义》', author: '罗贯中', publishingHouse: '北京出版社', category: '文学', createTime: '1997-05-01', updateTime: '1997-05-01' },
  { bookName: '《水浒传》', author: '施耐奄', publishingHouse: '北京出版社', category: '文学', createTime: '1997-05-01', updateTime: '1997-05-01' },
  { bookName: '《西游记》', author: '吴承恩', publishingHouse: '北京出版社', category: '文学', createTime: '1997-05-01', updateTime: '1997-05-01' },
  { bookName: '《红楼梦》', author: '曹雪芹', publishingHouse: '北京出版社', category: '文学', createTime: '1997-05-01', updateTime: '1997-05-01' },
])

import { getUserItemService } from '@/api/user.js'
// 获取当前登录用户的用户名
const upBookData = async (createUser) => {
  let res = await getUserItemService(createUser)
  return createUser = res.data.username
}

// 获取所有图书信息列表
import { addBookService, deleteBookService, getBookListService, getSearchBookService, updateBookService } from '@/api/man.js';
import { ElMessage, ElMessageBox } from 'element-plus';
import { borrowBookService } from '@/api/borrow';
const getAllBookList = async () => {
  let res = await getBookListService()
  bookData.value = res.data
  // 将createUser字段替换为用户名
  for (let i = 0; i < bookData.value.length; i++) {
    bookData.value[i].createUser = await upBookData(bookData.value[i].createUser)
  }
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

// 新增图书信息
const addBook = async () => {
  let res = await addBookService(bookModel.value)
  ElMessage.success(res.message ? res.message : '新增成功')
  // 关闭弹窗
  dialogVisible.value = false
  // 刷新图书列表
  getAllBookList()
}

// 弹窗标题
const title = ref('')

// 修改图书信息回显
const showDialog = (row) => {
  title.value = '编辑图书'
  dialogVisible.value = true
  //将row中的数据赋值给bookModel
  bookModel.value = { ...row }
  //后面删除图书的时候必须传递图书的id，所以扩展一个id属性
  bookModel.value.id = row.id
}

// 修改图书信息
const updateBook = async () => {
  let res = await updateBookService(bookModel.value)
  ElMessage.success(res.message ? res.message : '修改成功')
  // 关闭弹窗
  dialogVisible.value = false
  // 刷新图书列表
  getAllBookList()
}

// 清空模型数据
const clearBookModel = () => {
  bookModel.value = { ...'' }
}

//删除图书  给删除按钮绑定事件
const deleteBook = (row) => {
  ElMessageBox.confirm(
    '你确认删除该图书信息吗?',
    '温馨提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
    .then(async () => {
      //用户点击了确认
      let res = await deleteBookService(row.id)
      ElMessage.success(res.message ? res.message : '删除成功')
      // 刷新图书列表
      getAllBookList()
    })
    .catch(() => {
      //用户点击了取消
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}

// 借阅图书
// const borrowBook = (row) => {
//   let res = borrowBookService(row.id)
// }
// fnMap(待办)借阅图书按钮绑定事件

// 分页模块开关
const pageSwitch = ref(false)

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(5)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size
  searchBook()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  searchBook()
}

// 图书搜索
const searchBook = async () => {
  let params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    ...searchData.value
  }
  if (params.bookName === '' && params.author === '' && params.publishingHouse === '' && params.category === '') {
    pageSwitch.value = false
    getAllBookList()
  } else {
    pageSwitch.value = true
    let res = await getSearchBookService(params)
    //渲染视图
    total.value = res.data.total
    bookData.value = res.data.items
    // 将createUser字段替换为用户名
    for (let i = 0; i < bookData.value.length; i++) {
      bookData.value[i].createUser = await upBookData(bookData.value[i].createUser)
    }
  }
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
          <el-button class="search" type="primary" @click="searchBook()">搜索</el-button>
        </div>
        <div class="extra">
          <el-button type="primary" @click="title = '新增图书'; dialogVisible = true; clearBookModel()">新增图书</el-button>
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
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <!-- row 代表当前行的数据,后续在按钮的点击事件中可以用 row 获取当前行的数据 -->
          <el-tooltip class="box-checked-item" effect="dark" content="借阅" placement="top">
            <el-button :icon="Checked" circle plain type="primary"></el-button>
          </el-tooltip>
          <el-tooltip class="box-edit-item" effect="dark" content="编辑" placement="top">
            <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
          </el-tooltip>
          <el-tooltip class="box-delete-item" effect="dark" content="删除" placement="top">
            <el-button :icon="Delete" circle plain type="danger" @click="deleteBook(row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 分页条 -->
    <el-pagination v-show="pageSwitch" v-model:current-page="pageNum" v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15]" background layout="jumper, total, sizes, prev, pager, next" :total="total"
      @size-change="onSizeChange" @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end;" />

    <!-- 添加新增图书弹窗 -->
    <el-dialog v-model="dialogVisible" :title="title" width="30%">
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
          <el-button type="primary" @click="title === '新增图书' ? addBook() : updateBook()"> 确认 </el-button>
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