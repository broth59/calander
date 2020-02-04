
import Validator from '@/js/class/Validator'

export default function(){
    
    let validator = null

    return {

        validate: {

            bind(el, binding){
                const rules = binding.value.split("|")
                validator = new Validator(rules)
            },
            
            update(el, binding, vnode){
                let identifier = el.name 
                let value = el.value 
                let error = validator.validate(identifier, value)

                vnode.context.error = error
            }

        }

    }

}