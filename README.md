# @crm/EditInput

此组件是基于`antd`的`input`开发的原地编辑组件

## Usage
```
yarn add @crm/EditInput

// 页面使用
import EditInput from '@crm/EditInput';
```
##使用说明
1. 支持当受控组件使用，也支持在antd-form下使用,antd的Input支持的props,理论上都支持,
2. 注意！！！组件value的初始化只在constructor中执行一次，你应当拿到准确的值之后才渲染该组件
3. 由于在子组件中无法拿到父组件中form校验的结果，所以要实现表单校验不通过不让关闭输入框的功能必须要在传入的onConfirm和onCancel中返回promise来决定是否要关闭输入框,详细使用方法见demo

## Props
|props|说明|类型|默认值|
|---|---|---|---|
|value|输入框的值|string||
|onChange|输入框数据发生变化的回调，注意！只在点击确定图标和取消图标时触发|function|undefined|
|onConfirm|点击确定图标时的回调|function(value, prevValue)|undefined|
|onCancel|点击取消图标时的回调|function(prevValue)|undefined|
|onStateChange|切换编辑状态时的回调，默认不用传，如果传了则编辑状态由父组件来控制|function(editable)|() => {}|
|isEdit|编辑状态，和onStateChange成对出现|bool|undefined|
|prefixCls|自定义样式前缀|string|'ant-editInput'|
|isShowToolTip|是否需要ToolTip|bool|false|
|toolTipProps|ToolTip的参数，详见antd-ToolTip|object|{}|
|isShowEditBtn|是否显示编辑按钮|bool|true|

