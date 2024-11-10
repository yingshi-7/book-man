<!-- 借阅图书管理页面 -->
<script setup>
import { Discount, Finished } from '@element-plus/icons-vue'
import { getAllBorrowInfoService, getSearchBorrowInfoService, renewBookService, updateBorrowStatusService } from '@/api/borrow';
import { getBookDetailService } from '@/api/man';
import { getUserItemService } from '@/api/user';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';


//定义借阅图书的数据
const bookData = ref([]);

//查询所有图书借阅信息接口调用
const getBorrowBookList = async () => {
  let result = await getAllBorrowInfoService()
  // 使用 for...of 而不是 forEach，便于使用 await
  changeMain(result.data)
}

// 使用接口将userId和bookId转换为对应内容
const changeMain = async (data) => {
  // 清空数据
  bookData.value = []
  // 遍历数据
  for (const element of data) {
    // 获取借阅人信息
    let userItem = await getUserItemService(element.userId.toString())
    // 获取图书信息
    let bookDetail = await getBookDetailService(element.bookId.toString())
    // 将借阅人信息、图书信息、借阅信息封装到一个对象中
    bookData.value.push({
      userItem: userItem,
      bookDetail: bookDetail,
      borrowInfo: element
    })
  }
}
getBorrowBookList()

// 计算借阅状态对应的标签类型
const getTagType = (status) => {
  if (status === '借出') {
    return 'primary'
  } else if (status === '归还') {
    return 'success'
  } else {
    return 'danger'
  }
}

//定义查询数据
const searchData = ref({
  username: '',
  bookName: '',
  author: '',
  status: ''
})

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
  if (params.bookName === '' && params.author === '' && params.username === '' && params.status === '') {
    pageSwitch.value = false
    getBorrowBookList()
  } else {
    pageSwitch.value = true
    let res = await getSearchBorrowInfoService(params)
    console.log(res);

    //渲染视图
    total.value = res.data.total
    changeMain(res.data.items)
  }
}

// 接口调用所需图书数据信息
const returnRenewalData = ref({})
// 归还图书接口方法调用
const returnBook = async (row) => {
  returnRenewalData.value[row.borrowInfo.id] = {id:row.borrowInfo.id,status:'归还'}
  let res = await updateBorrowStatusService(returnRenewalData.value[row.borrowInfo.id])
  ElMessage.success(res.message? res.message : '归还成功')
  // 清空归还图书数据信息
  returnRenewalData.value = {}
  // 刷新页面
  getBorrowBookList()
}

// 定义图书续借时间数据信息
const renewalTime = ref({})

// 续借图书接口方法调用
const RenewalBook =  async (row) => {
  returnRenewalData.value[row.borrowInfo.id] = {id:row.borrowInfo.id,status:'续借'}
  let res = await updateBorrowStatusService(returnRenewalData.value[row.borrowInfo.id])
  // 更新图书借书时间（续借接口）
  renewalTime.value[row.borrowInfo.id] = {id:row.borrowInfo.id,borrowTime:10}
  await renewBookService(renewalTime.value[row.borrowInfo.id])
  ElMessage.success(res.message? res.message : '续借成功')
  // fnMap(优化)：添加提示框
  // 清空归还图书数据信息
  returnRenewalData.value = {}
  // 刷新页面
  getBorrowBookList()
}
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <div class="select">
          <div>
            <span>用户名：</span>
            <el-input class="input" v-model="searchData.username" placeholder="请输入用户名" />
            <span>书名：</span>
            <el-input class="input" v-model="searchData.bookName" placeholder="请输入图书名称" />
            <span>作者：</span>
            <el-input class="input" v-model="searchData.author" placeholder="请输入作者名称" />
            <span>图书状态：</span>
            <el-input class="input" v-model="searchData.status" placeholder="请选择图书状态" />
          </div>
          <el-button class="search" type="primary" @click="searchBook()">搜索</el-button>
        </div>
        <!-- <div class="extra">
          <el-button type="primary" @click="title = '新增图书'; dialogVisible = true; clearBookModel()">新增图书</el-button>
        </div> -->
      </div>
    </template>
    <el-table :data="bookData" style="width: 100%">
      <el-table-column label="序号" width="100" type="index" />
      <el-table-column prop="bookDetail.data.bookName" label="图书" />
      <el-table-column prop="bookDetail.data.author" label="作者" />
      <el-table-column prop="bookDetail.data.publishingHouse" label="出版社" />
      <el-table-column prop="bookDetail.data.category" label="分类" />
      <el-table-column prop="userItem.data.username" label="借阅人" />
      <el-table-column prop="borrowInfo.createTime" label="借阅时间" />
      <!-- 归还时间列 -->
      <el-table-column label="归还时间">
        <template #default="scope">
          <span>
            <!-- 如果已归还，显示归还时间，否则显示横杠 -->
            {{ scope.row.borrowInfo.status === '归还' ? scope.row.borrowInfo.updateTime : '------------' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="借阅状态">
        <template #default="scope">
          <el-tag :type="getTagType(scope.row.borrowInfo.status)">{{ scope.row.borrowInfo.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <!-- row 代表当前行的数据,后续在按钮的点击事件中可以用 row 获取当前行的数据 -->
          <el-tooltip class="box-checked-item" effect="dark" content="归还" placement="top">
            <el-button :icon="Finished" circle plain type="primary" @click="returnBook(row)" :disabled="row.borrowInfo.status === '归还'"></el-button>
          </el-tooltip>
          <el-tooltip class="box-edit-item" effect="dark" content="续借" placement="top">
            <el-button :icon="Discount" circle plain type="warning" @click="RenewalBook(row)" :disabled="row.borrowInfo.status === '归还'"></el-button>
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