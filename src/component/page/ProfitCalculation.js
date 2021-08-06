import React from 'react';
import {Form, Input, Row, Button , Select , InputNumber } from 'antd';
import { Redirect } from 'react-router-dom';
import Loader from '../widget/Loader';
import $ from 'jquery';
import BASE_URL from '../../BASE_URL';


class ProfitCalculation extends React.Component {

    state = {
      display:false,
      listdata : [],
      show_percent_shop : 0 ,
      show_percent_pharma : 0 ,

    }

    onFinish = (values) => {
      var percent_pharma = values.price * (values.percent/100) ;
      var percent_shop = values.price - percent_pharma ;
      this.setState({
        show_percent_pharma : percent_pharma ,
        show_percent_shop : percent_shop ,
      });
    }



  componentDidMount() {
    this.setState({display:true});
    $.ajax({
      url: BASE_URL + '/get_orders.php',
      type: 'post',
      dataType: 'json',
      data: JSON.stringify({
        "username":localStorage.getItem('username'),
        "password":localStorage.getItem('password'),
      }),
      success: (res) =>  {
          if(res.result === "ok"){
            this.setState({
              display:false ,
              listdata : res.orders,
            });
          }
          else {
            this.setState({display:false , listdata : []});
            alert("داده ای برای نمایش وجود ندارد ");
          }
      },
      error:  () => {
        this.setState({ display:false })
          alert("عدم برقراری ارتباط با سرور")
      },
  });
  }


  render() {
    const layout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    };
    const { Option } = Select;

    return (
      <>
        {this.state.display ? <Loader/> : null}
        <Form {...layout} name="profit" onFinish={this.onFinish} >
          <Form.Item name='price' label="فاکتور" rules={[{ required: true }]}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="فاکتور"
            >
              {this.state.listdata.map(item =>
              <Option value={item.final_price}>{item.user_id} - {item.first_name} {item.last_name} - {item.final_price} تومان</Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item name='percent' label="درصد" rules={[{ required: true }]}>
            <InputNumber min={1} max={100} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              محاسبه
            </Button>
          </Form.Item>
        </Form>
        <div className="show-percent">
          <Row className="show-percent-row"><h4>محاسبه سود</h4></Row>
          <Row className="show-percent-row">
            <div className="show-percent-row-col">سود فروشگاه</div>
            <div className="show-percent-row-col">{this.state.show_percent_shop} تومان</div>
          </Row>
          <Row className="show-percent-row">
            <div className="show-percent-row-col">سود شما</div>
            <div className="show-percent-row-col">{this.state.show_percent_pharma} تومان</div>
          </Row>
        </div>
      </>
      
    );
  }
}

export default ProfitCalculation;
