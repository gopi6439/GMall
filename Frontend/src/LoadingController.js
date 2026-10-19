


function setLoading(loading){
    let bg = document.querySelector('.container');
    let load = document.getElementById('loader');
    if(loading){
        load.style.display = "block";
        bg.style.backgroundColor = "#4d1d9566";
        bg.style.display = "block"
    }else{
        load.style.display = "none";
         bg.style.display = "none"
    }
}

export default setLoading;
