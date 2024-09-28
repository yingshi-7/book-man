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
import { getBookList } from '@/api/man.js';
const getAllBookList = async () => {
  let res = await getBookList()
  console.log(res);
  bookData.value = res.data
}
getAllBookList()

const searchData = ref({
  bookName: '',
  author: '',
  publishingHouse: '',
  category: ''
})
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
          <el-button type="primary">新增图书</el-button>
        </div>
      </div>
    </template>
    <el-table :data="bookData" style="width: 100%">
      <el-table-column label="序号" width="100" type="index" />
      <el-table-column prop="bookName" label="图书" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="publishingHouse" label="出版社" />
      <el-table-column prop="category" label="分类" />
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