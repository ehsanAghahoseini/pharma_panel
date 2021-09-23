import React from 'react';
import { Table , Image, Switch, Form , Radio  , Select } from 'antd';
import { Redirect } from 'react-router-dom';
import {
  DeleteOutlined  ,
} from '@ant-design/icons';
import { Modal, Button } from 'antd';
import Loader from '../widget/Loader';
import $ from 'jquery';
import BASE_URL from '../../BASE_URL';
import Filter from '../widget/Filter';
import { Link } from 'react-router-dom';


class TopShop extends React.Component {

    state = {
      display:false,
      allShop : [],
      topShop : [],
    }


    onFinish=(values)=>{
        this.setState({display : true})
        $.ajax({
          url: 'https://newreza.ir/agahi_farma/php/admin/post_top_shops.php',
          type: 'post',
          dataType: 'json',
          data: JSON.stringify({
            "username": localStorage.getItem('username'),
            "password": localStorage.getItem('password'),
            "shops_id":values.shops ,
          }),
          success: (res) =>  {
              if(res.result === "ok"){
                this.setState({display:false});
                this.componentDidMount()
              }
              else {
                this.setState({display:false});
                alert("دوباره امتحان کنید ");
              }
          },
          error:  () => {
            this.setState({ display:false })
              alert("عدم برقراری ارتباط با سرور")
          },
        });
    }


    getTopShop=()=>{
      $.ajax({
        url: 'https://newreza.ir/agahi_farma/php/get_top_shops.php',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify({}),
        success: (res) =>  {
            if(res.result === "ok"){
              this.setState({display:false , topShop : res.shops});
            }
            else {
              this.setState({display:false , topShop : []});
              alert("داده ای برای نمایش وجود ندارد ");
            }
        },
        error:  () => {
          this.setState({ display:false })
            alert("عدم برقراری ارتباط با سرور")
        },
      });
    }


    getAllShop=()=>{
      $.ajax({
        url: 'https://newreza.ir/agahi_farma/php/get_shops.php',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify({}),
        success: (res) =>  {
            if(res.result === "ok"){
              this.setState({display:false , allShop : res.shops});
            }
            else {
              this.setState({display:false , allShop : []});
              alert("داده ای برای نمایش وجود ندارد ");
            }
        },
        error:  () => {
          this.setState({ display:false })
            alert("عدم برقراری ارتباط با سرور")
        },
      });
    }



  componentDidMount() {
    this.setState({display:true});
    this.getTopShop();
    this.getAllShop();
    
  }


  render() {
    const { Option } = Select;
    return (
      <>
        {this.state.display ? <Loader/> : null}
        <p>انتخاب 10 فروشگاه برتر</p>
        <Form onFinish={this.onFinish}>
          <Form.Item name="shops" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="انتخاب فروشگاه "
            // defaultValue={['a10', 'c12']}
          >
            {this.state.allShop.map((item , index)=>
            <Option key={item.username}>{item.place_name}</Option>
            )}
          </Select>
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">
            ذخیره
            </Button>
          </Form.Item>
        </Form>
        <p style={{marginTop:"50px"}}>10 فروشگاه برتر قبلی :</p>
        <div className="topShopCont">
          {this.state.topShop.map((item , index)=>
            <div className="topShopItem" key={item.username}>
              {item.place_name != null ? item.place_name : item.name}
            </div>
          )}
        </div>
      </>
      
    );
  }
}

export default TopShop;
