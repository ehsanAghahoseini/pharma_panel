import React from 'react';
import {connect} from "react-redux";
import {StepState} from '../../../../action/AddAdsAction';
import {Form, Input, Select, Button, Modal, Upload, InputNumber, Tag, Spin} from 'antd';
import ImgCrop from 'antd-img-crop';
import $ from 'jquery';
import {RollbackOutlined, UploadOutlined, AimOutlined} from "@ant-design/icons"
import {Map, Marker, TileLayer} from "react-leaflet";
import {DatePicker} from "jalali-react-datepicker";
import moment from "jalali-moment";
import Checkbox from "antd/es/checkbox";
import Loader from '../../Loader';
import BASE_URL_SITE from '../../../../BASE_URL_SITE';
import BASE_URL from '../../../../BASE_URL';
import { Redirect } from 'react-router-dom';


class Private_Assignment_Form extends React.Component {

  state = {
    display : false ,
    visible : false ,
    redirect : false ,
    textModal : "",
    markers : [32.67493860077906, 51.65044248191407] ,
    fileList : [],
    allCity : [],
    allProvinces : []
  }
  formRef = React.createRef();

  getLocation=()=> {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
            const newMarker = [];
            newMarker.push(position.coords.latitude);
            newMarker.push(position.coords.longitude);
            this.setState({markers : newMarker});
        });
    } else {
        alert("عدم پشتیبانی از مکان یاب");
    }
}


  addMarker = (e) => {
    const newmarker = [];
    newmarker.push(e.latlng.lat);
    newmarker.push(e.latlng.lng);
    this.setState({markers :newmarker});
  }

  onChange = ({ fileList: newFileList }) => {
    this.setState({fileList :newFileList});
  };

  onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  getListProvinces=()=>{
    $.ajax({
      url: BASE_URL_SITE + 'get_provinces.php',
      type: 'post',
      dataType: 'json',
      success: (res) =>  {
          if(res.result === "ok"){
            this.setState({
              display:false ,
              allProvinces : res.provinces , 
            });
          }
      },
      error:  () => {
        this.setState({ display:false })
          alert("عدم برقراری ارتباط با سرور")
      },
    });
  }


  getListCity=(e)=>{
    this.setState({display : true})
    $.ajax({
      url: BASE_URL_SITE + 'get_cities.php',
      type: 'post',
      dataType: 'json',
      data: JSON.stringify({
        "province_id":e ,
      }),
      success: (res) =>  {
          if(res.result === "ok"){
            this.formRef.current.setFieldsValue({city : ""})
            this.setState({
              display:false ,
              allCity : res.cities , 
            });
          }
      },
      error:  () => {
        this.setState({ display:false })
        alert("عدم برقراری ارتباط با سرور")
      },
    });
  }


  onFinish=(values)=>{
    let imgCheck = "false" ;
    if(this.state.fileList.length != 0){
      imgCheck = "true" ;
    }
    for(let i in values){
      if(values[i] === undefined){
          values[i] = "";
      }
    }
    this.setState({display:true});
    const postData = {
      "username": localStorage.getItem('username'),
      "password": localStorage.getItem('password'),
      "type": "pharmacy_private_assignment",
      "type2": "",
      "type3": "",
      "type4": "",
      "title": "داروخانه خصوصی واگذاری",
      "province_id": values.province,
      "city_id": values.city,
      "demand": "",
      "license": "",
      "shift": "",
      "description": values.description,
      "name": values.name,
      "mobile": values.phone,
      "address": values.address,
      "lat": this.state.markers[0],
      "lng": this.state.markers[1],
      "experience_time":values.experience_time,
      "document": "",
      "place_name": values.place_name,
      "work_type": values.work_type,
      "raw_points_amount": values.raw_points_amount,
      "earned_points_amount":  values.earned_points_amount,
      "daily_sales_amount":  values.daily_sales_amount,
      "insurance_amount": values.insurance_amount,
      "rent_amount": values.rent_amount,
      "documents_last_time": "",
      "tender_deposit": "",
      "result_time": "",
      "pharmacy_experience": "",
      "mortgage_offer": "",
      "rent_offer": "",
      "storage": "",
      "width": "",
      "length": "",
      "street": "",
      "corner": "",
      "water": "",
      "power": "",
      "phone_line": "",
      "internet": "",
      "gas": "",
      "stair": "",
      "elevator": "",
      "clinic_experience": "",
      "floor_number": "",
      "prescription": "",
      "product_name": "",
      "urgent_need": "",
      "place_type": "",
      "phone": "",
      "brand": "",
      "colors": "",
      "guarantee": "",
      "purchase_points": "",
      "price": "",
      "discount": "",
      "image_detail": imgCheck,
      "count": "0"
    };
    let fd = new FormData();
    fd.append( 'data', JSON.stringify(postData) );
    for(let i in this.state.fileList){
      fd.append("file",this.state.fileList[i].originFileObj );
    }
    $.ajax({
      url: BASE_URL + '/add_unique_ad.php',
      type: 'post',
      dataType: 'json',
      data: fd,
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      success: (res) =>  {
          if (res.result == "ok") {
            this.setState({
              display:false ,
              visible : true ,
              textModal : "باموفقیت ثبت گردید" ,
              redirect : true ,
            });
          }
          else {
            this.setState({
              display:false ,
              visible : true ,
              textModal : "یک خطای غیر منتظره رخ داده است"
            });
          }
      },
      error: function () {
        this.setState({ display:false })
        alert("عدم برقراری ارتباط با سرور")
      },
    });
  }


  componentDidMount() {
    this.setState({display:true});
    this.getListProvinces()

  }

  render() {
  const formItemLayout = {
      labelCol: {
          xs: {span: 23},
          sm: {span: 8},
      },
      wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
      },
  };
  const tailFormItemLayout = {
      wrapperCol: {
          xs: {
              span: 24,
              offset: 0,
          },
          sm: {
              span: 24,
              offset: 0,
          },
      },
  };
  const {Option} = Select;  
    return (
    <div className="group-button">
        {this.state.redirect ? (<Redirect to='/panel/adminadvertisinglist' />) : null}
        {this.state.display ? <Loader/> : null}
        <Modal
            title="پیام"
            visible={this.state.visible}
            onCancel={()=>{this.setState({visible : false})}}
            footer={null}
          >
             {this.state.textModal}
        </Modal>
        <Button danger onClick={()=>{this.props.StepState('assignment_pharmacy')}}>بازگشت</Button>
        <Form {...formItemLayout} ref={this.formRef} name="form" onFinish={this.onFinish} >
          <Form.Item
            name="province"
            label="انتخاب استان"
            rules={[
                {
                    required: true,
                    message: 'استان را انتخاب کنید',
                },
            ]}
            required={true}>
            <Select
                showSearch
                onChange={this.getListCity}
                placeholder="استان خود را انتخاب کنید"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
              {this.state.allProvinces.map(item=>
                <option value={item.id}>{item.name}</option>
              )}
            </Select>
          </Form.Item>
          <Form.Item
              name="city"
              label="انتخاب شهر"
              rules={[
                  {
                      required: true,
                      message: 'شهر را انتخاب کنید',
                  },
              ]} required={true}>
              <Select
                  showSearch
                  placeholder="شهر خود را انتخاب کنید"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
              >
                {this.state.allCity.map(item=>
                  <option value={item.id}>{item.name}</option>
                )}  
              </Select>
          </Form.Item>

          <Form.Item
              name="work_type"
              label="انتخاب بازه زمان"
              rules={[
                  { required: true,}]} >
              <Select
                  showSearch
                  placeholder="روزانه/پاره وقت/شبانه روزی"
                  optionFilterProp="children"
              >
                  <Option value="daily">روزانه</Option>
                  <Option value="partly">پاره وقت</Option>
                  <Option value="hostelry">شبانه روزی</Option>
              </Select>
          </Form.Item>

          <Form.Item
              name="raw_points_amount_Status"
              label="امتیاز خام"
              rules={[{required: true}]}
          >
              <Select
                  showSearch
                  placeholder="امتیاز خام در نظر دارید؟"
                  optionFilterProp="children"
                  onChange={''}
              >
                  <Option value={"true"}>دارد</Option>
                  <Option value={"false"}>ندارد</Option>
              </Select>
          </Form.Item>

          <Form.Item
              name="raw_points_amount"
              label="مبلغ امتیاز خام"
              // style={{display:NetPiontChech.raw}}
              help={"قیمت به تومان"}
          >
              <InputNumber style={{display:"block",width:"16rem"}} />
          </Form.Item>

          <Form.Item
              name="earned_points_amount"
              label="مبلغ امتیاز کارکرده"
              // style={{display:NetPiontChech.earned}}
              help={"قیمت به تومان"}
          >
              <InputNumber  style={{display:"block",width:"16rem"}} />
          </Form.Item>

          <Form.Item
              name="daily_sales_amount"
              label="مبلغ فروش روزانه"
              rules={[{required: true, message: 'مبلغ را وارد کنید'}]}
              help={"قیمت به تومان"}
          >
              <InputNumber style={{display:"block",width:"16rem"}} />
          </Form.Item>

          <Form.Item
              name="insurance_amount"
              label="مبلغ مجموع بیمه ها"
              rules={[{required: true, message: 'مبلغ را وارد کنید'}]}
              help={"قیمت به تومان"}
          >
              <InputNumber style={{display:"block",width:"16rem"}} />
          </Form.Item>

          <Form.Item
              name="rent_amount"
              label="مبلغ اجاره بها"
              rules={[{required: true, message: 'مبلغ را وارد کنید'}]}
              help={"قیمت به تومان"}
          >
              <InputNumber style={{display:"block",width:"16rem"}} />
          </Form.Item>

          <Form.Item
              name="name"
              label="نام و نام خانوادگی"
              rules={[{required: true}]}
          >
              <Input/>
          </Form.Item>

          <Form.Item
              name="phone"
              label={"شماره تلفن همراه"}
              disable
          >
              <InputNumber placeholder={"شماره همراه"} style={{width: '100%'}}/>
          </Form.Item>

          <Form.Item name="description" label="توضیحات" rules={[{required: true, message: 'توضیحات را وارد کنید'}]}>
              <Input.TextArea placeholder="توضیحات لازم را وارد کنید" autoSize={{minRows: 2}}/>
          </Form.Item>

          <Form.Item name="address" label="آدرس" rules={[{required: true, message: 'آدرس را وارد کنید'}]}>
              <Input.TextArea placeholder="آردس را وارد کنید" autoSize={{minRows: 3}}/>
          </Form.Item>

          <Form.Item name="image" label="بارگذاری عکس">
              <ImgCrop rotate>
                  <Upload listType="picture-card"
                          action=''
                          fileList={this.state.fileList }
                          onChange={this.onChange}
                          onPreview={this.onPreview}
                          accept=".png,.jpg"
                          customRequest={this.dummyRequest}>
                      {this.state.fileList .length < 1 && <UploadOutlined/>}
                  </Upload>
              </ImgCrop>
          </Form.Item>
          <div className="mapSection">
          <h4 style={{float:"right"}}> مکان را روی نقشه انتخاب کنید :   </h4>
          <Tag onClick={this.getLocation} color="#3797a4"  style={{float:"left",marginBottom:"1rem",cursor:"pointer"}} icon={<AimOutlined />}> نمایش مکان من </Tag>
          <Map center={this.state.markers} zoom={18} onClick={(e)=>this.addMarker(e)}>
              <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker  position={this.state.markers}>
              </Marker>
          </Map>
          </div>
          <Form.Item {...tailFormItemLayout}>
              <Button block style={{marginTop: "1rem"}} type="primary" htmlType="submit">
                  ثبت آگهی
              </Button>
          </Form.Item>
        </Form>
        
    </div>
    );
  }
}


const mapStateToProps = state => {
  return({
    Displaystep: state.step,
  })
}
const mapDispatchToProps = {StepState};

export default connect(mapStateToProps , mapDispatchToProps)(Private_Assignment_Form);