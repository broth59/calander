import "./ability.scss"
import "@babel/polyfill"
import NumResolver from "@class/resolver/NumericResolver"

export default {
    
    template: `<div class="paper">
                    <canvas class="ability" ref="paper"
                        :width="xoffset" :height="yoffset">
                        최신 브라우저를 사용해주세요..
                    </canvas>
                    <!--<div class="dimension">
                     <div class="tag"
                          v-for="(keyword,idx) in keywords"
                          :style="{ top:top(idx), left:left(idx) }"> {{ keyword }} </div>
                    </div>-->
               </div>`,

    data(){
        return {
            paper: null,

            division: 0,
            limit: 150,

            asset: this.asset
        }
    },

    props: {
        xoffset:{
            default: 250
        },
        yoffset:{
            default: 250
        },

        phase:{
            default: 5,
            
        },

        asset:{
            required: true
        },
        keywords:{
            default: ()=>["a","b","c","d","e"]
        }
    },

    computed:{
        x_center(){
            return this.xoffset/2
        },
        y_center(){
            return this.yoffset/2
        },

        vertax(){
            return this.asset.length
        },
        radius(){
            return (this.xoffset<=this.yoffset)?this.xoffset/2*0.8:this.yoffset/2*0.8  
        },
        radius_a(){
            return (this.xoffset<=this.yoffset)?this.xoffset/2*0.9:this.yoffset/2*0.9  
        },
        angle(){
            return Math.PI*2/this.asset.length
        },

        top(){
            return function(idx){
               return Math.sin(this.radius*idx)*this.radius/this.radius*100/2+"%"
            }
        },
        left(){
            return function(idx){
                return Math.cos(this.radius*idx)*this.radius/this.radius*100/2+"%"
            }
        },
        middle(){
            let middle_list = []
            if(this.keywords.length%2==0){
                middle_list.push(this.keywords.length/2-1)
                middle_list.push(this.keywords.length/2)
            }else{
                middle_list.push(Math.floor(this.keywords.length/2))
                middle_list.push(Math.floor(this.keywords.length/2)+1)
            }
            return middle_list
        }
    },

    methods:{
        apply(styles){
            this.paper.save()
            Object.entries(styles).forEach(([key,value])=>{
                this.paper[key] = value
            })
        },

        polygon(radius,styles){
            this.apply(styles)
            this.paper.translate(this.x_center,this.y_center)
            this.paper.beginPath()
            this.paper.moveTo(0, -radius)
            for(let i = 0; i < this.vertax; i++){
                this.paper.rotate(this.angle)
                this.paper.lineTo(0, -radius)
            }
            this.paper.closePath()
            this.paper.stroke()
            this.paper.restore()
        },

        linear(styles){
            this.apply(styles)
            this.paper.translate(this.x_center,this.y_center)
            for(let i = 0; i < this.vertax; i++){
                this.paper.rotate(this.angle)
                this.paper.beginPath()
                this.paper.moveTo(0,0)
                this.paper.lineTo(0,-this.radius)
                this.paper.closePath()
                this.paper.stroke()
            }
            this.paper.restore()
        },

        text(styles){
            this.apply(styles)
            this.paper.translate(this.x_center,this.y_center)
            let width = 0
            let offset= 10
            for(let i = 0; i < this.vertax; i++){
                // console.log(Math.cos(this.radius_a*i-Math.PI*0.50)*this.radius_a*-1,
                //             Math.sin(this.radius_a*i-Math.PI*0.50)*this.radius_a)
                width = this.length(NumResolver.to_num(styles.font.split(" ")[0]),
                                    this.keywords[i])
                this.paper.fillText(this.keywords[i],           
                                    (i < Math.ceil(this.keywords.length/2))
                                        ?(i>0)
                                            ?Math.cos(this.radius_a*i-Math.PI*0.55)*this.radius_a*-1
                                            :Math.cos(this.radius_a*i-Math.PI*0.55)*this.radius_a*-1-width*0.9
                                        :Math.cos(this.radius_a*i-Math.PI*0.55)*this.radius_a*-1-width,
                                    (this.middle.some(mid=>(mid==i)?true:false))
                                        ?Math.sin(this.radius_a*i-Math.PI*0.55)*this.radius_a+offset
                                        :Math.sin(this.radius_a*i-Math.PI*0.55)*this.radius_a) 
            }
            this.paper.restore()
        },
        length(size,word){
            size = (typeof size == 'string')?Number.parseInt(size):size
            let length = 0
            Array.from(word).forEach(char=>(/\S/.test(char)?length+=size:length+=size*0.5))
            return length
        },

        set_ability(ability,styles){
            this.apply(styles)
            this.paper.translate(this.x_center,this.y_center)
            this.paper.beginPath()
            this.paper.moveTo(0,-ability[0]/100*this.radius)
            for(let i = 1; i < this.vertax; i++){
                this.paper.rotate(this.angle)
                this.paper.lineTo(0,-ability[i]/100*this.radius)
            } 
            this.paper.closePath()
            this.paper.fill()
            this.paper.stroke()
            
            this.paper.restore()
            this.paper.save()
            this.paper.translate(this.x_center,this.y_center)
            this.paper.moveTo(0,-ability[0]/100*this.radius)
            for(let i = 0; i < this.vertax; i++){
                let size = 3
                this.paper.save()
                this.paper.fillStyle = '#FA7253'
                this.paper.beginPath()
                this.paper.arc(0, -ability[i]/100*this.radius, size, 0, Math.PI*2)
                this.paper.fill()
                //사각형 포인트용
                // this.paper.fillRect(size*-1,-ability[i]/100*this.radius-(size*1), size*2,size*2)
                // this.paper.fillStyle = '#FBE1DB'
                // this.paper.clearRect(size*-0.5,-ability[i]/100*this.radius-(size*0.5), size,size)
                // this.paper.fillRect(size*-0.5,-ability[i]/100*this.radius-(size*0.5), size,size)
                this.paper.restore()
                this.paper.rotate(this.angle)
            }
            this.paper.restore()
        },

        draw(init,growthes,limit){
            if(this.division<limit){

                this.paper.clearRect(0,0,this.xoffset,this.yoffset)
                this.paper.save()

                let styles = { lineWidth: '2', strokeStyle: '#ededed' }
                for(let i = 0; i < this.phase; i++){
                    this.polygon(this.radius/this.phase*(i+1), styles)
                }
                this.linear(styles)
                this.paper.save()
                if(this.division==0){
                    setTimeout(()=>{
                        this.set_ability(init,{ lineWidth: '2', 
                                                strokeStyle: '#FA7253',
                                                fillStyle: 'rgba(251, 225, 219, 0.5)'})
                        this.text({ font: "18px noto_san" , fillStyle: "#666" })
                        init = init.map((atom,idx)=>atom+growthes[idx])
                        this.division += 1
                        setTimeout(()=>this.draw(init,growthes,limit),0.01)
                    },1000)
                }else{
                    this.set_ability(init,{ lineWidth: '2', 
                                            strokeStyle: '#FA7253',
                                            fillStyle: 'rgba(251, 225, 219, 0.5)'})
                        this.text({ font: "18px noto_san" , fillStyle: "#666" })
                        init = init.map((atom,idx)=>atom+growthes[idx])
                        this.division += 1
                        setTimeout(()=>this.draw(init,growthes,limit),0.01)
                }
            }else{
                return
            }
        }
    },

    mounted(){
        this.paper = this.$refs.paper.getContext('2d')
        this.asset = this.asset.map(num=>(num<=10)
                                            ?100/this.phase
                                            :(Math.round(num*this.phase*0.1)-Math.round(num*this.phase*0.1)%100/this.phase)*10/this.phase)
        
        let init = this.asset.map(()=>0),
            growthes = this.asset.map(ag=>ag/this.limit)
        this.draw(init,growthes,this.limit)
    }
}