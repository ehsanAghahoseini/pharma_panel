import React from 'react';
import Filter from '../widget/Filter';


const DescriptionItem = ({title, content}) => (
    <div className="ProductDetailsDescribeDiv">
        <div className="ProductDetailsDescribeLabel">{title} : </div>
        <div className="ProductDetailsDescribecontent">{content}</div>
    </div>
);

const Demand = (props) => {
  // return <DescriptionItem title="تست" content={props.data.time} />
    switch (props.data.demand) {
      case "responsible" :
          return <><DescriptionItem title={"نوع استخدام"} content="مسئول فنی"/></>
      case "founder" :
          return <><DescriptionItem title={"نوع استخدام"} content="مؤسس"/></>
      case "all" :
          return <><DescriptionItem title={"نوع استخدام"} content="همه موارد"/></>
      case "normal" :
          return <><DescriptionItem title={"نوع استخدام"} content="عادی"/></>
      case "dentistry" :
          return <><DescriptionItem title={"نوع استخدام"} content="دندانپزشکی"/></>
      case "ophthalmology" :
          return <><DescriptionItem title={"نوع استخدام"} content="چشم پزشکی"/></>
      case "medicinal" :
          return <><DescriptionItem title={"نوع استخدام"} content="شرکت دارویی"/></>
      case "cosmetic" :
          return <><DescriptionItem title={"نوع استخدام"} content="شرکت آرایشی بهداشتی"/></>
      case "skin" :
          return <><DescriptionItem title={"نوع استخدام"} content="پوست و مو"/></>
      case "scientific" :
          return <><DescriptionItem title={"نوع استخدام"} content="نماینده علمی"/></>
      default:
          return ""
  }
} 


const License = (props) => {
    switch (props.data.license) {
      case "permanent" :
          return <><DescriptionItem title={"نوع پروانه"} content="دائمی"/></>
      case "temporary" :
          return <><DescriptionItem title={"نوع پروانه"} content="موقت"/></>
      case "student" :
          return <><DescriptionItem title={"نوع پروانه"} content="دانشجوی سال آخر"/></>
      default:
          return ""
  }
} 


const Shift = (props) => {
  switch (props.data.shift)  {
    case "morning" :
        return <><DescriptionItem title={"نوع شیفت"} content="صبح"/></>
    case "evening" :
        return <><DescriptionItem title={"نوع شیفت"} content="عصر"/></>
    case "night" :
        return <><DescriptionItem title={"نوع شیفت"} content="شب"/></>
    case "all" :
        return <><DescriptionItem title={"نوع شیفت"} content="تمام وقت"/></>
    default:
        return ""
  }
} 


const Document = (props) => {
  switch (props.data.document)  {
    case "true" :
        return <><DescriptionItem title={"مدرک"} content="نیاز است"/></>
    case "false" :
        return <><DescriptionItem title={"مدرک"} content="نیاز نیست"/></>
    default:
        return ""
    }
} 

const Work_type = (props) => {
  switch (props.data.work_type)  {
    case "daily" :
        return <><DescriptionItem title={"نوع داروخانه"} content="روزانه"/></>
    case "partly" :
        return <><DescriptionItem title={"نوع داروخانه"} content="پاره وقت"/></>
    case "hostelry" :
        return <><DescriptionItem title={"نوع داروخانه"} content="شبانه روزی"/></>
    default:
        return ""
  }
} 


const Pharmacy_experience = (props) => {
  switch (props.data.pharmacy_experience)  {
    case "true" :
        return <><DescriptionItem title={"سابقه کاربری"} content="دارد"/></>
    case "false" :
        return <><DescriptionItem title={"سابقه کاربری"} content="ندارد"/></>
    default:
        return "";
  }
} 


const Storage = (props) => {
  switch (props.data.storage) {
    case "true" :
        return <><DescriptionItem title={" انبار"} content="دارد"/></>
    case "false" :
        return <><DescriptionItem title={" انبار"} content="ندارد"/></>
    default:
        return "";
  }
} 

