import React from 'react';
import { Table, Tag, Switch, Descriptions , Image , Row } from 'antd';
import { Link } from 'react-router-dom';
import {
  DeleteOutlined  ,
} from '@ant-design/icons';
import { Modal, Button } from 'antd';
import Loader from '../widget/Loader';
import $ from 'jquery';
import BASE_URL from '../../BASE_URL';
import Filter from '../widget/Filter';
import moment from "jalali-moment";


class PaymentList extends React.Component {

    state = {
      listdata : [],
      display:false,
    }




  componentDidMount() {
    this.setState({display:true});
    $.ajax({
      url: BASE_URL + '/get_payments.php',
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
              listdata : res.payments,
            });
          }
          else {
            this.setState({display:false , listdata:[]});
            alert("داده ای برای نمایش وجود ندارد")
          }
      },
      error:  () => {
        this.setState({ display:false })
          alert("عدم برقراری ارتباط با سرور")
      },
  });
  }


  render() {


    const columns = [

      {
        title: 'شماره پرداخت',
        dataIndex: 'id',
      },
      {
        title: 'نام کاربری پرداخت کننده',
        dataIndex: 'user_id',
      },
      {
        title: 'تراکنش زرین پال',
        dataIndex: 'authority',
      },
      {
        title: 'مبلغ (تومان)',
        dataIndex: 'amount',
      },
      {
        title: 'عنوان',
        dataIndex: 'title',
      },
      {
        title: 'زمان',
        dataIndex: 'time',
        render: (obj) => (
          <>
              {moment(new Date(JSON.parse(obj))).locale('fa').format("HH:mm:ss - YYYY/M/D")}
          </>
      )
      },
      {
        title: 'از طریق',
        dataIndex: 'platform',
      },
    ];

    return (
      <>
        {this.state.display ? <Loader/> : null}
        <Table columns={columns} dataSource={this.state.listdata} />
      </>
      
    );
  }
}

export default PaymentList;
