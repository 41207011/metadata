<template>
  <div>
    <h1>vuex 测试</h1>
    Clicked: {{ getCount }} times
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <div class="source">
      <el-radio-group v-model="sports">
        <el-radio  label="篮球"></el-radio>
        <el-radio  label="足球"></el-radio>
      </el-radio-group>
     <el-button @click="showChoose1">显示</el-button>
    </div>
    <div class="source">
      <el-radio-group v-model="province">
       <el-radio-button label="四川"></el-radio-button>
        <el-radio-button label="重庆"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="安徽"></el-radio-button>
      </el-radio-group>
      <el-button @click="showChoose2">显示</el-button>
    </div>
    <div class="source">
      <el-radio-group v-model="country" >
        <el-radio label="中国" border></el-radio>
        <el-radio label="美国" border></el-radio>
        <el-radio label="英国" border></el-radio>
        <el-radio label="法国" border></el-radio>
      </el-radio-group>
    </div>
    <div class="source">
      <el-date-picker v-model="value1" type="date" placeholder="选择日期">

      </el-date-picker>
    </div>
  </div>

</template>
<style>
  .source{
    margin-top: 20px;
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
      data(){
        return{
            sports:'篮球',
            province:'四川',
            country:'中国',
            value1:'',
        }
      },
    computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount'
      // ...
    ])
    },
    methods: {
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
      'decrement'
    ]),
        showChoose1:function () {
            alert('您选择的运动是:'+this.sports)
        },
        showChoose2:function () {
            alert('您选择的省份是:'+this.province)
        }
      //...mapActions({
      //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
      //})
    }
  }

</script>