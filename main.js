let hobbyIds = {
    swimming: shortid.generate(),
    kegstands: shortid.generate(),
    camping: shortid.generate(),
}
// TODO (CLAIREFORCEONE) (JIRA-1344069340) I really need to do something to this file in the future

function onLoad() {
    /*
        let peopleArrayOfObjects = 
        
        http.load('/getProfiles')
            .map((profile) => {
                if(profile.job == 'politician') {
                    profile.calculateCoolness = () => {
                        return -1;
                    }
                }
            })
            .filter((p) => {
                perons.age > 18;
            })
            .map((person) => {
                buildFunStuff(person);
            });
    */
}

function buildFunStuff(rawPersonObject) {

    newPersonObject.coolnessFactor = calculateCoolnessFactor(rawPersonObject.uuid);
    return newPersonObject;
}

let peopleArrayOfObjects = [
    { 
        firstname: 'Paul', 
        job: 'Politician and Tactician',
        imageSource: 'https://s3.amazonaws.com/djwp/wp-content/uploads/2020/12/01185324/DJ17-Timothee-Chalamet-Hedi-Slimane-13.jpg', 
        bio: 'He who controls the spice controls the universe',
        hobbies: [
            'water conservation', 
            'desert camping'
        ],
        coolnessFactor: 11,
        calculateCoolnessFactor: () => { return  },
        renderCard: () => {},
        uuid: shortid.generate(), // we can have multiple pauls
    },
    { 
        firstname: 'Ken D. Oll', 
        job: 'Model',
        imageSource: 'https://www.gannett-cdn.com/presto/2021/03/08/USAT/8bb25fcc-19e3-4b18-bcd7-a06580cd3ad3-G000_C_2021_242.jpg?crop=2571,1446,x0,y138&width=2571&height=1446&format=pjpg&auto=webp', 
        bio: 'Malibu is my home. Looking to build my dream house',
        hobbies: [
            'swimming'
        ],
        coolnessFactor: 10,
        uuid : shortid.generate()
    }
];

let hobbyCoolnessFactor = [
    {
        uuid: hobbyIds.swimming,
        coolnessFactor: 7
    }, 
    {
        uuid: hobbyIds.kegstands,
        coolnessFactor: -1
    },
    {
        uuid: hobbyIds.camping,
        coolnessFactor: 4
    }
]

/*
    Input
    Output
    Notes
*/
function addNewProfile() {

    let buildingBio = {
        firstname: document.querySelector('#nameInput').value.toString(),
        job: document.querySelector('#job')?.value?.toString(),
        bio: document.querySelector('#bioInput').value.toString(),
        uuid: shortid.generate(),
        imageSource: document.querySelector('#imageSrc').value.toString(),
        hobbies: [],
        coolnessFactor: 0,
    };

    let listHobbies = document.querySelector('#hobbyDisplay').innerText.toString().split(','); 
    buildingBio.hobbies = listHobbies;


    // TODO Why does this work?
    peopleArrayOfObjects.push(buildingBio);

    buildingBio.coolnessFactor = calculateCoolnessFactor(buildingBio.uuid);

    clearLocalStorage();
    displayProfiles();
}

/*
    Input: personID (number)
    Output: rating (number)
    Notes
    TODO calculate coolness points
    TODO EXTRA BONUS how do we do "close enoughs"? camping -> desert camping
*/



function calculateCoolnessFactor(personId) {

    // personID
    // lookup that person
    // figure out their name
    // check name for paul
    // return a special case

    // number
    let totalCool = 0;

    // person = object
    for(let person of peopleArrayOfObjects) {

        // choose the right person
        // person.uuid = number
        if(person.uuid == personId) {

            // iterate over each of their hobbies
            // hobby = string
            for(let hobby of person.hobbies) {
                
                // find the UUID for the hobby
                totalCool += findCoolnessPointsByName(hobbyIds, hobbyCoolnessFactor);
            }
        }
    }

    return totalCool;
}

/*
    {
        uuid: hobbyIds.swimming,
        coolnessFactor: 7
    }
*/
function UUIDLookupHelper(uuid) {
    if(uuid == coolnessFactorLookup.uuid) {

        // replace this lookup logic in place
        let coolnessFactor = coolnessFactorLookup.coolnessFactor;
    }

    // write code to replace that somewhere up in our data structure
}

