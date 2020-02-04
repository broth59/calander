export default class DateComparator{

    static monthesOfEng = ["January","Febrary","March","April","May",
                           "June","July","August","September","October","November", "December"]

    static isLower(date1, date2, seperator="/"){ 
        date1 = date1.split(seperator)
        date2 = date2.split(seperator)
        return new Date(date1[0], date1[1], date1[2]) <
               new Date(date2[0], date2[1], date2[2])
    } 

    static toDate(date, seperator="/"){
        date = date.split(seperator)
        return new Date(date[0], date[1], datep[2])
    }

    static monthAsString(month_order){
        return this.monthesOfEng[month_order]
    }

    static getLastDay(date){
        const year = date.getFullYear();
        const month = date.getMonth();
        
        let days = 31;
        if(month %2 == 0 && month == 0){
            return days;
        }else if(month == 1){
            days = 28
            if(year %4 == 0){
                days = 29
                if(year %100 == 0){
                    days = 28
                    if(year %400 == 0){
                        days = 29
                    }
                }
            }
            return days;
        }else{
            days = 30
            return days;
        }
    }
}