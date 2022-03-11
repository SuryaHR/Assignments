const baseurl="https://newsapi.org/v2/";
const apiKey="67f21a065e424c039b3d004b8dc8e2a5"; 
let employees = [];


const initurl=baseurl+"top-headlines?country=us&category=business&apiKey="+apiKey;
let generalSearchString = "";

const countries=[
    {
        "name":"USA",
        "code":"us"
    },
    {
        "name":"India",
        "code":"in"
    },
    {
        "name":"Japan",
        "code":"jp"
    }
];

const categories = [{
    'name' : 'Business',
    'code' : 'business'
    },
    {'name' : 'Entertainment',
    'code' : 'entertainment'
    },
    {'name' : 'General',
    'code' : 'general'
    },
    {'name' : 'Health',
    'code' : 'health'
    },
    {'name' : 'Science',
    'code' : 'science'
    },
    {'name' : 'Sports',
    'code' : 'sports'
    },
    {'name' : 'Technology',
    'code' : 'technology'
}];


countryDropdown();
categoryDropdown()
getNews(initurl);

function getNews(url){
    let news=[];
    fetch(url).then(result=>result.json()).then(res =>{
        news=res['articles'];
        viewNews(news);
    }).catch(err=>{
        console.log(err);
    });
}

function countryDropdown(){
    const countryReference=document.querySelector("#countrySelect");

    let countrySelect=`<select class="form-select" aria-label="Select country" id=countryOption>`
    countries.forEach(country =>{
        countrySelect+=`<option value="${country['code']}">${country['name']}</option>"`
    });
    countrySelect+=`</select>`;
    countryReference.innerHTML=countrySelect;
}

function categoryDropdown(){
    const categoryReference=document.querySelector("#categorySelect");

    let categorySelect=`<select class="form-select" aria-label="Select category" id=categoryOption>`
    categories.forEach(category =>{
        categorySelect+=`<option value="${category['code']}">${category['name']}</option>"`
    });
    categorySelect+=`</select>`;
    categoryReference.innerHTML=categorySelect;
}


function viewNews(news){
    const newsReference=document.querySelector("#newsReference");
    let data="";
    news.forEach(element =>{
        data+=`<div class="col">
                    <div class="card h-100">
                        <img src="${element['urlToImage']}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${element['title']}</h5>
                            <p class="card-text">${element['description']}</p>      
                        </div>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">${element['author']} </li>
                        <li class="list-group-item">${element['publishedAt']} </li>
                        </ul>
                        <div class="card-body">
                            <a href="${element['url']}" class="card-link">Read more...</a>
                        </div>
                    </div>
                </div>`
    });

    newsReference.innerHTML=data;
}
function searchNews(){
    const countryValue=document.querySelector("#countryOption").value;
    const categoryValue=document.querySelector("#categoryOption").value;
    const genUrl=baseurl+"top-headlines?country="+countryValue+"&category="+categoryValue+"&apiKey="+apiKey;
    getNews(genUrl);

}

function generalSearch(event){
    generalSearchString = event.target.value;
}

function searchHandler(event){
    event.preventDefault();
    const urlser = baseurl+"everything?q="+generalSearchString+"&apiKey="+apiKey;
    getNews(urlser);
}