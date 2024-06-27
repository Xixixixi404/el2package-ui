<!--
 * @Author: yangyu 1431330771@qq.com
 * @Date: 2023-09-28 10:17:44
 * @LastEditors: yangyu 1431330771@qq.com
 * @LastEditTime: 2024-02-01 10:11:43
 * @FilePath: \jnf-ui-master\packages\JnFileUpload\src\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="upload-file">
    <el-upload
      multiple
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      class="upload-file-uploader"
      ref="fileUpload"
      v-bind="$attrs"
    >
      <!-- :headers="headers" -->
      <!-- 上传按钮 -->
      <el-button
        v-if="!props.disabled"
        type="primary"
        icon="upload"
        size="small"
        >{{ props.btnName }}</el-button
      >
    </el-upload>
    <!-- 上传提示 -->
    <div class="el-upload__tip" v-if="showTip && !props.disabled">
      请上传
      <template v-if="fileSize">
        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
      </template>
      <template v-if="fileType">
        格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b>
      </template>
      的文件
    </div>

    <jn-table
      :tableData="fileList"
      :columns="props.fileColumns"
      scrollbar-always-on
      stripe
      border
      ref="JnFileUploadTableRef"
      :show-pagination="false"
    >
      <template #handler="{ scope }">
        <!-- <template #default="scope"> -->
        <el-space alignment="start" :size="20">
          <jn-button
            link
            @click="downloadFile(scope.row.fileUrl, scope.row.filename)"
            type="primary"
            >下载</jn-button
          >
          <jn-button link @click="handlePreview(scope.row)" type="primary"
            >预览</jn-button
          >
          <jn-button
            v-if="!props.disabled"
            link
            @click="handleDelete(scope.$index, scope)"
            type="danger"
            >删除</jn-button
          >
        </el-space>
        <!-- </template> -->
      </template>
    </jn-table>
    <!-- <el-table :data="fileList" style="width: 100%">
      <el-table-column prop="filename" label="文档名称" min-width="180" />
      <el-table-column prop="fileSize" label="大小" />
      <el-table-column prop="uploadBy" label="上传人" />
      <el-table-column prop="uploadTime" label="上传日期" />
      <el-table-column
        prop="address"
        label="操作"
        align="center"
        min-width="120"
      >
        <template #default="scope">
          <el-space alignment="start" :size="20">
            <jn-button
              link
              @click="downloadFile(scope.row.fileUrl, scope.row.filename)"
              type="primary"
              >下载</jn-button
            >
            <jn-button link @click="handlePreview(scope.row)" type="primary"
              >预览</jn-button
            >
            <jn-button
              v-if="!props.disabled"
              link
              @click="handleDelete(scope.$index, scope)"
              type="danger"
              >删除</jn-button
            >
          </el-space>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
  <Preview ref="PreviewRef" />
</template>

<script lang="ts" setup>
import { defineProps, computed, defineEmits, reactive, watch, ref } from 'vue'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import Preview from './Preview.vue'
// import { getToken } from "@/utils/auth";
// import { preview } from "@/api/file.ts";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  // 数量限制
  limit: {
    type: Number,
    default: 5,
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 5,
  },
  // 文件类型, 例如['png', 'jpg', 'jpeg']
  fileType: {
    type: Array,
    default: () => ['doc', 'xls', 'ppt', 'txt', 'pdf'],
  },
  // 是否显示提示
  isShowTip: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: true,
  },
  btnName: {
    type: String,
    default: '上传附件',
  },
  fileColumns: {
    type: Array,
    default: () => [
      {
        prop: 'filename',
        label: '文档名称',
        // fit: true,
        minWidth: 120,
      },
      {
        prop: 'fileSize',
        label: '大小',
      },
      {
        prop: 'uploadBy',
        label: '上传人',
      },
      {
        prop: 'uploadTime',
        label: '上传日期',
      },
      {
        prop: 'handler',
        slotName: 'handler',
        label: '操作',
        align: 'center',
        showOverflowTooltip: true,
        fixed: 'right',
        minWidth: 120,
      },
    ],
  },
})
const fileUpload = ref()
const PreviewRef = ref()
// const { proxy } = getCurrentInstance()
const emit = defineEmits(['update:modelValue', 'callBack'])
const number = ref(0)
const uploadList = ref(<any>[])
const uploadFileUrl = ref(
  import.meta.env.VITE_APP_BASE_API + '/jnf-file/actions/single-upload/'
) // 上传文件服务器地址
// const headers = ref({ Authorization: "Bearer " + getToken() });
const fileList = ref(<any>[])
const showTip = computed(
  () => props.isShowTip && (props.fileType || props.fileSize)
)

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      let temp = 1
      // 首先将值转为数组
      // const list = val
      // Array.isArray(val) ? val : props.modelValue.split(',')
      // 然后将数组转为对象数组
      fileList.value = val.map((item: any) => {
        // if (typeof item === "string") {
        //   item = { name: item, url: item };
        // }
        item.uid = item.uid || new Date().getTime() + temp++
        return item
      })
    } else {
      fileList.value = []
      return []
    }
  },
  { deep: true, immediate: true }
)
let loadingInstance
// 打开遮罩层
function loading(content) {
  loadingInstance = ElLoading.service({
    lock: true,
    text: content,
    background: 'rgba(0, 0, 0, 0.7)',
  })
}
// 关闭遮罩层
function closeLoading() {
  loadingInstance.close()
}
// 上传前校检格式和大小
function handleBeforeUpload(file) {
  // 校检文件类型
  if (props.fileType.length) {
    const fileName = file.name.split('.')
    const fileExt = fileName[fileName.length - 1]
    const isTypeOk = props.fileType.indexOf(fileExt) >= 0
    if (!isTypeOk) {
      ElMessage.error(
        `文件格式不正确, 请上传${props.fileType.join('/')}格式文件!`
      )
      return false
    }
  }
  // 校检文件大小
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize
    if (!isLt) {
      ElMessage.error(`上传文件大小不能超过 ${props.fileSize} MB!`)
      return false
    }
  }
  loading('正在上传文件，请稍候...')
  number.value++
  return true
}

