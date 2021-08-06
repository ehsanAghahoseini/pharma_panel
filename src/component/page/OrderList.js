import React from 'react';
import { Table, Tag, Descriptions , Image , Collapse  } from 'antd';
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


class OrderList extends React.Component {

    state = {
      listdata : [],
      display:false,
      visibleDetail:false ,
      detail_data:"",
      list_ads : [],
    }


    handleCancel = ()=> {
      this.setState({visibleDetail:false,})
    }

    showDetailModal = (id)=> {
      this.setState({visibleDetail:true,})
      for(var i in this.state.listdata){
        if(this.state.listdata[i].id == id){
          this.setState({
            detail_data :this.state.listdata[i],
            list_ads : this.state.listdata[i].ads ,
           });
        }
      }
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
        render: row => <span onClick={()=>this.showDetailModal(row.id)} className="title-list-name">{row.user_id}</span>,
      },
      {
        title: 'نام و نام خانوادگی',
        render: row => <span>{row.first_name} {row.last_name}</span>,
      },
      {
        title: 'وضعیت پرداخت ',
        dataIndex: 'status',
        render: text =>(
          <>
           {[text === "waiting_for_payment" && <Tag color="red">در انتظار پرداخت</Tag> , text === "paid" && <Tag color="green">پرداخت شده</Tag>]  }
          </> )
      },
      {
        title: 'آدرس',
        dataIndex: 'address',
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
        title: 'شماره تماس',
        dataIndex: 'phone',
      },
            {
        title: 'توضیحات ',
        dataIndex: 'description',
      },
    ];
    const { Panel } = Collapse;
    return (
      <>
        {this.state.display ? <Loader/> : null}
        <Modal
          title="جزئیات"
          visible={this.state.visibleDetail}
          onCancel={this.handleCancel}
          footer={null}
          width={1000}
        >    
          <Descriptions
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label=" مجموع سفارش" span={1}>{this.state.detail_data.total_price} تومان</Descriptions.Item>
            <Descriptions.Item label="تخفیف" span={1}>{this.state.detail_data.total_discount} تومان</Descriptions.Item>
            <Descriptions.Item label="مبلغ نهایی" span={1}>
              {this.state.detail_data.final_price} تومان {this.state.detail_data.total_price - this.state.detail_data.total_discount <= 200000 ?
               <span>(هزینه ارسال اضافه گردید)</span> : null}
            </Descriptions.Item>
          </Descriptions>
          <Collapse >
            {this.state.list_ads.map(item =>
              <Panel header={"محصول" + item.id} key={item.id}>
                <Descriptions
                bordered
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                  <Descriptions.Item label="عنوان" span={1}>{item.title}</Descriptions.Item>
                  <Descriptions.Item label="تعداد" span={1}>{item.count}</Descriptions.Item>
                  <Descriptions.Item label="برند" span={1}>{item.brand}</Descriptions.Item>
                  <Descriptions.Item label="قیمت" span={1}>{item.price} تومان</Descriptions.Item>
                  <Descriptions.Item label="تخفیف" span={1}>{item.discount} تومان</Descriptions.Item> 
                  {item.image_url != null ? 
                    <Image src={item.image_url} width={200}></Image>
                  : null}

                </Descriptions>
              </Panel>
            )}  
          </Collapse>  
        </Modal>
        <Table columns={columns} dataSource={this.state.listdata} />
      </>
      
    );
  }
}

export default OrderList;
