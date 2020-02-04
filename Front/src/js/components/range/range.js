import "@babel/polyfill"
import "@/js/jquery"
//css
import "./range.scss"
//class
import NumResolver from "@class/resolver/NumericResolver"


export default {

    template: `
                <div class="range" ref="container"
                     @mousedown="sequence($event)"
                     @mousemove.capture.self="set_range($event)"
                     @mouseup="shutdown" @mouseleave="shutdown">
                    <div class="lower bar" ref="lower"
                         :style="{ width:lower_width }"
                         @mousemove.capture.self="set_range($event)">
                        <div class="pointer" :class="{ active:lower_active }"
                             @mousedown.self.stop="activate('lower')"></div>
                    </div>
                    <div class="upper bar" ref="upper"
                         :style="{ width:upper_width }"
                         @mousemove.capture.self="set_range($event)">
                        <div class="pointer" :class="{ active:upper_active }"
                             @mousedown.self.stop="activate('upper')"></div>
                    </div>
                    <div class="base bar"
                         @mousemove.capture.self="set_range($event)"></div>
                    
                    <div class="min"
                         v-if="min"> {{ min }} </div>
                    <div class="max"
                         v-if="max"> {{ max }} </div>

                    <div class="audience"
                         v-if="audience">
                        <span> {{ lower_value }} </span>
                        <span> ~ </span>
                        <span> {{ upper_value }} </span>
                    </div>
                </div>            
              `
    ,

    props: {
        min:{
            default: 0
        },
        max:{
            default: 0
        },
        step:{
            default: 0
        },

        audience:{
            default: false
        },

        detector:{
            default: false
        },
        name:{
            default: ""
        }
    },

    data(){

        return {
            lower_active: false,
            upper_active: false,

            lower_abs: 100,
            upper_abs: 200,

            container_abs: 0            
        }
    },

    watch:{
        lower_abs(n,o){
            if(n>=this.upper_abs){
                this.lower_abs = o
            }else{
                return
            }
        },
        upper_abs(n,o){
            if(n<this.lower_abs){
                this.upper_abs = o
            }else{
                return
            }
        },

        detector(flag){
            if(flag){
                console.log(this.name)
                setTimeout(()=>this.$emit('register',{ key: this.name, value: [this.lower_value,this.upper_value] }),0)
            }
        }
    },

    computed: {
        lower_width(){
            return this.lower_abs/this.container_abs*100+"%"
        },
        upper_width(){
            return this.upper_abs/this.container_abs*100+"%"
        },

        lower_value(){
            let value = Math.round((this.max-this.min)*Number.parseFloat(this.lower_abs/this.container_abs*100)/100)+this.min
            this.$emit("push",value)
            return value
        },
        upper_value(){
            let value = Math.round((this.max-this.min)*Number.parseFloat(this.upper_abs/this.container_abs*100)/100)+this.min
            this.$emit("shift",value)
            return value
        },

        step_unit(){
            return this.container_abs/Math.floor((this.max-this.min)/this.step)
        }
    },

    methods: {
        activate(type,event){
            if(!type){
                let lower_offset = Math.abs(this.lower_abs-event.offsetX)
                let upper_offset = Math.abs(this.upper_abs-event.offsetX)
                if(lower_offset<upper_offset){
                    this.lower_active = true
                }else{
                    this.upper_active = true
                }
            }else{
                switch(type){
                    case "lower": this.lower_active = true;break
                    case "upper": this.upper_active = true;break
                }
            }
        },
        shutdown(){
            Object.keys(this.$data).forEach(key=>{
                if(key.endsWith("active"))this.$data[key]=false
            })
        },

        set_range(event){
            if(this.step){

                if(this.lower_active){
                    let gap = Math.abs(event.offsetX - this.lower_abs)%this.step_unit
                    if(event.offsetX<this.lower_abs){
                        this.lower_abs = (gap<=this.step_unit/2)?this.lower_abs:this.lower_abs-this.step_unit
                    }else{
                        this.lower_abs = (gap<=this.step_unit/2)?this.lower_abs:this.lower_abs+this.step_unit
                    }
                }else if(this.upper_active){
                    let gap = Math.abs(event.offsetX - this.upper_abs)%this.step_unit
                    if(event.offsetX<this.upper_abs){
                        this.upper_abs = (gap<=this.step_unit/2)?this.upper_abs:this.upper_abs-this.step_unit
                    }else{
                        this.upper_abs = (gap<=this.step_unit/2)?this.upper_abs:this.upper_abs+this.step_unit
                    }
                }

            }else{
                if(this.lower_active){
                    this.lower_abs = event.offsetX
                }else if(this.upper_active){
                    this.upper_abs = event.offsetX
                }
            }
        },

        sequence(event){
            this.activate(null,event)
            this.set_range(event)
        }
    },

    created(){
        
    },

    mounted(){
        //container init
        this.container_abs = this.$refs.container.offsetWidth
        //scope init
        if(this.step){
            this.lower_abs = this.step_unit*1
            this.upper_abs = this.step_unit*2
        }else{
            this.lower_abs = 20
            this.upper_abs = 100
        }
        
    }

}