// 文件个数超出
function handleExceed() {
  ElMessage.error(`上传文件数量不能超过 ${props.limit} 个!`)
}

// 上传失败
function handleUploadError(err) {
  ElMessage.error(`上传文件失败`)
}

// 上传成功回调
function handleUploadSuccess(res, file) {
  if (res.code === 200) {
    uploadList.value.push(res.data)
    uploadedSuccessfully()
  } else {
    number.value--
    closeLoading()
    ElMessage.error(res.msg)
    fileUpload.value.handleRemove(file)
    uploadedSuccessfully()
  }
}
/** 根据访问地址下载 */
function downloadFile(url, fileName) {
  const link = document.createElement('a')
  // 这里是将链接地址url转成blob地址，
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      link.href = URL.createObjectURL(blob)
      // 下载文件的名称及文件类型后缀
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      //在资源下载完成后 清除 占用的缓存资源
      window.URL.revokeObjectURL(link.href)
      document.body.removeChild(link)
    })
}
/** 预览 */
function handlePreview(row) {
  console.log(row, 'row')
  const fileType = row.fileUrl?.split('.')?.at(-1)
  if (['pdf', 'xls', 'xlsx', 'doc', 'docx'].includes(fileType)) {
    PreviewRef.value.open(row.fileUrl, '预览')
  } else {
    window.open(row.fileUrl, '_blank')
  }
  // preview({ uri: row.uri }).then((res) => {});
}
// 删除文件
function handleDelete(index, scope) {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    appendTo: 'body',
  })
    .then(async () => {
      emit('callBack', scope.row)
      fileList.value.splice(index, 1)
      emit('update:modelValue', fileList.value)
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

// 上传结束处理
function uploadedSuccessfully() {
  const list = uploadList.value.map((i) => {
    return { ...i, fileUrl: i.uri }
  })
  if (number.value > 0 && uploadList.value.length === number.value) {
    fileList.value = fileList.value.concat(list)
    // .filter((f) => f.url !== undefined)
    uploadList.value = []
    number.value = 0
    // emit("update:modelValue", listToString(fileList.value));
    emit('update:modelValue', fileList.value)
    closeLoading()
  }
}

// 获取文件名称
function getFileName(name) {
  if (name.lastIndexOf('/') > -1) {
    return name.slice(name.lastIndexOf('/') + 1)
  } else {
    return ''
  }
}

// 对象转成指定字符串分隔
function listToString(list, separator) {
  let strs = ''
  separator = separator || ','
  for (let i in list) {
    if (list[i].url) {
      strs += list[i].url + separator
    }
  }
  return strs != '' ? strs.substr(0, strs.length - 1) : ''
}
</script>

<style scoped lang="scss">
.upload-file {
  width: 100%;
}
.upload-file-uploader {
  display: inline-block;
  margin-bottom: 5px;
}
.el-upload__tip {
  margin-left: 10px;
  display: inline-block;
  margin-top: 0px;
}
.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}
.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}
.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}

</style>

<style>
.is-message-box {
  /* position: relative; */
  z-index: 10000 !important;
}</style>