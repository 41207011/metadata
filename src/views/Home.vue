<template>
	<el-row class="container " id= "wrapper">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				<i class="fa fa-globe"></i>  {{collapsed?'':sysName}}
			</el-col>
			<el-col :span="1">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>

				</div>
			</el-col>
			<el-col :span="1" v-if="$route.name==='数据详情'">
				<div class="returnResult" @click="$router.go(-1)">
					<i class="fa fa-chevron-left "></i> 返回结果
				</div>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-col :span="12"><el-dropdown trigger="hover" id="cc">
					<span class="el-dropdown-link userinfo-inner">内部跳转<i class="el-icon-caret-bottom el-icon--right"></i></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="bbb">数据湖</el-dropdown-item>
						<el-dropdown-item @click.native="ccc">BI系统</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown></el-col>
				<el-col :span="12"><el-dropdown trigger="hover" id="bb">
					<span class="el-dropdown-link userinfo-inner"><img src="../../static/image/suge.jpg" />suge</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown></el-col>


			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'" id="collapsed">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo ttest" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed" v-bind:style="testStyle">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item style="" v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden&&child.leaf">{{child.name}}</el-menu-item>
							<template v-for="(child,index) in item.children" v-if="!child.hidden&&!child.leaf">
								<el-submenu :index="child.path" v-if="!child.leaf">
									<template slot="title">{{child.name}}</template>
									<el-menu-item style="" v-for="children in child.children" :index="children.path" :key="children.path">{{children.name}}</el-menu-item>
								</el-submenu>
							</template>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;background:#18309a" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in"  v-if="$route.meta.keepAlive">
							<keep-alive>
								<router-view></router-view>
							</keep-alive>
							<router-view v-if="!$route.meta.keepAlive"></router-view>
						</transition>
						<transition name="fade" mode="out-in"  v-if="!$route.meta.keepAlive">
							<router-view v-if="!$route.meta.keepAlive"></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'DSG数据资产管理',
				collapsed:false,
                testStyle:{
				    width:'100%',
					overflow:'auto'
				},
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
            bbb(){
                window.location.href="http://192.168.23.125:8400"
            },
			ccc(){
                window.location.href="http://192.168.23.40:8440"
			},

			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
				this.testStyle.width = "100%";
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
                this.testStyle.width = "100%";
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}
            this.testStyle.width = "100%";
		}
	}

</script>

<style scoped lang="scss">
	#wrapper{
		width: 100%;
		height: 100vh;
		font-family: "微软雅黑";
		font-size: 14px;
		background-image: url(../../static/image/bg.png);
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		-webkit-background-size: 100% 100%;
	}
	@import '~scss_vars';
	.ttest{
		width:100% !important;
	}

	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 120px;
			line-height: 82px;
			//background: $color-primary;
			color:#18a4da;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 21px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:82px;
				font-size: 20px;
				padding-left:48px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);

				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width: 271px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 82px;
				cursor: pointer;
			}
			.returnResult{
				padding: 0px 23px;
				width:75px;
				height: 60px;
				line-height: 82px;
				cursor: pointer;
			}
			.returnResult:hover{
				text-decoration: none;
				//background-color: #68b8f5;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 14%;
			bottom: 0px;
			overflow: hidden;




			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
					background-color: transparent; //颜色改变

				}

				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				//background: rgba(59, 49, 252, 0.26);
				background:#fff;
				border: 0.8px solid #0c78aa;
				border-radius: 4px;
				margin-top: 1%;
				margin-left: 2%;
				margin-right:1.8%;
				height: 87.5%;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					box-sizing: border-box;
				}
			}
		}
	}
</style>
