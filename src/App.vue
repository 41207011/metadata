<template>
	<div id="app">
		<transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {
	}
}

</script>

<style lang="scss">
body {
	margin: 0px;
	padding: 0px;
	/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
	// background: #1F2D3D;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}
#collapsed{
	background: rgba(59,49,252,0.26);
	border: 0.8px solid #0c78aa;
	border-radius: 4px;
	margin-top: 1%;
	margin-left: 2%;
	height: 93%;
	overflow-y: auto;
	overflow-x: hidden;
	.el-menu{
		background-color:transparent !important;
		.el-menu-item:hover {
			background-color: #18309a;
		}
		.el-menu-item:focus, .el-menu-item:hover {
			outline: 0;
			background-color:  #18309a;
			color: #fff;
		}
		 .is-active{
			color: #fff;
		}
		.el-menu-item i{
			color: #18a4da;
		}
		.el-menu-item, .el-submenu__title {
			color: #18a4da;//颜色改变
		}
	}


	/*
            .el-dropdown-menu__item:focus,.el-dropdown-menu__item:not(.is-disabled):hover{background-color:transparent !important;color:#18a4da}
    */
	.el-submenu{
		background-color: transparent !important;//颜色改变
		.el-menu-item, .el-submenu__title {
			color: #18a4da;//颜色改变
		}
		.el-submenu__title{
			color: #18a4da;
			background: transparent ;
		}
		.el-submenu__title i {
			color: #18a4da;
		}
		.el-submenu__title:hover {
			background-color: #18309a;
			color: #fff;
		}
		.el-submenu__title:focus, .el-submenu__title:hover {
			outline: 0;
			background-color: #18309a ;
			color: #fff;
		}
	}

}
#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}

.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.toolbar {
	background: #f2f2f2;
	//background: rgba(18, 33, 101, 0);
	//color:#fff;
	padding: 10px;

	//border:1px solid #dfe6ec;
	margin: 10px 0px;
	.el-form-item {
		margin-bottom: 10px;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
<script src="../static/dataTool.js"></script>