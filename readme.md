

一个简单的mobx扩展包，提供对mobx数据进行初始化，重置功能。以及改变了toJS的使用方式(A simple mobx extension package that provides initialization and reset functions for mobx data. And changed the way toJS is used)

> 不支持6.x（does not support 6.x）

> English translated by Google Translator

## 安装(install)
npm install mobx-extend

## 使用(how to use)

在mobx类文件中(In the mobx class file)

```javascript
// store.js
import mobxExtend from 'mobx-extend'

// no param
@mobxExtend
class Store{
    @observable test
    @observable sth
}

// with param

/** 
 * 根据typeOf关键字返回值来自定义需要重置的类型默认值，默认为
 * (Customize the default value of the type that 
 * needs to be reset according to the return value of 
 * the typeOf keyword, the default is)：
 * 
 *  bool=false,
    arr=[],
    obj={},
    num=0,
    str='',
    func=function(){
        console.warn(`function ${key} is init now`
        )};
 */
@mobxExtend({
    bool:true,
    str:undefined,
    num:-1,
    arr:[],
    obj:Object.create(null),
    func:()=>{}
})
class Store{
    @observable test
    @observable sth
}

export default new Store()
```

## 初始化mobx数据(Initialize mobx data)

首先，在需要使用的文件中导入之前的mobx类文件(First, import the previous mobx class file in the file that needs to be used)

```javascript
import store from './store.js'
```
初始化mobx数据，可用于组件挂在前/后，随你喜欢(Initialize mobx data, which can be used to hang the component before/after,up to you)

`store.init(initParams)`
- `{Object} initParams` 需要初始化数据的一些字段（Some fields that need to initialize data）

```javascript
stroe.init({
    test:'initTest',
    sth: null
})
```
## 重置mobx（reset mobx）
`store.reset([fields],[exclude])`
- `{Array} fields` 需要重置的mobx keys（Mobx keys that need to be reset）
- `{Boolean} exclude` 为true时，则意味着fields为不需重置的mobx keys（When true, it means that fields are mobx keys that do not need to be reset） 

```javascript
// 重置mobx数据 （reset mobx data）
store.reset()
// 或者只重置部分数据，如（Or only reset part of the data, such as）：test
store.reset(['test'])
// 指定不重置的数据，如（Specify data not to be reset, such as）：test
store.reset(['test'],true)
```

## 将mobx对象转为普通的js对象（Convert mobx objects to ordinary js objects）

这个方法只是为了不用在使用的文件中导入`toJS`而已（This method is just to avoid importing `toJS` in the used file）

`store.toJS([fields])`

- `{Array} fields` 需要转换成js对象的keys(The keys that need to be converted into js objects)

```javascript
store.toJS(['test'])
```