/**
 * @Author: XuWenKang
 * @Description: 原地编辑组件
 * @Date: 2019-07-30 10:57:12
 * @Last Modified by: XuWenKang
 * @Last Modified time: 2019-08-08 11:16:32
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import omit from 'lodash/omit';
import ConfirmIcon from './svg/confirm.svg';
import CancelIcon from './svg/cancel.svg';
import EditIcon from './svg/edit.svg';
import InputWrapper from './InputWrapper';
import { CLASS_PREFIX } from './config';

// 检查props里是否有传isEdit
const checkHasIsEdit = (prop) => 'isEdit' in prop && typeof prop.isEdit !== 'undefined';

// 检查props里是否有传onChange
const checkHasOnChange = (prop) => 'onChange' in prop && typeof prop.onChange !== 'undefined';

// 检查props里是否有传onConfirm
const checkHasOnConfirm = (prop) => 'onConfirm' in prop && typeof prop.onConfirm !== 'undefined';

// 检查props里是否有传onCancel
const checkHasOnCancel = (prop) => 'onCancel' in prop && typeof prop.onCancel !== 'undefined';

// props透传进Input组件时需要排除的prop属性
const PROPS_ARRAY = [
  'onChange',
  'onConfirm',
  'onCancel',
  'onStateChange',
  'isEdit',
  'value',
  'className',
  'isShowToolTip',
  'toolTipProps',
  'prefixCls',
  'isShowEditBtn',
];

export default class EditInput extends PureComponent {
  static propTypes = {
    onChange: PropTypes.any,
    // 点击确认按钮时的回调，考虑到可能会有点击按钮异步校验数据的情况，所以必须要返回一个promise对象
    onConfirm: PropTypes.any,
    // 点击取消按钮时的回调，考虑到可能会有点击按钮时一些异步操作，比如点击取消按钮时弹确认框，所以必须要返回一个promise对象
    onCancel: PropTypes.any,
    // 编辑状态切换的回调，和isEdit一起传进来的时候就由父组件来控制是否打开编辑
    onStateChange: PropTypes.func,
    isEdit: PropTypes.oneOf([undefined, false, true]),
    prefixCls: PropTypes.string,
    // 是否需要toolTip
    isShowToolTip: PropTypes.bool,
    toolTipProps: PropTypes.object,
    // 是否显示编辑按钮
    isShowEditBtn: PropTypes.bool,
  };

  static defaultProps = {
    onChange: undefined,
    onConfirm: undefined,
    onCancel: undefined,
    onStateChange: () => {},
    isEdit: undefined,
    prefixCls: CLASS_PREFIX,
    isShowToolTip: false,
    toolTipProps: {},
    isShowEditBtn: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // 判断props是否传了isEdit,如果传了就由props来控制
    if (nextProps.isEdit !== prevState.isEdit && checkHasIsEdit(nextProps)) {
      return {
        isEdit: nextProps.isEdit,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const isEdit = checkHasIsEdit(props) ? props.isEdit : false;
    // 此处value没有放到propsType里，是因为在form下使用时如果默认props有value字段，form会报wraning
    const { value } = props; // eslint-disable-line
    this.prevValue = value;
    this.state = {
      isEdit,
      value,
    };
  }

  handleConfirm = () => {
    const { value } = this.state;
    const { onChange, onConfirm } = this.props;
    if (checkHasOnChange(this.props)) {
      onChange(value);
    }
    if (checkHasOnConfirm(this.props)) {
      onConfirm(value, this.prevValue).then(() => {
        // 如果有传入confirm则在confirm的回调中保存值
        this.setState({
          value,
        });
        this.prevValue = value;
        this.handleEditClick(false);
      });
      return;
    }
    this.handleEditClick(false);
    // 没有onConfirm则直接保存
    this.prevValue = value;
    this.setState({
      value,
    });
  };

  handleCancel = () => {
    const { onChange, onCancel } = this.props;
    if (checkHasOnChange(this.props)) {
      onChange(this.prevValue);
    }
    if (checkHasOnCancel(this.props)) {
      onCancel(this.prevValue).then(() => {
        this.handleEditClick(false);
        this.setState({
          value: this.prevValue,
        });
      });
    } else {
      this.handleEditClick(false);
      this.setState({
        value: this.prevValue,
      });
    }
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  /**
   *
   *
   * @params flag 是否关闭编辑框
   */
  handleEditClick = (flag) => {
    const { onStateChange } = this.props;
    // 如果props里有isEdit字段，则编辑状态由props控制
    if (checkHasIsEdit(this.props)) {
      onStateChange(flag);
    } else {
      this.setState({
        isEdit: flag,
      });
      onStateChange(flag);
    }
  };

  renderEditBtn = () => {
    const { isShowEditBtn, prefixCls } = this.props;
    return isShowEditBtn ? (
      <EditIcon
        width="14px"
        height="17px"
        fill="#4696F2"
        className={`${prefixCls}-editBtn`}
        onClick={() => this.handleEditClick(true)}
      />
    ) : null;
  };

  render() {
    const { isEdit, value } = this.state;
    const resetProps = omit(this.props, PROPS_ARRAY);
    const { prefixCls, isShowToolTip, toolTipProps } = this.props;
    return (
      <div className={`${prefixCls}-editInputBox`}>
        <InputWrapper
          prefixCls={prefixCls}
          value={value}
          isShowToolTip={isShowToolTip}
          toolTipProps={toolTipProps}
        >
          <Input value={value} disabled={!isEdit} onChange={this.onChange} {...resetProps} />
        </InputWrapper>
        <div className={`${prefixCls}-editSwitch`}>
          {isEdit ? (
            <div>
              <ConfirmIcon
                width="17px"
                height="17px"
                fill="#299c64"
                className={`${prefixCls}-confirmBtn`}
                onClick={this.handleConfirm}
              />
              <CancelIcon
                width="13px"
                height="13px"
                fill="#ea001c"
                className={`${prefixCls}-cancelBtn`}
                onClick={this.handleCancel}
              />
            </div>
          ) : (
            this.renderEditBtn()
          )}
        </div>
      </div>
    );
  }
}
