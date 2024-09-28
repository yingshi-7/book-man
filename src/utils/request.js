//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useTokenStore } from '@/store/token';
import router from '@/router';

//定义一个变量,记录公共的前缀  ,  baseURL
// const baseURL = 'http://localhost:8080';
const baseURL = '/api';
const instance = axios.create({ baseURL })

// 添加请求拦截器
instance.interceptors.request.use(
    confirm => {
        // 在发送请求之前
        const tokenStore = useTokenStore()
        if (tokenStore.token) {
            // 添加token到请求头
            confirm.headers.Authorization = tokenStore.token
        }
        return confirm
    },
    error => {
        //请求错误的回调,将异步的状态转化成失败的状态
        return Promise.reject(error)
    }
)


//添加响应拦截器
instance.interceptors.response.use(
    result => {
        //判断业务状态码
        if (result.data.code === 0) {
            return result.data;
        }
        // 错误处理
        // alert(result.data.msg ? result.data.msg : '服务异常');
        ElMessage.error(result.data.message ? result.data.message : '服务异常')
        //异步的状态转化成失败的状态
        return Promise.reject(result.data);
    },
    err => {
        // 如果响应状态码是401，代表未登录，给出对应的提示，并跳转到登录页
        if (err.response.status === 401) {
            ElMessage.error('请先登录!')
            router.push('/login')
        } else {
            ElMessage.error('服务异常')
        }
        // alert('服务异常');
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;