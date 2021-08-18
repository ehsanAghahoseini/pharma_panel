import React from 'react';
import {connect} from "react-redux";
import {StepState} from '../../../../action/AddAdsAction';
import {Form, Input, Select, Button, Modal, Upload, InputNumber, Tag, Cascader} from 'antd';
import ImgCrop from 'antd-img-crop';
import $ from 'jquery';
import {RollbackOutlined, UploadOutlined, ArrowRightOutlined} from "@ant-design/icons"
import {Map, Marker, TileLayer} from "react-leaflet";
import {DatePicker} from "jalali-react-datepicker";
import moment from "jalali-moment";
import Checkbox from "antd/es/checkbox";
import Loader from '../../Loader';
import BASE_URL_SITE from '../../../../BASE_URL_SITE';
import BASE_URL from '../../../../BASE_URL';
import { Redirect } from 'react-router-dom';


class Shop_Complement_Form extends React.Component {

  state = {
    display : false ,
    visible : false ,
    redirect : false ,
    textModal : "",
    fileList : [],
    allCity : [],
    allProvinces : []
  }
  formRef = React.createRef();



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
    let ProduceTime = values.produce_time;
    ProduceTime = ProduceTime.replace("/0","/");
    ProduceTime = ProduceTime.replace("/0","/");
    let ExpireTime = values.expire_time;
    ExpireTime = ExpireTime.replace("/0","/");
    ExpireTime = ExpireTime.replace("/0","/");
    const TypeTitle = document.getElementsByClassName("ant-cascader-picker-label")[0].innerText;
    const postData = {
      "username": localStorage.getItem('username'),
      "password": localStorage.getItem('password'),
      "type": "shop_pharmacy",
      "type2": values.TypeMakeUp[0],
      "type3": values.TypeMakeUp[1],
      "type4": "",
      "title": TypeTitle,
      "province_id": "",
      "city_id": "",
      "demand":  "",
      "license": "",
      "shift": "",
      "description": values.description,
      "name": values.name,
      "mobile": values.phone,
      "address": values.address,
      "lat": "",
      "lng": "",
      "experience_time": "",
      "document": "",
      "place_name": "",
      "work_type": "",
      "raw_points_amount": "",
      "earned_points_amount": "",
      "daily_sales_amount": "",
      "insurance_amount": "",
      "rent_amount": "",
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
      "count":values.count,
      "brand": values.brand,
      "colors": values.colors,
      "guarantee": values.guarantee,
      "purchase_points": values.purchase_points,
      "price": values.price,
      "discount": values.discount,
      "image_detail": imgCheck,
      "persian_name": values.persian_name,
      "english_name": values.english_name,
      "produce_country": values.produce_country,
      "volume": values.volume,
      "expire_time": ExpireTime,
      "produce_time": ProduceTime
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

  }

