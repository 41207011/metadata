import axios from 'axios';
import qs from 'qs';

var instance = axios.create({
    headers: {'content-type': 'application/json'}
});
var instance2 = axios.create({
    headers: {'Content-Type':'application/x-www-form-urlencoded'}
});
let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const login = params =>{return axios.get(``,{params:params})};

//基础搜索
export const seachUsingBasic = params =>{return instance.post(`/api/search/basic`,JSON.stringify(params))};
//
export const typedefs = params =>{return instance.get(`/api/types/typedefs`,{params:params})};
//删除标签
export const deleteTag = params =>{return instance.delete(`/api/entity/guid/${params.guid}/classification/${params.tagName}`)};
//添加标签
export const addTag = params =>{return instance.post(`/api/entity/bulk/classification`,JSON.stringify(params))};
//术语参数剥离
export const spliceTerm = params =>{
    let arr =  [];
    for(let key in params){
        if(params[key].guid==='350cdd29-6b90-4dbe-94f0-e45d2605701c'){
            params.splice(key,1)
            return params
        }
        else{
            arr.push(params[key])
        }
    }
    return arr
}
export const spliceTerm2 = params =>{
    let data =[]
    for(let key in params){
        if(params[key].guid==='350cdd29-6b90-4dbe-94f0-e45d2605701c'){
            data.push(params[key])
            return data
        }
    }
    return data
}
//获取术语列表
export const getTerm = params =>{return instance.get(`/api/glossary`,{params:params})};
//将给定的术语分配给提供的实体标题列表
export const addTerm = params =>{return instance.post(`/api/glossary/terms/${params.pguid}/assignedEntities`,params.guid)};
//删除给定实体的指定术语
export const deleteTerm = params =>{return instance.delete(`/api/glossary/terms/${params.termid}/assignedEntities`,{data:JSON.stringify(params.guid)})};


//获取首页展示右方滚动表格数据
export const getMainTable = params =>{return instance.get(`/api/entity/update/all`,{params:params})};
//获取首页左方柱状图数据
export const getMainChart = params =>{return instance.get(`/api/entity/update/quantityStatistics`,{params:params})};


//数据详情页面获取实体信息
export const getEntityDetails = params =>{return instance.get(`/api/entity/guid/${params}`)};
//数据详情页面获取审计信息
export const getAuditDetails = params =>{return instance.get(`/api/entity/${params.guid}/audit?count=${params.count}`)};
//数据详情页面获取血统信息
export const lineage = params =>{return instance.get(`/api/lineage/${params}`)};
//数据详情页面编辑标签
export const editTag = params =>{return instance.put(`/api/entity/guid/${params.entityGuid}/classifications`,JSON.stringify([params.main]))};


//标签管理页面添加属性接口
export const addAttributes = params =>{return instance.put(`/api/types/typedefs?type=classification`,JSON.stringify(params))};
//创建一个新的标签
export const createTag = params =>{return instance.post(`/api/types/typedefs?type=classification`,JSON.stringify(params))};
//删除标签
export const DeleteTag = params =>{return instance.delete(`/api/types/typedefs?type=classification`,{data:JSON.stringify(params)})};


//业务管理页面某一个业务详情获取
export const getTermDetails = params =>{return instance.get(`/api/glossary/term/${params}`)};
//术语分类
export const putTerm = params =>{return instance.put(`/api/glossary/term/${params.guid}`,JSON.stringify(params))};
//为glossary创建项目
export const postTerm = params =>{return instance.post(`/api/glossary/term`,JSON.stringify(params))};
//为glossary删除项目
export const deleteTerm_ = params =>{return instance.delete(`/api/glossary/term/${params}`)};
//业务页面术语树状图关系获取
export const getRelation = params =>{return instance.get(`/api/glossary/category/${params}/related`)};
//glossay修改
export const putGlossary = params =>{return instance.put(`/api/glossary/${params.guid}`,JSON.stringify(params))};
//glossay创建
export const createGlossary = params =>{return instance.post(`/api/glossary`,JSON.stringify(params))};
//glossay删除
export const deleteGlossary = params =>{return instance.delete(`/api/glossary/${params}`)};
//创建类别/glossary/category
export const creatCategory = params =>{return instance.post(`/api/glossary/category`,JSON.stringify(params))};
//获取category详细信息
export const getCategory = params =>{return instance.get(`/api/glossary/category/${params}`)};
//修改category信息
export const putCategory = params =>{return instance.put(`/api/glossary/category/${params.guid}`,JSON.stringify(params))};
//删除category
export const deleteCategory = params =>{return instance.delete(`/api/glossary/category/${params}`)};



