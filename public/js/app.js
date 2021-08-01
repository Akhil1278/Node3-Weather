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
        fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.ERROR){
            messageOne.textContent = data.ERROR
        }
        else{
            console.log(data.Forecast)
            // console.log(data.location)
            messageOne.textContent = 'The forecast is '+data.Forecast 
            messageTwo.textContent = 'The location is ' + data.Location +','+ data.Region + ',' + data.Country
        }
    })
})
})

