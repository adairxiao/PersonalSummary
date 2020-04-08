const db = require('./db.js');



exports.modelData = (req, res) => {
    let curpage=null;
    if(req.query.page===undefined){
        curpage = 1;
    }else{
        curpage = Number(req.query.page);
    }
    
    
    

    let sql = "select * from meikong_info   ORDER BY id LIMIT ?, ?";
    let datasum = [(curpage - 1) * 100, 100];
    // console.log(datasum);
    let result = null;
    new Promise((resolve) => {
        db.base('select count(*)  as page from meikong_info',data=null,(result) => {
            resolve(result);
        });
    }).then(pageres => {
        let totalPage = Math.round(pageres[0].page/100);
        
        let pageArray = makePage(totalPage,curpage,2);

        db.base(sql, datasum, (result) => {
            // console.log(result);
            
            res.render('index.art', { list: result, pagenum: pageArray,cur:curpage,totalpage:totalPage});
        });
    });

};


const makePage = (total, cur, around) => {
    let result = [];
    let totalPage = around * 2 + 1 + 2 + 2 + 2; //总共元素个数
    let baseCount = around * 2 + 1 + 2 + 2 + 2; //总共元素个数
    let surplus = baseCount - 4; //只出现一个省略号 剩余元素个数
    let startPosition = 1 + 2 + around + 1;//前面出现省略号的临界点
    let endPosition = total - 2 - around - 1;//后面出现省略号的临界点
    
    if(total <= baseCount-2){
        result = Array.from({length:total},(v,i)=>i+1);
    }else{
        if(cur<startPosition){
            result = [...Array.from({length: surplus}, (v, i) => i + 1),"...",total]
            
        }else if(cur>endPosition){
            result=[1,'...',...Array.from({length: surplus},(v, i) => total - surplus + i + 1)]
        }else{
            result = [1,'...',...Array.from({length: around * 2 + 1}, (v, i) => cur - around + i),'...',total]
        }
    }
    return result;
}
