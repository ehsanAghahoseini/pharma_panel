function AddAdsReducer(state = {step : "first"}, action) {
    switch (action.type) {
        case 'Step_Loader' :
            return {
                ...state,
                step: action.payload,   
            };   
        default:
            return state
    }
}
export default AddAdsReducer;
