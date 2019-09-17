
console.log('client side script')



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message_1 =document.querySelector('#msg1')
const msg2 =document.querySelector('#err')


weatherform.addEventListener('submit',(e)=>
{

    msg2.textContent=''
    message_1.textContent = 'Loading...'
    e.preventDefault()
    const location = search.value
    

    fetch('/weather?address='+location).then((res)=>
    {
        
        res.json().then((dat)=>{
        
        if (dat.error){
            
            message_1.textContent=dat.error
        }else
        {
            message_1.textContent ='Location :'+ dat.location
            msg2.textContent=' summery: '+dat.summery
            console.log(dat.location)
            console.log(dat.summery)
        }
    })
    })
})

