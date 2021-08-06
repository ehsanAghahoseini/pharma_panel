import React from 'react';
import { Button } from 'antd';
import {connect} from "react-redux";
import {StepState} from '../../action/AddAdsAction';

// Import Step Category

import ShopStep from '../widget/FormStep/ShopStep';
import MeStep from '../widget/FormStep/MeStep';
import JobSearchStep from '../widget/FormStep/JobSearchStep';
import RecruitmentStep from '../widget/FormStep/RecruitmentStep';
import AssignmentPharmacyStep from '../widget/FormStep/AssignmentPharmacyStep';
import TherapeuticRealestateStep from '../widget/FormStep/TherapeuticRealestateStep';
import PharmaceuticalNeedsStep from '../widget/FormStep/PharmaceuticalNeedsStep';
import EducationStep from '../widget/FormStep/EducationStep';
import MedicalEquipmentStep from '../widget/FormStep/MedicalEquipmentStep';
import ShopPharmacyStep from '../widget/FormStep/ShopPharmacyStep';

// Import Form Add Ads

import MeTechnicalAssistantForm from '../widget/FormStep/AddForm/MeTechnicalAssistantForm';

class AddAdvertising extends React.Component {


  render() {
    return (
      <>
      <div className="button-cat-section">
          {this.props.Displaystep === 'first' ? 
            <div className="group-button">
              <Button onClick={()=>{this.props.StepState('shopstep')}}>فروشگاه / ثبت نام</Button>
              <Button onClick={()=>{this.props.StepState('mestep')}}>من / ثبت آگهی</Button>
            </div>
          : null}
          {this.props.Displaystep === 'shopstep' ? <ShopStep/>: null}
          {this.props.Displaystep === 'mestep' ? <MeStep/> : null}
          {this.props.Displaystep === 'job_search' ? <JobSearchStep/> : null}
          {this.props.Displaystep === 'recruitment' ? <RecruitmentStep/> : null}
          {this.props.Displaystep === 'assignment_pharmacy' ? <AssignmentPharmacyStep/> : null}
          {this.props.Displaystep === 'therapeutic_real_estate' ? <TherapeuticRealestateStep/> : null}
          {this.props.Displaystep === 'pharmaceutical_needs' ? <PharmaceuticalNeedsStep/> : null}
          {this.props.Displaystep === 'education' ? <EducationStep/> : null}
          {this.props.Displaystep === 'shop_medical_equipment' ? <MedicalEquipmentStep/> : null}
          {this.props.Displaystep === 'shop_pharmacy' ? <ShopPharmacyStep/> : null}


        {/* Form Componrnt For pharmaceutical_needs دارو - کالایاب */}
        {this.props.Displaystep === 'pharmaceutical_kala' ? <span>فرم کالا</span>: null}
        {this.props.Displaystep === 'pharmaceutical_medicine' ? <span>فرم دارو</span>: null}

        {/* Form Componrnt For job_search  کاریابی */}
        {this.props.Displaystep === 'technical_assistant' ? <span>فرم کاریابی مسئول فنی</span>: null}
        {this.props.Displaystep === 'pharmaceutical_technician' ? <span>فرم کاریابی تکنسین دارویی</span>: null}
        {this.props.Displaystep === 'internship' ? <span>فرم کاریابی کارآموز</span>: null}
        {this.props.Displaystep === 'physician_secretary' ? <span>فرم کاریابی منشی پزشک</span>: null}
        {this.props.Displaystep === 'seller' ? <span>فرم کاریابی فروشنده</span>: null}


        {/* Form Componrnt For recruitment  استخدام */}
        {this.props.Displaystep === 'rec_technical_assistant' ? <span>فرم استخدام مسئول فنی</span>: null}
        {this.props.Displaystep === 'rec_pharmaceutical_technician' ? <span>فرم استخدام تکنسین دارویی</span>: null}
        {this.props.Displaystep === 'rec_internship' ? <span>فرم استخدام کارآموز</span>: null}
        {this.props.Displaystep === 'rec_physician_secretary' ? <span>فرم استخدام منشی پزشک</span>: null}
        {this.props.Displaystep === 'rec_seller' ? <span>فرم استخدام فروشنده</span>: null}


        {/* Form Componrnt For assignment_pharmacy  واگذاری داروخانه */}
        {this.props.Displaystep === 'private_assignment' ? <span>فرم واگذاری خصوصی</span>: null}
        {this.props.Displaystep === 'government_assignment' ? <span>فرم واگذاری دولتی</span>: null}
        {this.props.Displaystep === 'private_applicant' ? <span>فرم  متقاضی خصوصی</span>: null}


        {/* Form Componrnt For therapeutic_real_estate  املاک درمانی */}
        {this.props.Displaystep === 'therapeutic_pharmacy' ? <span>فرم  املاک درمانی داروخانه</span>: null}
        {this.props.Displaystep === 'therapeutic_office' ? <span>فرم  املاک درمانی مطب</span>: null}


        {/* Form Componrnt For education   آموزش */}
        {this.props.Displaystep === 'pharmacy_trainee' ? <span>فرم کارآموزش داروخانه</span>: null}


        {/* Form Componrnt For shop_pharmacy   فروشگاه داروخانه */}
        {this.props.Displaystep === 'shop_cosmetic' ? <span>فرم  آرایشی</span>: null}
        {this.props.Displaystep === 'shop_health' ? <span>فرم  بهداشتی</span>: null}
        {this.props.Displaystep === 'shop_perfume' ? <span>فرم  عطر و ادکلن</span>: null}
        {this.props.Displaystep === 'shop_pharmacy_medical_equipment' ? <span>فرم  لوازم پزشکی</span>: null}
        {this.props.Displaystep === 'shop_complement' ? <span>فرم  مکمل</span>: null}







      </div> {/* End button-cat-section */}
      </>
      
    );
  }
}

const mapStateToProps = state => {
  return({
    Displaystep: state.step,
  })
}
const mapDispatchToProps = {StepState};

export default connect(mapStateToProps , mapDispatchToProps)(AddAdvertising);


