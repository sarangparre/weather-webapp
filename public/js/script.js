const submit = document.querySelector('form')
const input = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


submit.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'Loading...'
    message2.textContent = ''

    const location = input.value
    
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                message1.textContent = data.error
            }else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})