export default function ActiveTab(num, i) {
    const activeTab = document.querySelector('.active-tab')
    activeTab.style.transform = `translateY(${num}px)`
    const tabs = document.querySelectorAll('.nav-element')
    tabs.forEach(element => {
        element.style.filter = 'invert(0%)'
    });
    if(i !== -1){
        tabs[i].style.filter = 'invert(100%)'
        activeTab.style.display = 'initial'
    }else{
        activeTab.style.display = 'none'
    }
}