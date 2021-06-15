let people = {
    Kenji: {bio: "I love jokes", job: "Memes"},
    Trent: {},
    Mitch: {},
    Kevin: {},
}


/*
<div id="carddeck">
<div class="card" id='joe-template'>
  <img src="https://static.designeverest.com/static/images/blog/blog228.jpg" alt="Avatar" style="width:100%">
  <div class="data">
    <h4>John Doe - Architect & Engineer</h4>
    <p class='pro'>Supportive</p>
    <p class='con'>Always takes a joke too far</p>
    <p class='hobby'>Golf</p>
  </div>
  <button class="btn" style="color: rgb(202, 38, 38);"><i class="fa fa-user-times fa-lg"></i></button>
  <button class="btn" style="color: rgb(102, 226, 139); float: right;"><i class="fa fa-heart fa-lg"></i></button>
</div>
</div
*/

function personCard() {
    let cardDeck = document.querySelector('.carddeck');


    for(let person of Object.keys(people)) {
        let card = document.createElement('div');
        card.classList.add('card');

        // Image
        let image = document.createElement('img');
        image.src = 'https://i.pinimg.com/736x/34/c7/41/34c741f0c7b54335a88e2bdd039c6d43.jpg';
        card.append(image);

        // Data Container
        let data = document.createElement('div');
        data.classList.add('data');

        // Name
        let name = document.createElement('h4');
        name.innerText = person;
        data.append(name);

        // Pro
        let pro = document.createElement('p');
        pro.classList.add('pro');
        pro.innerText = person;
        data.append(pro);

        // Combine it
        card.append(data);

        let buttons = document.querySelector('.cardButtons');
        card.append(buttons.cloneNode(true));

        cardDeck.append(card);
    }
}

personCard();