  render() {

    const optionsCase = [
        {
            value: 'medicinal',
            label: 'دارویی',
            children: [
                {
                    value: 'vitamins',
                    label: 'ویتامین ها',
                },
                {
                    value: 'safety_system',
                    label: 'سیستم ایمنی',
                },
                {
                    value: 'joint_bones',
                    label: 'مفاصل و استخوان',
                },
                {
                    value: 'skin_hair_nails',
                    label: 'پوست،مو،ناخن',
                },
                {
                    value: 'digestive_system',
                    label: 'دستگاه گوارش',
                },
                {
                    value: 'cardiovascular',
                    label: 'قلب و عروق',
                },
                {
                    value: 'woman',
                    label: 'زنان',
                },
                {
                    value: 'neurology',
                    label: 'مغزو اعصاب',
                },
                {
                    value: 'kidney',
                    label: 'کلیه',
                },
                {
                    value: 'eye',
                    label: 'چشم',
                },
                {
                    value: 'cold',
                    label: 'سرماخوردگی',
                },
                {
                    value: 'iron_anemia',
                    label: 'آهن،کم خونی',
                },
                {
                    value: 'memory',
                    label: 'حافظه',
                },
                {
                    value: 'energy_producer',
                    label: 'انرژی زا',
                },
                {
                    value: 'sexual_powers',
                    label: 'قوای جنسی',
                },
                {
                    value: 'diabetes',
                    label: 'دیابت',
                },
                {
                    value: 'liver',
                    label: 'کبد',
                },
                {
                    value: 'prostate',
                    label: 'پروستات',
                }
            ],
        },
        {
            value: 'diet',
            label: 'رژیمی',
            children: [
                {
                    value: 'weight_loss',
                    label: 'کاهش وزن',
                },
                {
                    value: 'weight_gain',
                    label: 'افزایش وزن',
                }
            ],
        },
        {
            value: 'pregnancy',
            label: 'بارداری',
            children: [
                {
                    value: 'pregnancy_breast',
                    label: 'دوران بارداری یا شیردهی',
                },
                {
                    value: 'before_pregnancy',
                    label: 'پیش از بارداری',
                }
            ]
        },
        {
            value: 'sport',
            label: 'ورزشی',
            children: [
                {
                    value: 'protein',
                    label: 'پروتئین',
                },
                {
                    value: 'amino_aid',
                    label: 'امینواسید',
                },
                {
                    value: 'carbohydrate',
                    label: 'کربوهیدرات',
                },
                {
                    value: 'carboprotein',
                    label: 'کربوپروتئین',
                },
                {
                    value: 'fat_bunner',
                    label: 'چربی سوز',
                },
                {
                    value: 'keratin',
                    label: 'کراتین',
                },
                {
                    value: 'pump_supplement',
                    label: 'مکمل پمپ',
                }
            ],

        },
        {
            value: 'body_food',
            label: 'غذای کودک',
            children: [
                {
                    value: 'milk_powder',
                    label: 'شیر خشک',
                },
                {
                    value: 'before_pregnancy',
                    label: 'food',
                }
            ]
        },
    ];

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
        <Button danger onClick={()=>{this.props.StepState('shop_pharmacy')}}>بازگشت</Button>
        <Form {...formItemLayout} ref={this.formRef} name="form" onFinish={this.onFinish} >
        <Form.Item
              name="TypeMakeUp"
              label="نوع مکمل"
          >
              <Cascader popupClassName="casCader"
                  popupPlacement={"bottomLeft"}
                  suffixIcon={<ArrowRightOutlined />}
                  expandIcon={<ArrowRightOutlined />}
                  placeholder="نوع مکمل"
                  options={optionsCase}
                  changeOnSelect
              />
          </Form.Item>

          <Form.Item
              name="brand"
              label="برند"
              rules={[{required: true, message: 'این آیتم الزامیست'}]}
          >
              <Input/>
          </Form.Item>

          <Form.Item name="description" label="توضیحات کالا">
              <Input.TextArea placeholder="توضیحات لازم را وارد کنید" autoSize={{minRows: 2}}/>
          </Form.Item>

          <Form.Item
              name="colors"
              label="رنگ"
          >
              <Input/>
          </Form.Item>

          <Form.Item
              name="guarantee"
              label="گارانتی"
          >
              <Input/>
          </Form.Item>

          <Form.Item
              name="persian_name"
              label="نام کالا به فارسی"
              rules={[{required: true, message: 'این آیتم الزامیست'}]}
          >
              <Input/>
          </Form.Item>

          <Form.Item
              name="english_name"
              label="نام کالا به انگلیسی"
          >
              <Input/>
          </Form.Item>

          <Form.Item
              name="produce_time"
              label="تاریخ تولید"
              help={"مثال :  1400/01/02"}
              rules={[{required: false},
                  () => (
                      {
                          validator(rule, value) {
                              if ((value.charAt(4) === "/" && value.charAt(7) === "/" && value.length === 10 ) || value === "") {
                                  return Promise.resolve();
                              }
                              return Promise.reject('فرمت تاریخ را طبق مثال وارد کنید');
                          }
                      })
              ]}
          >
              <Input style={{width:"100%"}} />
          </Form.Item>

          <Form.Item
              name="expire_time"
              label="تاریخ انقضا"
              help={"مثال :  1400/01/02"}
              rules={[{required: false},
                  () => ({
                      validator(rule, value) {
                          if ((value.charAt(4) === "/" && value.charAt(7) === "/" && value.length === 10 ) || value === "") {
                              return Promise.resolve();
                          }
                          return Promise.reject('فرمت تاریخ را طبق مثال وارد کنید');
                      }
                  })
              ]}
          >
              <Input style={{width:"100%"}} />
          </Form.Item>

          <Form.Item
              name="produce_country"
              label="کشور سازنده"
          >
              <Input/>
          </Form.Item>

          <Form.Item
              name="volume"
              label="حجم محصول"
          >
              <Input/>
          </Form.Item>

          <Form.Item
              name="purchase_points"
              label="امتیاز خرید"
          >
              <InputNumber style={{display:"block",width:"16rem"}} />
          </Form.Item>

          <Form.Item
              name="count"
              label="موجودی کالا"
              rules={[{required: true, message: 'تعداد را وارد کنید'}]}
          >
              <InputNumber placeholder="تعداد"  style={{display:"block",width:"16rem"}} />
          </Form.Item>


          <Form.Item
              name="price"
              label="مبلغ کالا"
              rules={[{required: true, message: 'وجه را وارد کنید'}]}
          >
              <InputNumber style={{display:"block",width:"16rem"}} />
          </Form.Item>

          <Form.Item
              dependencies={['price']}
              name="discount"
              label="مبلغ تخفیف کالا"
              rules={[
                  {
                      required: true,
                      message: 'مبلغ تخفیف را وارد کنید',
                  },
                  ({getFieldValue}) => ({
                      validator(rule, value) {
                          if (getFieldValue("price") < value) {
                              return Promise.reject('مبلغ تخفیف نمی تواند بیش از مبلغ کالا باشد');
                          }
                          return Promise.resolve();
                      },
                  }),
              ]}
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

export default connect(mapStateToProps , mapDispatchToProps)(Shop_Complement_Form);