//demo数据资产地图
export const demo = params =>{return instance.get(`/api/glossary/getDataAssetsMap/${params}`)};

//标准维护中创建新的实体
export const createEntity = params =>{return instance.post(`/api/entity/create/entity/${params.id}`,JSON.stringify(params.content))};

//获取消息通讯配置信息
export const getPz = params => {return instance.get(`/api/entity/selectConfigurationEntity?limit=${params.limit}&offset=${params.offset}&type=${params.type}`)}
//获取数据配置
export const getPz2 = params => {return instance.get(`/api/entity/selectConfigurationEntity?limit=${params.limit}&offset=${params.offset}`)}
//修改配置
export const changePz = params => {return instance.post(`/api/entity/updateConfigurationEntity`,JSON.stringify(params))}


//新的标准
export const getTree = params => {return instance.get(`/api/standardMenu/getTree`)}

/*
export const getSTable = params => {return instance.get(`/api/standardTable/list?limit=${params.limit}&offset=${params.offset}&standardNameId=${params.standardNameId}`)}
*/

export const getSTable = params => {return instance.get(`/api/standardMenu/getStandard?standard_name_id=${params.standardNameId}&limit=${params.limit}&offset=${params.offset}`)}

export const saveOrUpdate = params => {return instance.post(`/api/standardMenu/saveorupdate?parentId=${params.parentId}&standardName=${params.standardName}`,JSON.stringify(params))}

export const OrUpdate = params => {return instance.post(`/api/standardMenu/saveorupdate?parentId=${params.parentId}&standardName=${params.standardName}&id=${params.id}`,JSON.stringify(params))}

export const remove = params => {return instance.post(`/api/standardMenu/remove?id=${params.id}`,JSON.stringify(params))}

export const saveOrUpdate2 = params => {return instance2.post(`/api/standardTable/saveorupdate`,qs.stringify(params))}

export const remove2 = params => {return instance2.post(`/api/standardTable/remove`,qs.stringify(params))}
//standardColumns/saveorupdate
export const saveorupdate = params => {return instance2.post(`/api/standardColumns/saveorupdate`,qs.stringify(params))}

export const remove3 = params => {return instance2.post(`/api/standardColumns/remove`,qs.stringify(params))}

//数据字典

export const SelectDateDictionaryType = params => {return instance2.get(`/api/dateDictionary/SelectDateDictionaryType`)}

export const AddOrUpdateDateDictionaryType = params => {return instance2.post(`/api/dateDictionary/AddOrUpdateDateDictionaryType`,qs.stringify(params))}

export const DeleteDateDictionaryType = params => {return instance2.post(`/api/dateDictionary/DeleteDateDictionaryType`,qs.stringify(params))}

export const selectDateDictionaryDetails = params => {return instance.get(`/api/dateDictionary/selectDateDictionaryDetails`,{params:params})}

export const AddOrUpdateDateDictionaryDetails = params => {return instance2.post(`/api/dateDictionary/AddOrUpdateDateDictionaryDetails`,qs.stringify(params))}

export const DeleteDateDictionaryDetails = params => {return instance2.post(`/api/dateDictionary/DeleteDateDictionaryDetails`,qs.stringify(params))}

//编码标准
export const codingRuleList = params => {return instance.get(`/api/codingRule/list`,{params:params})}

export const codingRuleSaveOrUpdate = params => {return instance2.post(`/api/codingRule/saveOrUpdate`,qs.stringify(params))}

export const codingRuleRemove = params => {return instance2.post(`/api/codingRule/remove`,qs.stringify(params))}

//数据源管理
export const datasourceList = params => {return instance.get(`/api/datasource/list`,{params:params})}

export const datasourceSaveorupdate = params => {return instance2.post(`/api/datasource/saveOrUpdate`,qs.stringify(params))}

export const datasourceRemove = params => {return instance2.post(`/api/datasource/remove`,qs.stringify(params))}


