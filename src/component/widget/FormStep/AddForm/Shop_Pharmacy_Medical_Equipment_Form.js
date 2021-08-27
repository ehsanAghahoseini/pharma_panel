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


class Shop_Pharmacy_Medical_Equipment_Form extends React.Component {

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
      "name": "",
      "mobile": "",
      "address": "",
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
            value: 'temperature',
            label: 'دما - تب',
            children: [
                {
                    value: 'thermometer1',
                    label: 'تب سنج',
                },
                {
                    value: 'thermometer2',
                    label: 'دما سنج',
                },
            ],
        },
        {
            value: 'pulse_meter',
            label: 'ضربان سنج',
            children: [
                {
                    value: 'stethoscope',
                    label: 'گوشی پزشکی',
                },
                {
                    value: 'hearing_sound',
                    label: 'شنود صدا',
                },
                {
                    value: 'wrist',
                    label: 'مچ بند',
                },
            ],
        },
        {
            value: 'sugar_test',
            label: 'تست قند',
            children: [
                {
                    value: 'sugar_machine',
                    label: 'دستگاه قند',
                },
                {
                    value: 'strip_test',
                    label: 'نوار تست',
                },
                {
                    value: 'machine_needle',
                    label: 'سوزن دستگاه',
                },
                {
                    value: 'machine_needle',
                    label: 'کیف',
                },
            ],
        },
        {
            value: 'hearing_aids',
            label: 'سمعک',
            children: [
                {
                    value: 'hearing_aids',
                    label: 'سمعک',
                },
                {
                    value: 'battery',
                    label: 'باطری',
                },
                {
                    value: 'box',
                    label: 'محفظ/جعبه',
                },
                {
                    value: 'prob',
                    label: 'پروب',
                },
                {
                    value: 'dehumidifiers',
                    label: 'رطوبت گیر',
                },
                {
                    value: 'bag',
                    label: 'کیف',
                },
                {
                    value: 'battery_tester',
                    label: 'تستر باطری',
                },
            ],
        },
        {
            value: 'massage',
            label: 'ماساژور',
            children: [
                {
                    value: 'electric',
                    label: 'برقی',
                },
                {
                    value: 'manual',
                    label: 'دستی',
                },
                {
                    value: 'chair',
                    label: 'صندلی',
                },
            ],
        },
        {
            value: 'scale',
            label: 'ترازو',
            children: [
                {
                    value: 'digital',
                    label: 'دیجیتال',
                },
                {
                    value: 'mechanical',
                    label: 'مکانیکی',
                },
                {
                    value: 'laboratory',
                    label: 'آزمایشگاهی',
                },
            ],
        },
        {
            value: 'aerator',
            label: 'دستگاه بخور',
            children: [
                {
                    value: 'cold',
                    label: 'سرد',
                },
                {
                    value: 'hot',
                    label: 'گرم',
                },
                {
                    value: 'hotcold',
                    label: 'سرد و گرم',
                },
            ],
        },
        {
            value: 'body_medical',
            label: 'لوازم طبی بدن',
            children: [
                {
                    value: 'hand',
                    label: 'دست',
                    children: [
                        {
                            value: 'wrist',
                            label: 'مچ بند',
                        },
                        {
                            value: 'arnchband',
                            label: 'ارنج بند',
                        },
                        {
                            value: 'ketfband',
                            label: 'کتف بند',
                        },
                        {
                            value: 'ceiling',
                            label: 'شصت بند',
                        },
                        {
                            value: 'obesband',
                            label: 'آویزدست',
                        },
                        {
                            value: 'fingerband',
                            label: 'آتل انگشت',
                        },
                    ]
                },
                {
                    value: 'leg',
                    label: 'پا',
                    children: [
                        {
                            value: 'kneeband',
                            label: 'زانوبند',
                        },
                        {
                            value: 'sandal',
                            label: 'صندل',
                        },
                        {
                            value: 'heelstrap',
                            label: 'پاشنه بند',
                        },
                        {
                            value: 'anklestrap',
                            label: 'قوزک بند',
                        },
                        {
                            value: 'varicosebocks',
                            label: 'جوراب واریس',
                        },
                        {
                            value: 'plastershoes',
                            label: 'کفش گچ',
                        },
                    ]
                },
                {
                    value: 'body',
                    label: 'بدن',
                    children: [
                        {
                            value: 'abdominalband',
                            label: 'شکم بند',
                        },
                        {
                            value: 'beltband',
                            label: 'کمربند',
                        },
                        {
                            value: 'ghozband',
                            label: 'قوزبند',
                        },
                        {
                            value: 'gan',
                            label: 'گن',
                        },
                        {
                            value: 'fatgh_band',
                            label: 'فتق بند'
                        }
                    ]
                },
                {
                    value: 'necklaces',
                    label: 'گردن بند',
                    children: [
                        {
                            value: 'necklaces_soft',
                            label: 'گردن بند نرم',
                        },
                        {
                            value: 'necklaces_hard',
                            label: 'گردن بند سخت',
                        },
                    ]
                }
            ],
        },
        {
            value: 'calender_box',
            label: 'تقویم - جعبه',
            children: [
                {
                    value: 'reminder',
                    label: 'یادآور',
                },
                {
                    value: 'box',
                    label: 'جعبه',
                },
            ]
        },
        {
            value: 'dropper',
            label: 'قطره چکان',
            children: [
                {
                    value: 'dropper',
                    label: 'قطره چکان',
                },
            ]
        },
        {
            value: 'inflatable',
            label: 'بادکش',
            children: [
                {
                    value: 'ballon_device',
                    label: 'دستگاه',
                },
                {
                    value: 'glass',
                    label: 'لیوان',
                },
            ]
        },
        {
            value: 'medical_rest',
            label: 'استراحت طبی',
            children: [
                {
                    value: 'mathress',
                    label: 'تشک',
                },
                {
                    value: 'patoo',
                    label: 'پتو',
                },
                {
                    value: 'chair',
                    label: 'صندلی',
                },
                {
                    value: 'pillow',
                    label: 'بالشت',
                },
                {
                    value: 'blindfold',
                    label: 'چشم بند',
                },
                {
                    value: 'spa_bag',
                    label: 'کیف آب گرم',
                }
            ]
        },
        {
            value: 'air_conditioner',
            label: 'تصفیه',
            children: [
                {
                    value: 'air',
                    label: 'تصفیه هوا',
                },
                {
                    value: 'watter',
                    label: 'تصویه آب',
                },
                {
                    value: 'filter',
                    label: 'فیلتر',
                },
                {
                    value: 'anti_door',
                    label: 'بوگیر',
                },
            ]
        },
        {
            value: 'disinfection',
            label: 'ضدعفونی',
            children: [
                {
                    value: 'device',
                    label: 'دستگاه',
                },
                {
                    value: 'spary',
                    label: 'اسپری',
                },
                {
                    value: 'solution',
                    label: 'محلول',
                },
                {
                    value: 'gel',
                    label: 'ژل',
                },
                {
                    value: 'pad',
                    label: 'پد الکل',
                },
            ]
        },
        {
            value: 'adhesive',
            label: 'چسب - پد - ژل',
            children: [
                {
                    value: 'pad',
                    label: 'پد',
                },
                {
                    value: 'adhesive',
                    label: 'چسب',
                },
                {
                    value: 'gel',
                    label: 'ژل',
                },
                {
                    value: 'gas',
                    label: 'گاز',
                },
                {
                    value: 'band',
                    label: 'باند',
                },
            ]
        },
        {
            value: 'tool',
            label: 'ابزار',
            children: [
                {
                    value: 'cane',
                    label: 'عصا',
                },
                {
                    value: 'chair',
                    label: 'صندلی',
                },
                {
                    value: 'container',
                    label: 'ظرف',
                },
                {
                    value: 'toilet',
                    label: 'توالت',
                },
                {
                    value: 'handle',
                    label: 'دستگیره',
                },
                {
                    value: 'test',
                    label: 'تست',
                },
                {
                    value: 'earning',
                    label: 'گوشواره',
                },
                {
                    value: 'box',
                    label: 'جعبه کمک اولیه',
                },
            ]
        },
        {
            value: 'gloves',
            label: 'دستکش',
            children: [
                {
                    value: 'surgery',
                    label: 'جراحی',
                },
                {
                    value: 'latex',
                    label: 'لاتکس',
                },
                {
                    value: 'vinyl',
                    label: 'وینیل',
                },
                {
                    value: 'nitrile',
                    label: 'نیتریل',
                }
            ]
        },
        {
            value: 'barometer',
            label: 'فشارسنج',
            children: [
                {
                    value: 'arm',
                    label: 'بازویی',
                },
                {
                    value: 'wrist',
                    label: 'مچی',
                },
                {
                    value: 'scarf',
                    label: 'عفربه ای',
                },
                {
                    value: 'mercury',
                    label: 'جیوه ای',
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
              label="نوع لوازم پزشکی"
          >
              <Cascader popupClassName="casCader"
                  popupPlacement={"bottomLeft"}
                  suffixIcon={<ArrowRightOutlined />}
                  expandIcon={<ArrowRightOutlined />}
                  placeholder="نوع لوازم پزشکی"
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

export default connect(mapStateToProps , mapDispatchToProps)(Shop_Pharmacy_Medical_Equipment_Form);
