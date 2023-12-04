<template>
  <div class="app-container">
    <!-- 条件查询 -->
    <el-form size="small" :inline="true">
      <el-form-item label="用户姓名">
        <el-input v-model="queryParams.name" placeholder="请输入用户姓名" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="queryParams.tel" placeholder="请输入联系方式" />
      </el-form-item>
      <!-- 搜索按钮 -->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
      </el-form-item>
      <!-- 多选框显隐 -->
      <el-dropdown class="el-dropdown01">
        <span class="el-dropdown-link">
          显示隐藏<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu>
          <div class="checkbox01">
            <input type="checkbox" v-model="showId" />用户ID
            <input type="checkbox" v-model="showName" />用户姓名
            <input type="checkbox" v-model="showSex" />用户性别
            <input type="checkbox" v-model="showTel" />联系方式
            <input type="checkbox" v-model="showMonth" />月份
          </div>
        </el-dropdown-menu>
      </el-dropdown>
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
      <!-- 修改 -->
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
      <!-- 删除 -->
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
      <!-- 切换语言 -->
      <el-dropdown
        trigger="click"
        class="international"
        @command="handleSetLanguage"
      >
        <div class="languages"><i class="el-icon-s-tools" />切换语言</div>
        <!-- slot="dropdown" -->
        <el-dropdown-menu>
          <el-dropdown-item command="ch"> 中文 </el-dropdown-item>
          <el-dropdown-item command="en"> English </el-dropdown-item>
          <el-dropdown-item command="ja"> Japanese </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
    <!-- 查询列表 -->
    <el-table
      v-loading="loading"
      :data="ryTestList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        :label="$t('id')"
        align="center"
        prop="id"
        v-if="showId"
      />
      <el-table-column
        :label="$t('name')"
        align="center"
        prop="name"
        v-if="showName"
      />
      <el-table-column
        :label="$t('sex')"
        align="center"
        prop="sex"
        v-if="showSex"
      />
      <el-table-column
        :label="$t('tel')"
        align="center"
        prop="tel"
        v-if="showTel"
      />
      <el-table-column
        :label="$t('month')"
        align="center"
        prop="month"
        v-if="showMonth"
      />
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
    <!-- 弹窗 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item label="用户姓名">
          <el-input v-model="form.name" placeholder="请输入用户姓名" />
        </el-form-item>
        <el-form-item label="用户性别">
          <el-input v-model="form.sex" placeholder="请输入用户性别" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input
            v-model="form.tel"
            placeholder="请输入联系方式"
            id="telephone"
          />
        </el-form-item>
        <el-form-item label="月份">
          <el-input v-model="form.month" placeholder="请输入月份" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <br /><br />
    <div id="main" class="main_container"></div>
  </div>
</template>
<script>
import {
  getRyTestList,
  getRyTestById,
  getRyTestByMonth,
  insertRyTest,
  updateRyTest,
  deleteRyTests,
} from "@/api/system/ryTest";

export default {
  name: "Echarts",
  data() {
    return {
      //柱状图
      query: [],
      //i18n
      language: localStorage.getItem("lang"),
      //多选框显示
      showId: true,
      showName: true,
      showSex: true,
      showTel: true,
      showMonth: true,
      //加载
      loading: true,
      //选入的数组
      ids: [],
      // 非单个禁用（多选框-修改）
      single: true,
      // 非多个禁用（多选框-删除）
      multiple: true,
      //查询条件
      queryParams: {
        name: null,
        tel: null,
      },
      //查询列表
      ryTestList: [],
      //弹窗标题
      title: "",
      //是否显示弹窗
      open: false,
      //表单参数
      form: {},
      error: false,
    };
  },
  created() {
    this.getList();
    this.init();
  },
  methods: {
    //柱状图
    init() {
      getRyTestByMonth().then((response) => {
        this.query = response.rows;
        this.initCharts();
      });
    },
    initCharts() {
      // 初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        title: {
          text: "用户数量统计",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.query.map((item) => item.month),
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "counts",
            barWidth: "40%",
            data: this.query.map((item) => item.count),
            type: "bar",
          },
        ],
      };
      myChart.setOption(option);
    },
    //i18n刷新页面保持不变
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.language = lang;
    },
    //查询列表
    getList() {
      this.loading = true;
      getRyTestList(this.queryParams).then((response) => {
        this.ryTestList = response.rows;
        this.loading = false;
      });
      this.init();
    },
    //搜索
    handleQuery() {
      this.getList();
    },
    //表单清空
    reset() {
      this.form = {
        id: null,
        name: null,
        sex: null,
        tel: null,
        month: null,
      };
    },
    // 多选框
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    //新增
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "新增用户信息";
    },
    //修改
    handleUpdate(row) {
      // console.log("===>>"+ JSON.stringify(row));
      this.reset();
      const id = row.id || this.ids;
      getRyTestById(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户信息";
      });
    },
    //删除
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否删除员工ID为"' + ids + '"的信息？')
        .then(function () {
          return deleteRyTests(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    //确定按钮
    submitForm() {
      let telephone = document.getElementById("telephone");
      if (
        telephone.value.length != 11 ||
        telephone.value == "" ||
        isNaN(telephone.value)
      ) {
        this.$message({
          showClose: true,
          message: "联系方式应为长度11的数字，请重新输入",
          type: "error",
        });
        this.error = true;
        return;
      }
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateRyTest(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            insertRyTest(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    //取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dropdown01 {
  padding: 4.5px 10px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.checkbox01 {
  padding: 5px 15px;
  color: #5e6d82;
}
.languages {
  padding: 4.5px 12px;
}
.main_container {
  width: 100%;
  height: 400px;
  overflow: hidden;
}
</style>