const Corner = (props) => {
  switch (props.data.corner)  {
      case "zero" :
          return <><DescriptionItem title={" موقعیت"} content="ندارد"/></>
      case "tow" :
          return <><DescriptionItem title={" موقعیت"} content="یک نبش"/></>
      case "three" :
          return <><DescriptionItem title={" موقعیت"} content="دو نبش"/></>
      case "one" :
          return <><DescriptionItem title={" موقعیت"} content="سه نبش"/></>
      default:
          return "";
  }
}
const Street = (props) => {
  switch (props.data.street)  {
      case "main" :
          return <><DescriptionItem title={" خیابان "} content="اصلی"/></>
      case "subsidiary" :
          return <><DescriptionItem title={" خیابان "} content="فرعی"/></>
      default:
          return "";
  }
}
const Water = (props) => {
  switch (props.data.water)  {
      case "true" :
          return <><DescriptionItem title={" اشتراک آب "} content="دارد"/></>
      case "false" :
          return <><DescriptionItem title={"  اشتراک آب "} content="ندارد"/></>
      default:
          return "";
  }
}
const Power = (props) => {
  switch (props.data.power)  {
      case "true" :
          return <><DescriptionItem title={"اشتراک برق"} content="دارد"/></>
      case "false" :
          return <><DescriptionItem title={"اشتراک برق"} content="ندارد"/></>
      default:
          return "";
  }
}
const Gas = (props) => {
  switch (props.data.gas)  {
      case "true" :
          return <><DescriptionItem title={"اشتراک گاز"} content="دارد"/></>
      case "false" :
          return <><DescriptionItem title={"اشتراک گاز"} content="ندارد"/></>
      default:
          return "";
  }
}
const Phone_line = (props) => {
  switch (props.data.phone_line)  {
      case "true" :
          return <><DescriptionItem title={"اشتراک تلفن"} content="دارد"/></>
      case "false" :
          return <><DescriptionItem title={"اشتراک تلفن"} content="ندارد"/></>
      default:
          return "";
  }
}
const Stair = (props) => {
  switch (props.data.stair)  {
      case "true" :
          return <><DescriptionItem title={"پله"} content="دارد"/></>
      case "false" :
          return <><DescriptionItem title={"پله"} content="ندارد"/></>
      default:
          return "";
  }
}
const Elevator = (props) => {
  switch (props.data.elevator)  {
      case "true" :
          return <><DescriptionItem title={"آسانسور"} content="دارد"/></>
      case "false" :
          return <><DescriptionItem title={"آسانسور"} content="ندارد"/></>
      default:
          return "";
  }
}
const Internet = (props) => {
  switch (props.data.internet)  {
      case "true" :
          return <><DescriptionItem title={"اشتراک اینترنت"} content="دارد"/></>
      case "false" :
          return <><DescriptionItem title={"اشتراک اینترنت"} content="ندارد"/></>
      default:
          return "";
  }
}
const Clinic_experience = (props) => {
  switch (props.data.clinic_experience)  {
      case "true" :
          return <><DescriptionItem title={"سابقه کاربری مطب"} content="دارد"/></>
      case "false" :
          return <><DescriptionItem title={"سابقه کاربری مطب"} content="ندارد"/></>
      default:
          return "";
  }
}
const Floor = (props) => {
  switch (props.data.floor)  {
      case "0" :
          return <><DescriptionItem title={" موقعیت"} content="همکف"/></>
      case "1" :
          return <><DescriptionItem title={" موقعیت"} content="طبقه اول"/></>
      case "2" :
          return <><DescriptionItem title={" موقعیت"} content="طبقه دوم "/></>
      case "3" :
          return <><DescriptionItem title={" موقعیت"} content="طبقه سوم "/></>
      case "4" :
          return <><DescriptionItem title={" موقعیت"} content="بالاتر از سه طبقه"/></>
      default:
          return "";
  }
}
const Urgent_need = (props) => {
  switch (props.data.urgent_need)  {
      case "true" :
          return <><DescriptionItem title={"نیازمندی فوری"} content="دارد"/></>
      case "false" :
          return <><DescriptionItem title={"نیازمندی فوری"} content="ندارد"/></>
      default:
          return "";
  }
}
const Prescription = (props) => {
  switch (props.data.prescription)  {
      case "true" :
          return <><DescriptionItem title={"نسخه"} content="دارم"/></>
      case "false" :
          return <><DescriptionItem title={"نسخه"} content="ندارم"/></>
      default:
          return "";
  }
}




export default {
  Demand,
  License,
  Shift,
  Document,
  Work_type,
  Pharmacy_experience,
  Storage,
  Corner,
  Street,
  Water,
  Power,
  Gas,
  Phone_line,
  Stair,
  Elevator,
  Internet,
  Clinic_experience,
  Floor,
  Urgent_need,
  Prescription
};
