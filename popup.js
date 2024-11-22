////////////////////////////////////////////////////////////

const SeeMoreInformation = document.querySelector('#SeeMoreInformation')
const Information = document.querySelector('#Information')
const CloseInformation = document.querySelector('#CloseInformation')

SeeMoreInformation.addEventListener('click', () => {
    Information.classList.toggle('hideInformation')
})

document.addEventListener('click', e => {
    if (CloseInformation.contains(e.target) && e.target !== SeeMoreInformation) {
        Information.classList.add('hideInformation')
    }
})

////////////////////////////////////////////////////////////

const SeeMoreRuleHee = document.querySelector('#SeeMoreRuleHee')
const RuleHee = document.querySelector('#RuleHee')
const CloseRuleHee = document.querySelector('#CloseRuleHee')

SeeMoreRuleHee.addEventListener('click', () => {
    RuleHee.classList.toggle('hideRuleHee')
})

document.addEventListener('click', e => {
    if (CloseRuleHee.contains(e.target) && e.target !== SeeMoreRuleHee) {
        RuleHee.classList.add('hideRuleHee')
    }
})

////////////////////////////////////////////////////////////

const SeeMoreWhatIsGreats = document.querySelector('#SeeMoreWhatIsGreats')
const WhatIsGreats = document.querySelector('#WhatIsGreats')
const CloseWhatIsGreats = document.querySelector('#CloseWhatIsGreats')

SeeMoreWhatIsGreats.addEventListener('click', () => {
    WhatIsGreats.classList.toggle('hideWhatIsGreats')
})

document.addEventListener('click', e => {
    if (CloseWhatIsGreats.contains(e.target) && e.target !== SeeMoreWhatIsGreats) {
        WhatIsGreats.classList.add('hideWhatIsGreats')
    }
})

function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = "flex"
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = "none"
}