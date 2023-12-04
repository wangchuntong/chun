<template>
  <div class="app-container">
    <!-- 条件查询 -->
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="员工编码" prop="staffNumber">
        <el-input
          v-model="queryParams.staffNumber"
          placeholder="请输入员工编码"
        />
      </el-form-item>
      <el-form-item label="员工名称" prop="staffName">
        <el-input
          v-model="queryParams.staffName"
          placeholder="请输入员工名称"
        />
      </el-form-item>
      <el-form-item label="员工状态" prop="staffState">
        <el-select
          v-model="queryParams.staffState"
          placeholder="请选择员工状态"
        >
          <el-option
            v-for="dict in dict.type.sys_normal_disable"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="日期查询">
        <el-date-picker
          v-model="queryParams.hh"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>

      <!-- 搜索、重置按钮 -->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button
          icon="el-icon-refresh"
          size="mini"
          @click="resetQuery('queryParams')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 按钮 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          >删除</el-button
        >
      </el-col>
      <!-- 导出 -->
      <el-col :span="1.5">
        <el-button type="primary" plain size="mini" @click="exportExcel"
          >导出</el-button
        >
      </el-col>
      <!-- 导入 -->
      <el-col :span="1.5">
        <el-upload
          class="upload-demo"
          action=""
          :auto-upload="false"
          :file-list="fileListExcel"
          :on-change="handleChangeExcel"
        >
          <el-col :span="1.5">
            <el-button type="primary" plain size="mini">导入</el-button>
          </el-col>
        </el-upload>
      </el-col>
      <!-- 确定导入 -->
      <el-col :span="1.5">
        <el-button type="primary" plain size="mini" @click="importExcel"
          >确定导入</el-button
        >
      </el-col>
    </el-row>

    <!-- 员工查询列表 -->
    <el-table
      v-loading="loading"
      :data="ryStaffList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- 员工头像 -->
      <!-- :src="require(Urll + scope.row.staffUrl)" -->
      <!-- <el-table-column label="员工头像" align="center" prop="staffUrl">
        <template slot-scope="scope">
          <el-image
            :src="getImageUrl(scope.row.staffUrl)"
            style="width: 60px; height: 60px"
          ></el-image>
        </template>
      </el-table-column> -->
      <!-- 文件 -->
      <el-table-column label="导出文件" align="center" prop="staffExcel">
        <template>
          <el-button type="primary" plain size="mini" @click="exportExcel"
            >导出</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="员工编号" align="center" prop="staffNumber" />
      <el-table-column label="员工名称" align="center" prop="staffName" />
      <el-table-column label="员工排序" align="center" prop="staffSort" />
      <el-table-column label="员工状态" align="center" prop="staffState">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.sys_normal_disable"
            :value="scope.row.staffState"
          />
        </template>
      </el-table-column>
      <!-- 创建日期 -->
      <el-table-column
        label="创建日期"
        align="center"
        prop="createTime"
        width="180"
        value-format="yyyy-MM-dd"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!-- <el-form-item
          label="员工头像"
          prop="staffUrl"
          enctype="multipart/form-data"
        >
          <el-upload
            v-model="form.staffUrl"
            action=""
            :auto-upload="false"
            :file-list="fileList"
            list-type="picture-card"
            :on-change="handleChange"
            multiple
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item> -->
        <!-- 导入文件 -->
        <el-form-item
          label="导入文件"
          prop="staffExcel"
          enctype="multipart/form-data"
        >
          <el-upload
            class="upload-demo"
            action=""
            :auto-upload="false"
            :file-list="fileListExcel"
            :on-change="handleChangeExcel01"
          >
            <el-button type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="员工编码" prop="staffNumber">
          <el-input v-model="form.staffNumber" placeholder="请输入员工编码" />
        </el-form-item>
        <el-form-item label="员工名称" prop="staffName">
          <el-input
            v-model="form.staffName"
            placeholder="请输入员工名称"
            id="telephone"
          />
        </el-form-item>
        <el-form-item label="员工顺序" prop="staffSort">
          <el-input-number v-model="form.staffSort" :min="1" size="small" />
        </el-form-item>
        <el-form-item label="员工状态" prop="staffState">
          <el-radio-group v-model="form.staffState">
            <el-radio
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
              >{{ dict.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="staffRemark">
          <el-input
            v-model="form.staffRemark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRyStaffList,
  getRyStaff,
  deleteRyStaff,
  upload,
  importExcel01,
  importExcel02,
  importExcel,
  exportExcel,
} from "@/api/system/ryStaff";

export default {
  // 引入字典管理
  name: "RyStaff",
  dicts: ["sys_normal_disable"],
  data() {
    return {
      fm: new FormData(),
      // 上传头像列表
      fileList: [],
      // 上传文件列表
      fileListExcel: [],
      // dialogImageUrl  可以作为对话框中图片的URL地址，用于显示图片预览或展示图片。
      // dialogVisible  可以作为控制对话框显示和隐藏的开关，通过修改该属性的值来控制对话框的显示状态。
      dialogImageUrl: "",
      dialogVisible: false,

      // 页面加载中（加载后）
      loading: true,
      // 日期范围
      hh: [],
      // 选入的数组（多选框）
      ids: [],
      // 非单个禁用（多选框-修改）
      single: true,
      // 非多个禁用（多选框-删除）
      multiple: true,
      // 总条数
      total: 0,
      // 员工列表数据
      ryStaffList: [],
      // 创建时间
      createTime: null,
      // 弹窗的标题
      title: "",
      // 是否显示弹窗
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        staffNumber: null,
        staffName: null,
        staffState: null,
        hh: [],
        beginTime: null,
        endTime: null,
      },
      //表单参数
      form: {},
      // 表单校验
      rules: {
        staffNumber: [
          {
            required: true,
            message: "员工编号不能为空",
            trigger: "blur",
          },
        ],
        staffName: [
          {
            required: true,
            message: "员工姓名不能为空",
            trigger: "blur",
          },
        ],
        staffState: [
          {
            required: true,
            message: "员工状态不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //头像路径
    getImageUrl(staffUrl) {
      return require(`${"C:/Users/DELL/Desktop/RuoYi-Vue-master/Files/"}${staffUrl}`);
    },
    //上传头像
    handleChange(file) {
      this.fm = new FormData();
      this.fm.append("file", file.raw);
    },
    //上传文件
    handleChangeExcel01(file) {
      this.fm.append("file", file.raw);
    },
    // 查询员工列表
    getList() {
      this.queryParams.beginTime = this.hh[0];
      this.queryParams.endTime = this.hh[1];
      getRyStaffList(this.queryParams).then((response) => {
        this.ryStaffList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 表单清空
    reset() {
      this.form = {
        staffId: null,
        staffUrl: null,
        staffExcel: null,
        staffNumber: null,
        staffName: null,
        staffJob: null,
        staffSort: 0,
        staffState: "0",
        staffRemark: null,
      };
      this.resetForm("form");
    },
    // 搜索按钮
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 重置按钮
    resetQuery() {
      this.queryParams.hh = "";
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.staffNumber);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // 新增按钮
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "新增员工信息";
    },
    // 修改按钮
    handleUpdate(row) {
      this.reset();
      const staffNumber = row.staffNumber || this.ids;
      getRyStaff(staffNumber).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改员工信息";
      });
    },
    // 导入文件
    handleChangeExcel(file) {
      this.fm = new FormData();
      this.fm.append("file", file.raw);
    },
    //导入文件按钮
    importExcel() {
      importExcel(this.fm);
      this.$modal.msgSuccess("Excel导入成功");
      this.getList();
    },
    // 导出文件按钮
    exportExcel() {
      exportExcel(this.form);
      this.$modal.msgSuccess("Excel导出成功");
    },
    submitForm: function () {
      console.log(JSON.stringify(this.fm));
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.staffId != null) {
            // this.fm.append("staffNumber", this.form.staffNumber);
            // this.fm.append("staffName", this.form.staffName);
            // this.fm.append("staffSort", this.form.staffSort);
            // this.fm.append("staffState", this.form.staffState);
            // this.fm.append("staffRemark", this.form.staffRemark);
            // upload(this.fm).then((response) => {
            //   this.$modal.msgSuccess("头像上传成功");
            // });
            // importExcel02(this.fm).then((response) => {
            //   this.$modal.msgSuccess("文件上传成功");
            //   this.open = false;
            //   this.getList();
            // });
            this.open = false;
            this.getList();
          } else {
            this.fm.append("staffNumber", this.form.staffNumber);
            this.fm.append("staffName", this.form.staffName);
            this.fm.append("staffSort", this.form.staffSort);
            this.fm.append("staffState", this.form.staffState);
            this.fm.append("staffRemark", this.form.staffRemark);
            // upload(this.fm).then((response) => {
            //   this.$modal.msgSuccess("头像上传成功");
            // });
            importExcel01(this.fm).then((response) => {
              this.$modal.msgSuccess("文件上传成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 删除按钮
    handleDelete(row) {
      const staffNumbers = row.staffNumber || this.ids;
      this.$modal
        .confirm('是否删除员工编号为"' + staffNumbers + '"的信息？')
        .then(function () {
          return deleteRyStaff(staffNumbers);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
  },
};
</script>
