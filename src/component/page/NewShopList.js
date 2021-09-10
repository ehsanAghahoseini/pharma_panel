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


class NewShopList extends React.Component {

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
   onChangeSwitch(id ) {
    this.setState({display : true});
    $.ajax({
      url: BASE_URL + '/acception_new_shop_ad.php',
      type: 'post',
      dataType: 'json',
      data: JSON.stringify({
        "username":localStorage.getItem('username'),
        "password":localStorage.getItem('password'),
        "ad_id": id,
        "acception": "true"
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

  // this function show modal for delete
  showModaldelete = (id , name) => {
    this.setState({
      visible: true,
      itemid: id ,
      itemname:name,
    });
  };

    // this function show modal for delete
    showModaldetail = (id ) => {
      this.setState({visible: true,});
    };

  // this.function show modal for detail 
  showModaldetail = (id) => {
    this.setState({visibleDetail:true,})
    for(var i in this.state.listdata){
      if(this.state.listdata[i].id == id){
        this.setState({detail_data :this.state.listdata[i] });
      }
    }

  }


  // this function delete item of list ads
  deleteitem = () => {
    this.setState({visible: false});
    $.ajax({
      url: BASE_URL + '/acception_new_shop_ad.php',
      type: 'post',
      dataType: 'json',
      data: JSON.stringify({
        "username":localStorage.getItem('username'),
        "password":localStorage.getItem('password'),
        "ad_id": this.state.itemid,
        "acception": "false"
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
  };

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
      url: BASE_URL + '/get_new_shop_ads.php',
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
              listdata : res.ads,
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
    const DescriptionItem = ({title, content}) => (
      <div className="ProductDetailsDescribeDiv">
        <div className="ProductDetailsDescribeLabel">{title} : </div>
        <div className="ProductDetailsDescribecontent">{content}</div>
      </div>
  );

    const columns = [

      {
        title: 'شماره فروشگاه',
        dataIndex: 'id',
      },
      {
        title: 'مشاهده آگهی فروشگاه',
        dataIndex: 'title',
        key: 'title',
        render: (text , row) =>  <span className="title-list-name" onClick={() => this.showModaldetail(row.id)}>{text}</span>,
      },
      {
        title: 'تایید آگهی فروشگاه',
        render: row => (<Switch key={row.id} checkedChildren="فعال" unCheckedChildren="غیر فعال"   onChange={() => this.onChangeSwitch(row.id)} autoFocus={true}  />)
      },
      {
        title: 'حذف آگهی فروشگاه',
        render: row => <DeleteOutlined onClick={() => this.showModaldelete(row.id , row.title)} />,
      },
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
                <Row>
            <Filter.Demand data={this.state.detail_data} />
            <Filter.License data={this.state.detail_data} />
            <Filter.Shift data={this.state.detail_data} />
            <Filter.Document data={this.state.detail_data} />
            <Filter.Work_type data={this.state.detail_data} />
            <Filter.Pharmacy_experience data={this.state.detail_data} />
            <Filter.Storage data={this.state.detail_data} />
            <Filter.Corner data={this.state.detail_data} />
            <Filter.Street data={this.state.detail_data} />
            <Filter.Water data={this.state.detail_data} />
            <Filter.Power data={this.state.detail_data} />
            <Filter.Gas data={this.state.detail_data} />
            <Filter.Phone_line data={this.state.detail_data} />
            <Filter.Stair data={this.state.detail_data} />
            <Filter.Elevator data={this.state.detail_data} />
            <Filter.Internet data={this.state.detail_data} />
            <Filter.Clinic_experience data={this.state.detail_data} />
            <Filter.Floor data={this.state.detail_data} />
            <Filter.Urgent_need data={this.state.detail_data} />
            <Filter.Prescription data={this.state.detail_data} />

            {!this.state.detail_data.name == "" && (<><DescriptionItem title={"نام و نام خانوادگی"} content={this.state.detail_data.name}/></>)}
            {!this.state.detail_data.province_name == "" && (<><DescriptionItem title={"استان"} content={this.state.detail_data.province_name}/></>)}
            {!this.state.detail_data.place_name == "" && (<><DescriptionItem title={"نام محل"} content={this.state.detail_data.place_name}/></>)}
            {!this.state.detail_data.daily_sales_amount == "" && (<><DescriptionItem title={"مبلغ فروش روزانه"} content={this.state.detail_data.daily_sales_amount + "  تومان  "}/></>)}
            {!this.state.detail_data.mortgage_offer == "" && (<><DescriptionItem title={"مبلغ رهن پیشنهادی"} content={this.state.detail_datamortgage_offer + "  تومان  "}/></>)}
            {!this.state.detail_data.rent_offer == "" && (<><DescriptionItem title={"مبلغ اجاره پیشنهادی"} content={this.state.detail_data.rent_offer + "  تومان  "}/></>)}
            {!this.state.detail_data.length == "" && (<><DescriptionItem title={"طول"} content={this.state.detail_data.length + "  متر  "}/></>)}
            {!this.state.detail_data.width == "" && (<><DescriptionItem title={"عرض"} content={this.state.detail_data.width + "  متر  "}/></>)}
            {!this.state.detail_data.guarantee == "" && (<><DescriptionItem title={"گارانتی"} content={this.state.detail_data.guarantee}/></>)}
            {!this.state.detail_data.price == "" && (<><DescriptionItem title={"قیمت"} content={this.state.detail_data.discount}/></>)}
            {!this.state.detail_data.discount == "" && (<><DescriptionItem title={"گارانتی"} content={this.state.detail_data.discount}/></>)}
            {!this.state.detail_data.experience_time == "" && (<><DescriptionItem title={"مدت سابقه کار"} content={this.state.detail_data.experience_time}/></>)}
            {!this.state.detail_data.raw_points_amount == "" && (<><DescriptionItem title={"مبلغ امتیاز خام"} content={this.state.detail_data.raw_points_amount + "  تومان  "}/></>)}
            {!this.state.detail_data.earned_points_amount == "" && (<><DescriptionItem title={"مبلغ امتیاز کارکرده"} content={this.state.detail_data.earned_points_amount + "  تومان  "}/></>)}
            {!this.state.detail_data.rent_amount == "" && (<><DescriptionItem title={"مبلغ اجاره بها"} content={this.state.detail_data.rent_amount + "  تومان  "}/></>)}
            {!this.state.detail_data.insurance_amount == "" && (<><DescriptionItem title={"مبلغ مجموع بیمه ها"} content={this.state.detail_data.insurance_amount + "  تومان  "}/></>)}
            {!this.state.detail_data.documents_last_time == "" && (<><DescriptionItem title={"آخرین تاریخ ارسال مدارک "} content={this.state.detail_data.documents_last_time}/></>)}
            {!this.state.detail_data.result_time == "" && (<><DescriptionItem title={"تاریخ اعلام نتیحه"} content={this.state.detail_data.result_time}/></>)}
            {!this.state.detail_data.tender_deposit == "" && (<><DescriptionItem title={"سپرده جهت مزایده/مناقصه"} content={this.state.detail_data.tender_deposit + "  تومان  "}/></>)}
            {!this.state.detail_data.daily_sales_amount == "" && (<><DescriptionItem title={"مبلغ فروش روزانه"} content={this.state.detail_data.daily_sales_amount + "  تومان  "}/></>)}
            {!this.state.detail_data.product_name == "" && [this.state.detail_data.prescription == "" ? <><DescriptionItem title={"نام کالا"} content={this.state.detail_data.product_name}/></> : <><DescriptionItem title={"نام دارو"} content={this.state.detail_data.product_name}/></>]}
            {!this.state.detail_data.brand == "" && (<><DescriptionItem title={"برند"} content={this.state.detail_data.brand}/></>)}
            {!this.state.detail_data.colors == "" && (<><DescriptionItem title={"رنگ"} content={this.state.detail_data.colors}/></>)}
            {!this.state.detail_data.purchase_points == "" && (<><DescriptionItem title={"امتیاز خرید"} content={this.state.detail_data.purchase_points}/></>)}

            {!this.state.detail_data.description == "" && (<><DescriptionItem title={"توضیحات"} content={this.state.detail_data.description}/></>)}
            {!this.state.detail_data.address == "" && (<><DescriptionItem title={"ادرس"} content={this.state.detail_data.address}/></>)}
            {!this.state.detail_data.mobile == "" && (<><DescriptionItem title={"موبایل"} content={this.state.detail_data.mobile}/></>)}

            {this.state.detail_data.image_url ? 
              <div className="row-for-image-in-detail">
                <p>تصویر آگهی :</p>
              <Image
                width={200}
                src={this.state.detail_data.image_url}
              />
              </div>
             : null}




        </Row>
      </Modal>
        <Table columns={columns} dataSource={this.state.listdata} />
      </>
      
    );
  }
}

export default NewShopList;
