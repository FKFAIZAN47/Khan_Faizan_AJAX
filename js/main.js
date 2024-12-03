(() => {


const infoBoxes = [
  { 
    title: 'Noise-cancelling microphones',
    text: 'Noise-cancelling microphones and a rear copper shield are optimally placed to quickly detect outside noises, working together to counter noise before it disturbs your experience.',
  },
  {
    title: 'Comfortable fit',
    text: 'Three pairs of ultra comfortable silicone tips are included. The tips create an acoustic seal that blocks outside audio and secures the earbuds in place.',
  },
  {
    title: '360 AUDIO',
    text: '360 Audio places sound all around you, while Dolby Head Tracking™ technology delivers an incredible three-dimensional listening experience.',
  },
  {
    title: 'Ultra Fast Charging',
    text: 'Charge your earbuds in 30 minutes or less with our hyper charging technology.',
  },
]; 

//functions
function loadInfoBoxes() {

  fetch("https://swiftpixel.com/earbud/api/infoboxes")
  .then(response => response.json())
  .then(infoBoxes => {
  infoBoxes.forEach((infoBox, index) => {
    let selected = document.querySelector(`#hotspot-${index + 1}`);

    const headingElement = document.createElement('h2');
    headingElement.textContent = infoBox.heading;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = infoBox.description;

    selected.appendChild(headingElement);
    selected.appendChild(descriptionElement);
  });

})
.catch(error => console.error("Error loading infoBoxes:", error));

}
loadInfoBoxes();

function loadMaterialInfo() {

  // loader.classList.toggle("hidden");
  fetch("https://swiftpixel.com/earbud/api/materials")
  .then(response => response.json())
  .then(materialListData => {
  materialListData.forEach(material => {
  //clone template
  const clone = materialTemplate.content.cloneNode(true);
  //populate with Data
  const materialHeading = clone.querySelector(".material-heading");
  materialHeading.textContent = material.heading;

  const materialDescription = clone.querySelector(".material-description");
  materialDescription.textContent = material.description;

  materialList.appendChild(clone);
  })

  })

.catch(error => console.error("Error loading material info:", error));
}
loadMaterialInfo();


function showInfo() {
  let selected = document.querySelector(`#${this.slot}`);
  gsap.to(selected, 1, { autoAlpha: 1 });
}

function hideInfo() {
  let selected = document.querySelector(`#${this.slot}`);
  gsap.to(selected, 1, { autoAlpha: 0 });
}

  //Event listeners

  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  // Fetch API


  const peopleCon = document.querySelector("#people-con");
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.textContent = "Loading...";
  document.body.appendChild(loader);

  function getData() {
      loader.classList.toggle("hidden");
      fetch("https://randomuser.me/api/?results=20")
         .then(response => response.json())
         .then(people => {
             console.log(people.results);

             const ul = document.createElement("ul");
             ul.id = "people-list";

             people.results.forEach(result => {
              const li = document.createElement("li");
              const img = document.createElement("img");
              img.src = result.picture.thumbnail;

              const h3 = document.createElement("h3");
              h3.textContent = `${result.name.first} ${result.name.last}`;

              const p = document.createElement("p");
              p.textContent = result.email;

              const tel = document.createElement("p");
              tel.textContent = result.cell;

              li.appendChild(img);
              li.appendChild(h3);
              li.appendChild(p);
              li.appendChild(tel);      
              ul.appendChild(li);
             });

             loader.classList.toggle("hidden");
             peopleCon.innerHTML = "";
             peopleCon.appendChild(ul);

          })
         .catch(error => {
             console.log(error);
             const errorMessage = document.createElement("p");
             errorMessage.textContent = "Oops, it looks like something went wrong. Please try again later.";
             peopleCon.appendChild(errorMessage);
             loader.classList.toggle("hidden");
          });
  }

  getData(); 

})();

