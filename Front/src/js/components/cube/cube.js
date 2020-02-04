import "./cube.scss"

export default {

    template: `
                <div class="cube" :class="{ active:is_king }"
                     :style="{ width:width, paddingBottom:height }"
                     @click="toggle">
                    <span> {{ spec }} </span>
                </div>
              `,
    
    props: {
        width: {
            defalut: "10%"
        },
        height: {
            default: 10/2.5+"%"
        },
        spec:{
            default: 0
        },

        king:{
            default: ""
        }
    },

    data(){
        return {}
    },

    computed:{
        is_king(){
            return this.king == this.spec
        }
    },

    methods:{
        toggle(){
            if(this.is_king){
                //this.$emit('remove')
            }else{
                this.$emit('remove')
                this.$emit('add',this.spec)
            }
        }
    }

}