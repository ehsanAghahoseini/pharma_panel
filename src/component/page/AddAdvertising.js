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

import Pharmaceutical_kala_Form from '../widget/FormStep/AddForm/Pharmaceutical_kala_Form';
import Pharmaceutical_Medicine_Form from '../widget/FormStep/AddForm/Pharmaceutical_Medicine_Form';
import Technical_Assistant_Form from '../widget/FormStep/AddForm/Technical_Assistant_Form';
import Pharmaceutical_Technician_Form from '../widget/FormStep/AddForm/Pharmaceutical_Technician_Form';
import Internship_Form from '../widget/FormStep/AddForm/Internship_Form';
import Physician_Secretary_Form from '../widget/FormStep/AddForm/Physician_Secretary_Form';
import Seller_Form from '../widget/FormStep/AddForm/Seller_Form';
import Rec_Technical_Assistant_Form from '../widget/FormStep/AddForm/Rec_Technical_Assistant_Form';
import Rec_Pharmaceutical_Technician_Form from '../widget/FormStep/AddForm/Rec_Pharmaceutical_Technician_Form';
import Rec_Internship_Form from '../widget/FormStep/AddForm/Rec_Internship_Form';
import Rec_Physician_Secretary_Form from '../widget/FormStep/AddForm/Rec_Physician_Secretary_Form';
import Rec_Seller_Form from '../widget/FormStep/AddForm/Rec_Seller_Form';
import Private_Assignment_Form from '../widget/FormStep/AddForm/Private_Assignment_Form';

import Shop_Cosmetic_Form from '../widget/FormStep/AddForm/Shop_Cosmetic_Form';
import Shop_Health_Form from '../widget/FormStep/AddForm/Shop_Health_Form';
import Shop_Perfume_Form from '../widget/FormStep/AddForm/Shop_Perfume_Form';
import Shop_Pharmacy_Medical_Equipment_Form from '../widget/FormStep/AddForm/Shop_Cosmetic_Form';
import Shop_Complement_Form from '../widget/FormStep/AddForm/Shop_Complement_Form';

class AddAdvertising extends React.Component {


  render() {
    return (
      <>
      <div className="button-cat-section">
          {this.props.Displaystep === 'first' ? 
            <div className="group-button">
              <Button onClick={()=>{this.props.StepState('shopstep')}}>فروشگاه </Button>
              {/* <Button onClick={()=>{this.props.StepState('mestep')}}>من / ثبت آگهی</Button> */}
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
        {this.props.Displaystep === 'pharmaceutical_kala' ? <Pharmaceutical_kala_Form/>: null}
        {this.props.Displaystep === 'pharmaceutical_medicine' ? <Pharmaceutical_Medicine_Form/>: null}

        {/* Form Componrnt For job_search  کاریابی */}
        {this.props.Displaystep === 'technical_assistant' ? <Technical_Assistant_Form/>: null}
        {this.props.Displaystep === 'pharmaceutical_technician' ? <Pharmaceutical_Technician_Form/>: null}
        {this.props.Displaystep === 'internship' ? <Internship_Form/>: null}
        {this.props.Displaystep === 'physician_secretary' ? <Physician_Secretary_Form/>: null}
        {this.props.Displaystep === 'seller' ? <Seller_Form/>: null}


        {/* Form Componrnt For recruitment  استخدام */}
        {this.props.Displaystep === 'rec_technical_assistant' ? <Rec_Technical_Assistant_Form/>: null}
        {this.props.Displaystep === 'rec_pharmaceutical_technician' ? <Rec_Pharmaceutical_Technician_Form/>: null}
        {this.props.Displaystep === 'rec_internship' ? <Rec_Internship_Form/>: null}
        {this.props.Displaystep === 'rec_physician_secretary' ? <Rec_Physician_Secretary_Form/>: null}
        {this.props.Displaystep === 'rec_seller' ? <Rec_Seller_Form/>: null}


        {/* Form Componrnt For assignment_pharmacy  واگذاری داروخانه */}
        {this.props.Displaystep === 'private_assignment' ? <Private_Assignment_Form/>: null}
        {this.props.Displaystep === 'government_assignment' ? <span>فرم واگذاری دولتی</span>: null}
        {this.props.Displaystep === 'private_applicant' ? <span>فرم  متقاضی خصوصی</span>: null}


        {/* Form Componrnt For therapeutic_real_estate  املاک درمانی */}
        {this.props.Displaystep === 'therapeutic_pharmacy' ? <span>فرم  املاک درمانی داروخانه</span>: null}
        {this.props.Displaystep === 'therapeutic_office' ? <span>فرم  املاک درمانی مطب</span>: null}


        {/* Form Componrnt For education   آموزش */}
        {this.props.Displaystep === 'pharmacy_trainee' ? <span>فرم کارآموزش داروخانه</span>: null}


        {/* Form Componrnt For shop_pharmacy   فروشگاه داروخانه */}
        {this.props.Displaystep === 'shop_cosmetic' ? <Shop_Cosmetic_Form/>: null}
        {this.props.Displaystep === 'shop_health' ? <Shop_Health_Form/>: null}
        {this.props.Displaystep === 'shop_perfume' ? <Shop_Perfume_Form/>: null}
        {this.props.Displaystep === 'shop_pharmacy_medical_equipment' ? <Shop_Pharmacy_Medical_Equipment_Form/>: null}
        {this.props.Displaystep === 'shop_complement' ? <Shop_Complement_Form/>: null}







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


