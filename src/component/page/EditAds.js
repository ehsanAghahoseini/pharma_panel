import React from 'react';
import { Button } from 'antd';
import {connect} from "react-redux";
import {StepState} from '../../action/AddAdsAction';
import $ from 'jquery';


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
import Government_Assignment_Form from '../widget/FormStep/AddForm/Government_Assignment_Form';
import Therapeutic_Office_Form from '../widget/FormStep/AddForm/Therapeutic_Office_Form';
import Pharmacy_Trainee_Form from '../widget/FormStep/AddForm/Pharmacy_Trainee_Form';
import Private_Applicant_Form from '../widget/FormStep/AddForm/Private_Applicant_Form';
import Therapeutic_Pharmacy_Form from '../widget/FormStep/AddForm/Therapeutic_Pharmacy_Form';



class EditAds extends React.Component {

  state = {
    visibleAds:false,
    display:false,
    detailAds : "",
  }


  componentDidMount() {
    this.setState({display:true});
    $.ajax({
      url: 'https://newreza.ir/agahi_farma/php/get_ad_detail.php',
      type: 'post',
      dataType: 'json',
      data: JSON.stringify({
        "ad_id": this.props.match.params.id,
      }),
      success: (res) =>  {
        if(res.result == 'ok'){
          console.log(res.type);
          this.setState({
            display:false ,
            detailAds : res,
          });
        }else {
          this.setState({display : false});
          alert("دوباره تلاش کنید")
        }

      },
      error:  () => {
        this.setState({ display:false })
          alert("عدم برقراری ارتباط با سرور")
      },
  });
  }


  render() {
    return (
      <>
      <div className="button-cat-section">

        {/* Form Componrnt For pharmaceutical_needs دارو - کالایاب */}
        {this.state.detailAds.type == 'needs_product' && <Pharmaceutical_kala_Form data={this.state.detailAds}/>}
        {this.state.detailAds.type == 'needs_medication' && <Pharmaceutical_Medicine_Form  data={this.state.detailAds}/>}


        {/* Form Componrnt For job_search  کاریابی */}
        {this.state.detailAds.type == 'placement_responsible' && <Technical_Assistant_Form  data={this.state.detailAds}/>}
        {this.state.detailAds.type == 'placement_technician' && <Pharmaceutical_Technician_Form  data={this.state.detailAds}/>}
        {this.state.detailAds.type == 'placement_intern' && <Internship_Form  data={this.state.detailAds}/>}
        {this.state.detailAds.type == 'placement_secretary' && <Physician_Secretary_Form  data={this.state.detailAds}/>}
        {this.state.detailAds.type == 'placement_seller' && <Seller_Form  data={this.state.detailAds}/>}


        {/* Form Componrnt For recruitment  استخدام */}
        {this.state.detailAds.type == 'employment_responsible' && <Rec_Technical_Assistant_Form  data={this.state.detailAds}/>}
        {this.state.detailAds.type == 'employment_technician' && <Rec_Pharmaceutical_Technician_Form data={this.state.detailAds}/>}
        {this.state.detailAds.type == 'employment_intern' && <Rec_Internship_Form data={this.state.detailAds}/>}
        {this.state.detailAds.type == 'employment_secretary' && <Rec_Physician_Secretary_Form data={this.state.detailAds}/>}
        {this.state.detailAds.type == 'employment_seller' && <Rec_Seller_Form data={this.state.detailAds}/>}


        {/* Form Componrnt For assignment_pharmacy  واگذاری داروخانه */}
        {this.state.detailAds.type == 'pharmacy_private_assignment' && <Private_Assignment_Form data={this.state.detailAds}/>}
        {this.state.detailAds.type == 'pharmacy_governmental_assignment' && <Government_Assignment_Form data={this.state.detailAds}/>}
        {this.state.detailAds.type == 'pharmacy_private_applicant' && <Private_Applicant_Form data={this.state.detailAds}/>}


        {/* Form Componrnt For therapeutic_real_estate  املاک درمانی */}
        {this.state.detailAds.type == 'treatment_estates_pharmacy' && <Therapeutic_Pharmacy_Form data={this.state.detailAds}/>}
        {this.state.detailAds.type == 'treatment_estates_clinic' && <Therapeutic_Office_Form data={this.state.detailAds}/>}



        {/* Form Componrnt For education   آموزش */}
        {this.state.detailAds.type == 'education_intern' && <Pharmacy_Trainee_Form  data={this.state.detailAds}/>}








      </div> 
      </>
      
    );
  }
}



export default EditAds;


