import React from 'react';
import { Table,Image, Switch, Descriptions  } from 'antd';
import { Link } from 'react-router-dom';
import {
  DeleteOutlined  ,
} from '@ant-design/icons';
import { Modal, Button } from 'antd';
import Loader from '../widget/Loader';
import $ from 'jquery';
import BASE_URL from '../../BASE_URL';
import moment from "jalali-moment";


class UserList extends React.Component {

    state = {
      visible: false,
      visibleDetail:false,
      itemname : "",
      itemid:0,
      display:false,
      listdata : [],
      detail_data:"",
    }


  // this function change switch ads
   onChangeSwitch(username , verify ) {
     this.setState({display : true});
     var acticve_state = "";
     if(verify === "true") {
        acticve_state = "false"
     }
     else if (verify === "false") {
       acticve_state = "true"
     }
     console.log(acticve_state)
    $.ajax({
      url: BASE_URL + '/activate_user.php',
      type: 'post',
      dataType: 'json',
      data: JSON.stringify({
        "username":localStorage.getItem('username'),
        "password":localStorage.getItem('password'),
        "user_id": username,
        "activation": acticve_state
      }),
      success: (res) =>  {
          if(res.result === "ok"){
            this.setState({display:false});
            this.componentDidMount();
          }
      },
      error:  () => {
        this.setState({ display:false })
          alert("عدم برقراری ارتباط با سرور")
      },
  });
  }



    // this function show modal for detail
    showModaldetail = (username ) => {
      this.setState({visible: true,});
    };

  // this.function show modal for detail 
  showModaldetail = (username) => {
    this.setState({visibleDetail:true,})
    for(var i in this.state.listdata){
      if(this.state.listdata[i].username == username){
        this.setState({detail_data :this.state.listdata[i] });
      }
    }

  }



  // this function display none all modals
  handleCancel =() => {
    this.setState({
      visible: false,
      visibleDetail : false,
    });
  };

  componentDidMount() {
    this.setState({display:true});
    $.ajax({
      url: BASE_URL + '/get_all_users.php',
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
              listdata : res.users,
            });
          }
          else {
            this.setState({display:false , listdata:[]});
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

    const columns = [

      {
        title: 'شماره کاربر',
        dataIndex: 'username',
      },
      {
        title: ' نام کاربر',
        dataIndex: 'name',
        key: 'name',
        render: (text , row) =>  <span className="title-list-name" onClick={() => this.showModaldetail(row.username)}>{`${text} - ${row.place_name != null ? row.place_name : ""}`}</span>,
      },
      {
      title: 'VIP',
      render: (text , row) =>  (row.is_vip == "true" ? <span>بله</span> : <span>خیر</span>),
      },
      {
        title: 'زمان VIP',
        render: (text , row) =>  (row.is_vip == "true" ? <span>{row.vip_method}</span> : <span>--</span>),
      },
      {
        title: 'زمان شروع VIP',
        render: (text , row) =>  (row.is_vip == "true" ? <span>{moment(new Date(JSON.parse(row.vip_start_time))).locale('fa').format("HH:mm:ss - YYYY/M/D")}</span> : <span>--</span>),
      },
      {
        title: 'زمان پایان VIP',
        render: (text , row) =>  (row.is_vip == "true" ? <span>{moment(new Date(JSON.parse(row.vip_end_time))).locale('fa').format("HH:mm:ss - YYYY/M/D")}</span> : <span>--</span>),
      },
      {
        title: 'فعالیت کاربر',
        render: row => (
         <> 
        {[row.verify_admin === 'true' && <Switch key={row.username} checkedChildren="فعال" unCheckedChildren="غیر فعال" defaultChecked    onChange={() => this.onChangeSwitch(row.username , row.verify_admin)} autoFocus={true} /> , 
        row.verify_admin === 'false' && <Switch key={row.username} checkedChildren="فعال" unCheckedChildren="غیر فعال"   onChange={() => this.onChangeSwitch(row.username , row.verify_admin)} autoFocus={true} />
        ]}
        </>
      )},
      // {
      //   title: 'حذف کاربر',
      //   render: row => <DeleteOutlined onClick={() => this.showModaldelete(row.username , row.title)} />,
      // },
    ];

    return (
      <>
        {this.state.display ? <Loader/> : null}
        <Modal
            title="حذف آگهی"
            visible={this.state.visible}
            onOk={this.deleteitem}
            onCancel={this.handleCancel}
          >
             آیا مایل به حذف آگهی "{this.state.itemname}" میباشید ؟
        </Modal>
        <Modal
          title="جزئیات"
          visible={this.state.visibleDetail}
          onCancel={this.handleCancel}
          footer={null}
          className="detail-property-modal"
          width={1000}
        >    
        <div>
          <Descriptions
            bordered
            // column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="نام کاربری" span={2}>{this.state.detail_data.username}</Descriptions.Item>
            <Descriptions.Item label="رمز عبور" span={2}>{this.state.detail_data.password}</Descriptions.Item>
            <Descriptions.Item label="نام و نام خانوادگی" span={2}>{this.state.detail_data.name}</Descriptions.Item>
            <Descriptions.Item label="تلفن" span={2}>{this.state.detail_data.phone}</Descriptions.Item>
            <Descriptions.Item label="ایمیل" span={2}>{this.state.detail_data.mail}</Descriptions.Item>
            <Descriptions.Item label="نام مکان" span={2}>{this.state.detail_data.place_name}</Descriptions.Item>
            <Descriptions.Item label="آدرس" span={2}>{this.state.detail_data.address}</Descriptions.Item>
            <Descriptions.Item label="استان" span={2}>{this.state.detail_data.province_name}</Descriptions.Item>
            <Descriptions.Item label="شهر" span={2}>{this.state.detail_data.city_name}</Descriptions.Item>
            <Descriptions.Item label="تایید sms" span={2}>{this.state.detail_data.verify_sms === "true" ? <span>تایید شده</span> : <span>تایید نشده</span>}</Descriptions.Item>
            <Descriptions.Item label="توضیحات" span={3}>{this.state.detail_data.description}</Descriptions.Item>
            <Descriptions.Item label="تصویر" span={3}>{this.state.detail_data.image_url ? 
              <div className="row-for-image-in-detail">
                <p>تصویر  :</p>
              <Image
                width={200}
                src={this.state.detail_data.image_url}
              />
              </div>
             : null}
            </Descriptions.Item>

          </Descriptions>
        </div>
      </Modal>
        <Table columns={columns} dataSource={this.state.listdata} />
      </>
      
    );
  }
}

export default UserList;
