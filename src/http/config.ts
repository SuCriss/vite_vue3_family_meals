interface UrlDict {
    [key:string]:{
        [key:string]:string
    };
}

const urlDict:UrlDict = {
    Basic:{
        getDemo:'/api/captcha/verify'
    }
}

const getUrl = (biz:string,UrlName:string):string =>{
    try{
        const bizKeys = Object.keys(urlDict);
        if(bizKeys.indexOf(biz)<0){
            throw new Error('biz not in Dict')
        }
        let hostName = urlDict[biz][UrlName];
        if(!hostName){
            throw new Error('url not in Dict')
        }
        if(hostName.substr(0,1)==='/'){
            hostName = hostName.substr(1);
        }
        return hostName
    }catch(err){
        console.error('err', err)
        return ''
    }
};
export default getUrl;