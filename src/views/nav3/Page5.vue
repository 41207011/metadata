<template>
	<div>
		<h1>vueTest</h1>
		{{times}}
		<el-button @click="addTimes">+</el-button>
		<el-button @click="reduceTimes">-</el-button>
		<h1>mock(1-10)随机数:{{mockNumber}}</h1>
	</div>
</template>
<script>
	import Mock from 'mockjs'
	export default {
	    data(){
	        return Mock.mock({
                'times|1-10':1,
				'mockNumber|1-10':1}
				)


		},
		methods:{
            addTimes:function () {
                this.times +=1
            },
            reduceTimes:function () {
                this.times -=1
            }
		}

	}
</script>