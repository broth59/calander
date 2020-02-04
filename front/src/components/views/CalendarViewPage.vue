<template>
    <div id="page">
        <calander-input id="calander_start" class="input"/>
        <calander-input id="calander_end" class="input"/>
        <dates-table id="dates_table"/>
        <div id="blank_space">
            <div id="trans_btn"></div>
        </div>
        <calendar id="calendar"/>
    </div>
</template>

<script>
import CalendarInput from "@compo/CalendarInput"
import Calendar from "@compo/Calendar"
import DatesTable from "@compo/DatesTable"

import DateComparator from "@class/DateComparator"


export default {
    components: {
        CalendarInput,
        Calendar,
        DatesTable
    },

    data: {
        startDate: "",
        endDate: ""
    },

    computed: {
        isLower(){
            const startDate = this.startDate
            return (date)=>DateComparator.isLower(date, startDate)
        },
        isHigher(){
            const endDate = this.endDate
            return (date)=>!DateComparator.isLower(date, endDate)
        }
    },

    methods: {
        
    }

}
</script>

<style lang="scss" scoped>
    
#page{
    display: grid;

    width: 80%;
    height: 80%;

    grid-template-rows: repeat(10, 10%);
    grid-template-columns: repeat(10, 10%);
    
    border: 2px solid black;
    
    //calander input
    .input{
        grid-row: 1 / 3;
        
        border: 1px solid red;
    }
    #calander_start{
        grid-column: 1 / 6; 
    }
    #calander_end{
        grid-column: 6 / 11;
    }

    //dates-table 
    #dates_table{
        grid-area: 3 / 1 / 11 / 6;
    
        border: 1px solid black;
    }

    //blank_space
    #blank_space{
        grid-area: 3 / 6 / 11 / 7;
    }

    //calendar
    #calendar{
        grid-area: 3 / 7 / 11 / 11;
    
        border: 1px solid blue;
    }
}

</style>>
