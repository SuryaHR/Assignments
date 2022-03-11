const time = new Date();

const hour = time.getHours(); 
const minutes = time.getMinutes();
const seconds = time.getSeconds();

const myTime = hour + ":" + minutes + ":" + seconds;
document.getElementById("user").innerText = "Surya_Bharadwaj " + myTime;


let myContent = "No Greetings";
if(hour >= 9 && hour < 12){
   
    myContent = "Good Morning! Surya_Bharadwaj"; 
}else if(hour >= 12 && hour < 15){
    
    myContent = "Good Afternoon! Surya_Bharadwaj"; 
}else if(hour >= 3 && hour < 18){

    myContent = "Good Evening! Surya_Bharadwaj"; 
}

document.getElementById("time").innerHTML = "<h2>" +myContent+ "</h2>";
