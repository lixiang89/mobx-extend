import {keys,toJS,action} from 'mobx'

const func=function(options={},target){
    // init mobx data
    target.prototype.init=action('init mobx',function(initParams){
        Object.assign(this,initParams)
    })

    /**
     * reset mobx keys by the keword typeof return value
     * 
     * @param {Array} fields  default mean need reset keys
     * @param {Boolean} exclude if true ,fields means no need to reset 
     */
    target.prototype.reset=action('reset mobx',function(fields=[],exclude=false){
        const {
            bool=false,
            arr=[],
            obj={},
            num=0,
            str='',
            func
        }=options

        keys(this).forEach(key=>{
            const val=toJS(this[key])

            if(Array.isArray(fields)&&fields.length>0){
                const has=fields.includes(key)
                if(!exclude&&!has||exclude&&has){
                    return
                }
            }

            switch (typeof val){
                case 'object':
                    this[key]=Array.isArray(val)?arr:obj;
                    break;
                case 'boolean':
                    this[key]=bool;
                    break;
                case 'string':
                    this[key]=str;
                    break;
                case 'number':
                    this[key]=num;
                    break;
                case 'function':
                    this[key]=func||function(){console.warn(`function ${key} is init now`)};
                    break;
                default:
                    this[key]=undefined;
                    break;

            }
        })
    })

    /**
     * 
     * @param {Array} fields the mobx keys to js
     */
    target.prototype.toJS=function(fields=[]){
        let res={}
        if(Array.isArray(fields)&&fields.length>0){
            for (const item of fields) {
                res[item]=toJS(this[item])
            }
        }else{
            res=toJS(this)
        }
        return res
    }
}

export default function(options){
    if(typeof options==='function'){
        func({},options)
    }else{
        return func.bind(this,options)
    }
}