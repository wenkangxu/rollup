import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import EditInput from '../src';
import '../src/style/index.less';

const { create } = Form;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 30 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 30 },
    sm: { span: 20 },
  },
};

class EditInputDemo extends PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      value2: '',
      formValue: '奥体大街某桥洞',
      isEdit: false,
    };
  }

  asnycValdate = (value) =>
    new Promise((reslove, reject) => {
      setTimeout(() => {
        if (value.length <= 10) {
          reslove();
        } else {
          reject('长度不能超过10');
        }
      }, 1000);
    });

  handleConfirm = (value) =>
    new Promise((resolve) => {
      // 此处可以做一些异步校验
      // 根据校验结果来决定是否调用resolve关闭输入框
      this.asnycValdate(value).then(
        () => {
          resolve();
          this.setState({
            value2: value,
          });
        },
        (err) => alert(err)
      );
    });

  handleConfirm2 = (value) => {
    const { form } = this.props;
    return new Promise((resolve) => {
      form.validateFields(['add'], (err) => {
        if (!err) {
          resolve();
        }
      });
    });
  };

  handleCancel2 = () => {
    const { form } = this.props;
    return new Promise((resolve) => {
      form.validateFields(['add'], (err, value) => {
        if (!err) {
          resolve();
        }
      });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ width: '800px', margin: '0 auto' }}>
        <Form {...formItemLayout}>
          <div>不显示编辑按钮</div>
          <EditInput
            value="测试测试1"
            isShowEditBtn={false}
          />
          <br />
          <div>单独作为受控组件使用</div>
          <EditInput
            value={this.state.value}
            onChange={(value) => this.setState({ value })}
            isEdit={this.state.isEdit}
            onStateChange={isEdit => this.setState({isEdit})}
          />
          <br />
          <div>点击确认按钮时异步校验</div>
          <br />
          <EditInput
            value={this.state.value2}
            onChange={(value2) => this.setState({ value2 })}
            onConfirm={this.handleConfirm}
          />
          <br />
          <div>放在form下使用</div>
          <FormItem label="家庭住址：">
            {getFieldDecorator('add', {
              initialValue: this.state.formValue,
              rules: [
                {
                  max: 30,
                  message: '长度不能超过30',
                },
                {
                  required: true,
                  message: '请输入家庭住址',
                },
              ],
            })(
              <EditInput
                onConfirm={this.handleConfirm2}
                onCancel={this.handleCancel2}
                placeholder="请输入"
                isShowToolTip
              />
            )}
          </FormItem>
          <br />
        </Form>
      </div>
    );
  }
}

const Demo = create()(EditInputDemo);

ReactDOM.render(<Demo />, document.querySelector('#app'));