// TODO name this better
// input - hobbyID object, coolnessFactor object
// output - compiled coolness
// notes
function findHobbyByName(hobbyIdObject, hobbyCoolnessFactor) {
    for(let [hobbyName, uuid] of Object.entries(hobbyIds)) {
        if(hobbyName == hobby) {

            // find the coolness factor by uuid
            for(let coolnessFactorLookup of hobbyCoolnessFactor) {
                totalCool += UUIDLookupHelper(uuid, coolnessFactorLookup);

            }
        }
    }

    // TODO returning some value
}

/*
TODO write unit test for UUIDLookupHelper
*/



/*
    Input
    Output
    Notes
*/
function addHobby() {
    let hobbyField = document.querySelector('#hobby')?.value;

    let hobbyDisplay = document.querySelector('#hobbyDisplay')
    hobbyDisplay.innerText += hobbyField  + ',';
}

/*
    Input
    Output
    Notes
*/
function add(uuid) {
    console.log('adding ' + name)

}

/*
    Input
    Output
    Notes
*/
function remove(uuid) {
    console.log('removing ' + name);
}

// #region rendering

function displayProfiles() {
    let cardDeck = document.querySelector('.carddeck');

    [...document.getElementsByClassName("bio-card")].map(n => n && n.remove());

    for(let person of peopleArrayOfObjects) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('bio-card');

        // Image
        let image = document.createElement('img');
        image.src = person.imageSource || 'https://pbs.twimg.com/profile_images/1080855598298611713/lTS-u1Iu_400x400.jpg';
        card.append(image);

        // Data Container
        let data = document.createElement('div');
        data.classList.add('data');

        // Name
        let name = document.createElement('h4');

        // TODO different way to calculate cool
        name.innerText = person.firstname + ' - ' + person.job + " - " + person.calculateCoolnessFactor();
        data.append(name);

        // Bio
        let bio = document.createElement('p');
        bio.innerHTML = person.bio + ` <br><br><b>Hobbies include<b> `;

        person.hobbies?.forEach(h => {
            bio.innerHTML += '*' + h + ' '
        })

        data.append(bio);
        card.append(data);

        let buttons = document.querySelector('.cardButtons');

        let personButtons = buttons.cloneNode(true);
        personButtons.childNodes.forEach(c => {
            c.id == 'add' 

                // TODO lets talk about this line
                ? c.addEventListener('click', () => add(person.uuid)) 
                : c.addEventListener('click', () => remove(person.uuid));
        });

        card.append(personButtons);

        cardDeck.append(card);
    }
}



function clearLocalStorage() {
    localStorage.removeItem("nameInput");
    localStorage.removeItem("bioInput");
    localStorage.removeItem("hobbies");
    localStorage.removeItem("job");
    localStorage.removeItem("imageSrc");

    document.getElementById("nameInput").value = '';
    document.getElementById("bioInput").value = '';
    document.getElementById("hobby").value = '';
    document.getElementById("hobbyDisplay").innerText = '';
    document.getElementById("imageSrc").value = '';
    document.getElementById("job").value = '';
}

window.onbeforeunload = function() {
    var nameInput = document.getElementById("nameInput"); 
    localStorage.setItem("nameInput", nameInput.value);

    var bioInput = document.getElementById("bioInput"); 
    localStorage.setItem("bioInput", bioInput.value);

    var hobbies = document.getElementById("hobbyDisplay"); 
    localStorage.setItem("hobbies", hobbies.innerText);

    var hobbyInput = document.getElementById('hobby');
    localStorage.setItem('hobby', hobbyInput.value);

    var imageSrc = document.getElementById("imageSrc"); 
    localStorage.setItem("imageSrc", imageSrc.value);

    var job = document.getElementById("job"); 
    localStorage.setItem("job", job.value);
}

window.onload = function() {

    var nameInput = localStorage.getItem('nameInput');
    if (nameInput) document.getElementById("nameInput").value = nameInput;

    var bioInput = localStorage.getItem('bioInput');
    if (bioInput) document.getElementById("bioInput").value = bioInput;

    var hobbies = localStorage.getItem('hobbies');
    if (hobbies) document.getElementById("hobbyDisplay").innerText = hobbies;

    var imageSrc = localStorage.getItem('imageSrc');
    if (imageSrc) document.getElementById("imageSrc").value = imageSrc;

    var job = localStorage.getItem('job');
    if (job) document.getElementById("job").value = job;
}

// #endregion

displayProfiles();

