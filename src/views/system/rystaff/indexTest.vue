<template>
  <!-- 测试 -->
  <div>
    <el-button
      type="primary"
      plain
      icon="el-icon-plus"
      size="mini"
      @click="handleExcelTest"
      >导入execel</el-button
    >
    <el-button
      type="primary"
      plain
      icon="el-icon-plus"
      size="mini"
      @click="exportExcelTest"
      >导出execel</el-button
    >
    <el-dialog
      title="导入excel"
      :visible.sync="excelOpenTest"
      width="600px"
      append-to-body
    >
      <div>
        <el-upload
          class="upload-demo"
          action=""
          :on-change="excelChangeTest"
          multiple
          :auto-upload="false"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitExcelTest">确 定</el-button>
        <el-button @click="excelOpenTest = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 用户导入对话框 -->
    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" />
            是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link
            type="primary"
            :underline="false"
            style="font-size: 12px; vertical-align: baseline"
            @click="importTemplate"
            >下载模板</el-link
          >
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {} from "@/api/system/ryStaff";

export default {
  data() {
    return {
      excelOpen: false,
      excelData: new FormData(),
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData",
      },
    };
  },
  methods: {
    handleExcel() {
      this.excelOpen = true;
    },
    submitExcel() {
      excelTo(this.excelData).then((res) => {});
    },
    excelChange(file, fileList) {
      this.excelData.append("file", file.raw);
    },
    exportExcel() {
      exportTo().then((res) => {
        let blob = new Blob([res], {
          type: "application/vnd.ms-excel;charset=UTF-8",
        });
        let objUrl = URL.createObjectURL(blob);
        let fileLink = document.createElement("a");
        fileLink.href = objUrl;
        fileLink.download = "记录.xls";
        fileLink.click();
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/user/export",
        {
          ...this.queryParams,
        },
        `user_${new Date().getTime()}.xlsx`
      );
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download(
        "system/user/importTemplate",
        {},
        `user_template_${new Date().getTime()}.xlsx`
      );
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(
        "<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
          response.msg +
          "</div>",
        "导入结果",
        { dangerouslyUseHTMLString: true }
      );
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
  },
};
</script>
