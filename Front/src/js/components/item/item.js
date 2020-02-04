import NumResolver from "@class/resolver/NumericResolver"

export default {
    
    template: `<div>
                    <div class="represntative"
                         @click="move_to">
                        <img :src="item.url">
                        <div class="sale_rate"
                             v-if="sale">
                            <span> {{ item.sale_rate + ' %' }} </span>
                        </div>
                        <div class="new_rate"
                             v-if="item.new_rate!=0">
                            <span> new </span>
                        </div>
                        <div class="like_btn"></div>
                    </div>
                    <div class="product_name"> {{ item.product_name }} </div>
                    <div class="style"> {{ style }} </div>
                    <div class="price">
                        <span class="raw"> 
                            <span>{{ item.price }}</span>
                            <span class="unit"> 원 </span> 
                        </span>
                        <span class="not_raw"> {{ saled_price }} </span>
                        <slot name="like"></slot>
                    </div>
               </div>`,

    props: {

        item: {
            
        },

        sale: {
            default : false
        }

    },

    data(){
        return {

        }
    },

    computed: {

        style(){
            return `[${this.item.style_main}] ${this.item.style_time}`
        },

        saled_price(){
            let price_rate = (100-NumResolver.to_num(this.item.sale_rate))/100
            let item_price = NumResolver.to_num(this.item.price)
            
            return NumResolver.to_won( price_rate * item_price )
        }
        
        
    },

    methods: {
        move_to(){
            
        }
    }
    

}
