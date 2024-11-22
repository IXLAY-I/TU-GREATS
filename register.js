const regised = document.querySelector(".register")
const datas = document.querySelector(".data")

regised.addEventListener("click", () => {
    datas.classList.toggle("active");
    regised.classList.toggle("active");

    if (datas.classList.contains("active")) {
        datas.scrollIntoView({ behavior: "smooth", block: "start" });
    }
});

const submitb = document.querySelector(".submit-button")

submitb.addEventListener("click", () => {
    datas.classList.toggle("active");
    regised.classList.toggle("active");

    if (datas.classList.contains("active")) {
        datas.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
        location.reload();
        alert('Successful!');
    }, 100);
});

//////////////////////////////////////////////////////////
const buttons = document.querySelectorAll(".date-item")

buttons.forEach(button =>{
    button.addEventListener('click', () =>{
        if (button.classList.contains('active')){
            button.classList.remove('active')
        } else {
            buttons.forEach(btn => btn.classList.remove('active'))

            button.classList.add('active')
        }
    })
})

/////////////////////////////////////////////////////////
const timebtns = document.querySelectorAll('.Time-item')

timebtns.forEach(timebtn =>{
    timebtn.addEventListener('click', () => {
        if (timebtn.classList.contains('active')){
            timebtn.classList.remove('active')
        } else {
            timebtns.forEach(tbtn => tbtn.classList.remove('active'))

            timebtn.classList.add('active')
        }
    })
}) 
