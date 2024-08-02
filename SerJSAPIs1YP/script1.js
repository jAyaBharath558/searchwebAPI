const apikey ='0b73ebb5f8244d9b8d103d4ad570563b'

const bolgContent = document.getElementById("bolg-container");

const searchField = document.getElementById("search-input");

const searchButton = document.getElementById("search-button");

async function fetchRandomNewa(){
    try{
        const apiUrl = `https://newsapi.org/v2/
        top-headlines?country=us&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.artical
    }catch(error){
        console.error("Error fetching data from API", error);
        return[];
    }
}
searchButton.addEventListener("click", async ()=>{
    const query=searchField.ariaValueMax.trim();
    if (query !== " "){
        try{
            const articale= await fetchNewsQuery(query);
            displayBolg(articale)
        }catch(error){
            console.error("Error fetching data from API", error);;
            return;
        }
    }
})
async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}
        &pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.artical
    }catch(error){
        console.error("Error fetching data from API", error);;
        return[];
    }
}

function displayBolg(artical){
    bolgContent.innerHTML = "";
    artical.forEach((articale) => {
        const bolgCard = document.createElement("div");
        bolgCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = articale.urlToImage;
        img.alt = articale.title;
        const title = document.createElement("h2");
        const truncatedTitle = articale.title.length > 30? articale .title.slice(0, 30)+"....." : 
        articale.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDescription = articale.description.length > 120? 
        articale.description.slice(0, 120)+"....." :
        articale.description;
        description.textContent=articale.description;

        bolgCard.appendChild(img);
        bolgCard.appendChild(title);
        bolgCard.appendChild(description);
        bolgContent.appendChild(bolgCard);
        window.open(articale.url,"_blank");
    })
}

(async ()=>{
    try{
        const artical = await fetchRandomNewa();
        console.log(artical);
    }catch(error){
        console.error("Error fetching data", error);
    }
})
();