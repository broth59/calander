<template>
    <div id="calendar">
        <div id="header">
            <div id="rt_btn" class="btn"
                 v-if="!isFrom"></div>
            <div id="date_info"> 
                <span>{{ `${monthAsWord}  ${year}` }}</span> 
            </div>
            <div id="lt_btn" class="btn"
                 v-if="!isEdge"></div>
        </div>
        <div id="body">
            <div class="day deprecated" 
                 v-for="n in preBlanks" :key="n">
                <div class="day "></div>
            </div>
            <div class="day activated"
                 v-for="n in lastDate" :key="n"></div>
        </div>
    </div>
</template>

<script>
import DateComparator from "@class/DateComparator"

export default {
    props:{
        holidays: {
            type: Array,
            required: false,
            default(){
                return []
            } 
        }
    },

    data(){
        return {
            year: 0,
            month: 0,
            day: "",

            firstDayOfWeek: 0,
            lastDayOfWeek: 0
        }
    },

    computed:{
        hasHoliday(){
            return this.holidays.length!=0?true:false
        },

        isFrom(){
            const hasHoliday = this.holidays.length
            if(hasHoliday){
                const fromDay = DateComparator.toDate(this.holidays[0])
                return fromDay.getMonth() == this.month
                    && fromDay.getYaer() == this.year
            }else{
                return false
            }
        },

        isEdge(){
            const hasHoliday = this.holidays.length
            if(hasHoliday){
                const edgeDay = DateComparator.toDate(this.holidays[hasHoliday-1])
                return edgeDay.getMonth() == this.month
                    && edgeDay.getYaer() == this.year
            }else{
                return false
            }
        },

        monthAsWord(){
            const firstDayOfWeek = this.firstDayOfWeek
            this.firstDayOfWeek = this.lastDayOfWeek + 1
            this.lastDayOfWeek = firstDayOfWeek - 1
        
            return DateComparator.monthAsString(this.month)
        },

        preBlanks(){
            const hasHoliday = this.holidays.length
            return hasHoliday?DateComparator.toDate(this.holidays[0]).fromDay.getDate() + this.firstDayOfWeek
                             :this.firstDayOfWeek

        },

        lastDate(){
            const hasHoliday = this.holidays.length

            let lastDate;
            if(hasHoliday){
                const edgeDay = DateComparator.toDate(this.holidays[hasHoliday-1])
                if(edgeDay.getMonth() == this.month && edgeDay.getYaer() == this.year){
                    lastDate = edgeDay.getDate()
                }
            }else{
                lastDate = DateComparator.getLastDay(new Date(this.year, this.month))
            }
            return lastDate;
        }
        
    },

    methods:{
        
    },

    created(){
        const now= new Date();
        
        this.year = now.getFullYear()
        this.moth = now.getMonth()

        now.setDate(1);
        this.firstDayOfWeek = now.getDay()
        now.setDate(DateComparator.getLastDay(now))
        this.lastDayOfWeek = now.getDay()
        

    }
}
</script>

<style lang="scss" scoped>

@mixin background($path: ""){
    background-position: center center;
    background-size: 80% auto;
    background-repeat: no-repeat;

    background-image: url($path);
    @content;
}

@mixin flex_box($direction: row, $align: center, $justify: center){
    display: flex;
    flex-direction: $direction;
    align-items: $align;
    align-content: $align;
    justify-content: $justify;
}

#calendar{
    @include flex_box($direction: column);

    #header{
        @include flex_box();

        height: 15%;
        width: 100%;

        border: 1px solid red;
        border-radius: 10px;

        //버튼 
        .btn{
            width: 15%;
            padding-bottom: 10%;

            border: 1px solid red;

            &:hover{
                border: 3px dashed red;
            }
        }

        #rt_btn{
            @include background("../../assets/logo.png");
        }

        #lt_btn{
            @include background('../../assets/logo.png');
        }

        //날짜 월,년
        #date_info{
            @include flex_box();

            width: 75%;
            padding-bottom: 10%; 
            position:relative;

            span{
                position: absolute;
                top:50%;
                left:50%;

                transform: translate(-50%,-50%)
            }
            
        }
    }

    #body{
        display: flex;
        flex-wrap: wrap;

        width: 100%;
        height: auto;
        
        .day{
            width: 14%;
            padding-bottom: 14%;

            &.deprecated{

            }
            
            &.activated{
                background-color: red;
            }
        }
    }
}


</style>