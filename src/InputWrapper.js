/**
 * @Author: XuWenKang
 * @Description: tooltip
 * @Date: 2019-08-08 11:08:39
 * @Last Modified by: XuWenKang
 * @Last Modified time: 2019-08-08 11:16:36
 */
import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { CLASS_PREFIX } from './config';

export default function InputWrapper({ isShowToolTip, toolTipProps, value, prefixCls, children }) {
  return isShowToolTip ? (
    <Tooltip overlayClassName={`${prefixCls}-tooltip`} title={value} {...toolTipProps}>
      {children}
    </Tooltip>
  ) : (
    children
  );
}

InputWrapper.propTypes = {
  // 是否需要toolTip
  isShowToolTip: PropTypes.bool,
  toolTipProps: PropTypes.object,
  value: PropTypes.string,
  children: PropTypes.node.isRequired,
  prefixCls: PropTypes.string,
};

InputWrapper.defaultProps = {
  isShowToolTip: false,
  toolTipProps: {},
  value: '',
  prefixCls: CLASS_PREFIX,
};
