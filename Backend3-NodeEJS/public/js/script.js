let btns = document.querySelectorAll('button');
for(btn of btns){
    btn.addEventListner("click",()=>{
        console.log("Button was clicked");
    })
}