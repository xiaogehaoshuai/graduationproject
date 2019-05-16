const express=require("express");
const db=require("./modules/db");
const bodyParser=require("body-parser");
const common=require("./modules/common");
const eleEnum=require("./modules/eleEnum")
const md5 =require("md5");
const app=express();
app.use(bodyParser.json());

app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type");
    next();
})

app.post("/register",function(req,res){
    db.insertOne('user',{pass:req.body.pass,
        name:req.body.name,
    },function(err,data){
        res.json({
            code:1,
            msg:"成功"
        })
    })
})
app.post("/login",function(req,res){
    db.findOne('user',{pass:req.body.pass,name:req.body.name
    },function(err,data){
        if(err){
            res.json({
                code:0,
                msg: err,
            })
        }else{
            res.json({
                code:1,
                data,
                msg:"成功"
            })
        }

    })
})
//建表插入
app.post("/addUseList",function(req,res){
    db.insertOne('useList',{id:req.body.id,
        name:req.body.name,
        address:req.body.address,
        shopName:req.body.shopName,
        shopId:req.body.shopId
    },function(err,data){
        res.json({
            code:1,
            msg:"成功"
        })
    })
})
app.post("/addShopList",function(req,res){
    db.insertOne('shopList',{id:req.body.id,
        name:req.body.name,
        shopName:req.body.shopName,
        shopId:req.body.shopId
    },function(err,data){
        res.json({
            code:1,
            msg:"成功"
        })
    })
})
app.post("/addOrderList",function(req,res){
    db.insertOne('orderList',{id:req.body.id,
        shopName:req.body.shopName,
        price:req.body.price,
        shopName:req.body.shopName,
        isSell:req.body.isSell
    },function(err,data){
        res.json({
            code:1,
            msg:"成功"
        })
    })
})
app.post("/addStockList",function(req,res){
    db.findOne('user',{id:req.body.id,shopId:req.body.shopId},function(err,data){
        if(data){
            db.updateOneById('stockList',req.body.id,{shopSum:data.shopSum+1, shopNum:data.shopNum+1,},function(err,data){
                res.json({
                    code:1,
                    msg:"成功"
                })
            })
        }else {
            db.insertOne('stockList',{id:req.body.id,
                shopName:req.body.shopName,
                shopSum:req.body.shopSum,
                shopNum:req.body.shopNum,
                shopId:req.body.shopId
            },function(err,data){
                res.json({
                    code:1,
                    msg:"成功"
                })
            })
    }
})
})
//查表
app.get("/showUseList",function(req,res){
    db.find('useList',{},function(err,data){
        res.json({
            code:1,
            data,
            msg:"成功"
        })
    })
})
app.get("/showShopList",function(req,res){
    db.find('shopList',{},function(err,data){
        res.json({
            code:1,
            data,
            msg:"成功"
        })
    })
})
app.get("/showOrderList",function(req,res){
    db.find('orderList',{},function(err,data){
        res.json({
            code:1,
            data,
            msg:"成功"
        })
    })
})
app.get("/showStockList",function(req,res){
    db.find('stockList',{},function(err,data){
        res.json({
            code:1,
            data,
            msg:"成功"
        })
    })
})
//修改
app.get("/updateUseList",function(req,res){
    db.updateOneById('useList',req.body.id,{
        Name:req.body.Name,
        address:req.body.address,
        shopName:req.body.shopName,
        shopId:req.body.shopId
    },function(err,data){
        res.json({
            code:1,
            data,
            msg:"成功"
        })
    })
})
app.get("/updateShopList",function(req,res){
    db.updateOneById('shopList','',{
        Name:'',
        ShopName:'',
        ShopId:''},function(err,data){
        res.json({
            code:1,
            data,
            msg:"成功"
        })
    })
})
app.get("/updateOrderList",function(req,res){
    db.updateOneById('orderList',{},function(err,data){
        res.json({
            code:1,
            data,
            msg:"成功"
        })
    })
})
app.get("/updateStockList",function(req,res){
    db.updateOneById('stockList',{},function(err,data){
        res.json({
            code:1,
            data,
            msg:"成功"
        })
    })
})
//删除
app.get("/deleteUseList",function(req,res){
    db.deleteOneById('useList',req.body.id,function(err,data){
        res.json({
            code:1,
            msg:"成功"
        })
    })
})
app.get("/deleteShopList",function(req,res){
    db.deleteOneById('shopList',req.body.id,function(err,data){
        res.json({
            code:1,
            msg:"成功"
        })
    })
})
app.get("/deleteOrderList",function(req,res){
    db.deleteOneById('orderList',req.body.id,function(err,data){
        res.json({
            code:1,
            msg:"成功"
        })
    })
})
app.get("/deleteStockList",function(req,res){
    db.deleteOneById('stockList',req.body.id,function(err,data){
        res.json({
            code:1,
            msg:"成功"
        })
    })
})

app.listen(80,function(){
    console.log("success");
})
