let userClick = false;
let userColor = 'rgb(0,0,0';
function makeDiv(size){
    if (!size){
        size=16;
    }


    let divSize = 500/size;
    const container = document.querySelector('#external');
    for(let rows = 0; rows<size;rows++){
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        container.appendChild(rowDiv);
    }
    const rowDivs = document.querySelectorAll('div.row');
    rowDivs.forEach(row => {
        for (let cols = 0; cols < size; cols++) {
            const colDiv = document.createElement('div');
            colDiv.classList.add('column');
            colDiv.style.height = `${divSize}px`;
            colDiv.style.width = `${divSize}px`;
            row.appendChild(colDiv);
        }
    });
}

function clear(){
    const container = document.querySelector('#external');
    const containerChildren = document.querySelectorAll('div.row');
    containerChildren.forEach(child =>{
        container.removeChild(child);
    });

}
function normalmode(){
    clear();
    userSize = document.querySelector('#userSize').value
    makeDiv(userSize);
    const divs = document.querySelectorAll('div.column');
    divs.forEach(col=>{
        col.addEventListener('mousedown',()=>{
            userClick=true;
        });
    })
    divs.forEach(col=>{
        col.addEventListener('mouseup',e=>{
            e.target.style.backgroundColor=userColor;
            e.target.style.outline = userColor;
            userClick=false;
        });
    })
    divs.forEach(col=>{
        col.addEventListener('mouseenter',e=>{
            if (userClick){
                e.target.style.backgroundColor='rgb(52, 235, 225)';
            }
        });
    })
    divs.forEach(col=>{
        col.addEventListener('mouseleave',e=>{
            if (userClick){
                e.target.style.backgroundColor=userColor;
                e.target.style.outline = userColor;
            }        
        });
    })


}

function sketchmode(){
    clear();
    userSize = document.querySelector('#userSize').value
    makeDiv(userSize);
    const divs = document.querySelectorAll('div.column');
    divs.forEach(col=>{
        col.addEventListener('mousedown',()=>{
            userClick=true;
        });
    })
    divs.forEach(col=>{
        col.addEventListener('mouseup',e=>{
            e.target.style.backgroundColor=userColor;
            userClick=false;
        });
    })
    divs.forEach(div => {
        div.addEventListener('mouseenter', e => {
            if (userClick){
                let red = 0;
                let green = 0;
                let blue = 0;
                let opacity = 0.1;

                if (!e.target.style.opacity) {
                    opacity = 0.1;
                } else if (+e.target.style.opacity === 1) {
                    opacity = 1;
                } else {
                    let divOpacity = e.target.style.opacity;
                    divOpacity = +divOpacity + 0.1;
                    opacity = divOpacity;
                }
                e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
                e.target.style.opacity = opacity;
                e.target.style.outline = `rgba(${red},${green},${blue},${opacity})`;
            }
        });
    });
}

function changeColor(){
    const colorpick = document.querySelector('#mycolor');
    userColor = colorpick.value;
}
function reset(){
    userColor='rgb(0,0,0)';
    clear();
    document.querySelector('#userSize').value = 16;
    userSize = document.querySelector('#userSize').value
    makeDiv(userSize);
    normalmode();
}
function toggle(){
    const divs = document.querySelectorAll('div.column');
    if(divs.length!=0){
        divs.forEach(col=>{
            col.classList.replace('column','col_with');    
        });
    }
    else{
        const divs = document.querySelectorAll('div.col_with');
        divs.forEach(col=>{
            col.classList.replace('col_with','column');    
        });
    }
}

userSize = document.querySelector('#userSize').value
makeDiv(16);
normalmode()