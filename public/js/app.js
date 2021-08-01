// console.log('Client side javascript file is loaded!')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherform.addEventListener('submit',(e)=>{
        e.preventDefault()
        const location = search.value
        // console.log(location)
        messageOne.textContent = 'Loading....'
        messageTwo.textContent = ''
        fetch('http://api.weatherstack.com/current?access_key=fa9c0f027eb0c28b45dab5aa3e5b0384&query='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            if(data.error.code===601){
                messageOne.textContent='Please Enter a valid location'
            }
            else if(data.error.code===615){
                messageOne.textContent='Unable to find the address.Please try another one'
    
            }
        }
        else{
            // console.log(data.current.weather_descriptions)
            // console.log(data.location)
            messageOne.textContent = 'The forecast is '+data.current.weather_descriptions 
            messageTwo.textContent = 'The location is ' + data.location.name +','+ data.location.region + ',' + data.location.country
        }
    })
})
})

