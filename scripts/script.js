//https://ygoprodeck.com/api-guide/
async function getCardImages(){
  let images_urls =[];

  /*
  fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
  .then(resp => resp.json())
  .then(data => {
    data.data.forEach(card => {
      images_urls.push(card.card_images[0].image_url_small);
    })
  })*/

  const resp = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
  const data = await resp.json();

  data.data.forEach(card => {
      images_urls.push([card.name, card.card_images[0].image_url_small]);
  })

  return images_urls;
}  

function clickCard(card_name, card_name_html, card_clicked, card_preview){
  card_preview.src = card_clicked.src;
  card_name_html.innerHTML = card_name;
}

async function build(){
  const images_urls = await getCardImages();
  const deck = document.getElementById("deck-card");
  const preview_card = document.getElementById("img-preview-card");
  const card_name_html = document.getElementById("name-card");
  //12209
    
  images_urls.forEach(card =>{
    let img = document.createElement("img");
    img.className = "card";
    img.loading = "lazy";
    img.src = card[1];

    img.onclick = ()=>{
      clickCard(card[0], card_name_html,img, preview_card);
    };
    
    deck.appendChild(img);    
  });
}

build();