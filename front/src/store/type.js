
function Mut(mutation){
    return `mutation/${mutation}`
}
function Act(action){
    return `action/${action}`
}


const Action = {
    FetchRefinedDates : Act("fetch_refined_list"),
    ConfirmStartDate : Act("confirm_start_date"),
    ConfirmEndDate : Act("confirm_end_date")    
}

const Mutation = {
    FetchRefinedDates : Mut("fetch_refined_list"),
    ConfirmStartDate : Mut("mutation/confirm_start_date"),
    ConfirmEndDate : Mut("mutation/confirm_end_date")
}

export { Action, Mutation } 