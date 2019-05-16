const mongodb=require("mongodb");
const mongoClient=mongodb.MongoClient;

function _connect(cb){
    // 异步
    mongoClient.connect("mongodb://127.0.0.1:27017",{ useNewUrlParser: true },function(err,client) {
        cb(client.db("graduationProject"));
    });
}
// 获得管理员日志列表
module.exports.getAdminLogList=function(cb){
    _connect(function(db){
        db.collection("adminLog").aggregate([
            {
                // 查找adminLog .以adminLog.adminId为条件去adminList当中查找与adminId相同的_id，将_id与adminId相同的记录提取出来放到adminInfo
                $lookup:{
                    from:"adminList",//你要和哪个表进行关联
                    localField:"adminId",// 要关联的本集合的字段为依据
                    foreignField:"_id",// 外部集合的字段依据
                    as:"adminInfo",//将合并的数据放到指定的字段 当中
                }
            }
        ]).toArray(cb);


    })
}
/*
* 添加一条记录
* coll:指定的集合
* obj:添加的内容
* cb;回调函数用于返回结果*/
module.exports.insertOne=function(coll,obj,cb){
    _connect(function(db){
        db.collection(coll).insertOne(obj,cb);
    })
}
/*
* 获取记录信息
* coll:集合
* obj:条件
*   whereObj：条件
*   sortObj*
* */
module.exports.find=function(coll,obj,cb){
    obj.whereObj=obj.whereObj || {};
    obj.sortObj=obj.sortObj || {};
    obj.skipNum=obj.skipNum || 0;
    obj.limitNum=obj.limitNum || 0;
    _connect(function(db){
        db.collection(coll).find(obj.whereObj).sort(obj.sortObj).skip(obj.skipNum).limit(obj.limitNum).toArray(cb)
    })
}
// 根据ID查找相对应的信息
module.exports.findOneById=function(coll,id,cb){
    _connect(function(db){
        db.collection(coll).findOne({
            _id:mongodb.ObjectId(id)
        },cb)
    })
}
module.exports.findOne=function(coll,whereObj,cb){
    _connect(function(db){
        db.collection(coll).findOne(whereObj,cb)
    })
}


/*根据条件计算文档的数量*/
module.exports.count=function(coll,whereObj,cb){
    _connect(function(db){
        db.collection(coll).countDocuments(whereObj).then(cb)
    })
}
/* 根据ID进行删除 */
module.exports.deleteOneById=function(coll,id,cb){
    _connect(function(db){
        db.collection(coll).deleteOne({
            _id:mongodb.ObjectId(id)
        },cb)
    })
}
/*根据ID来进行修改一条数据*/
module.exports.updateOneById=function(coll,id,upObj,cb){
    _connect(function(db){
        db.collection(coll).updateOne({
            _id:mongodb.ObjectId(id)
        },upObj,cb)
    })
}
