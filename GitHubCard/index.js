/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

// created api call with the thenified version
// axios
//   .get('https://api.github.com/users/freddiet803')
//   .then(result => {
//     console.log(result);
//     theCards.appendChild(createUserCard(result.data));
//   })

//   .catch(err => {
//     console.log(err);
//   });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'
];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function createUserCard(theUser) {
  //creating needed elements
  let card = document.createElement('div');
  let image = document.createElement('img');
  let cardInfo = document.createElement('div');
  let name = document.createElement('h3');
  let userName = document.createElement('p');
  let location = document.createElement('p');
  let profile = document.createElement('p');
  let userPage = document.createElement('a');
  let followers = document.createElement('p');
  let following = document.createElement('p');
  let bio = document.createElement('p');

  //appending elements to card
  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(userPage);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  //adding classes to elements

  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('username');

  //assigning attributes of object
  image.src = theUser.avatar_url;
  name.textContent = theUser.name;
  userName.textContent = theUser.login;
  location.textContent = `Location: ${theUser.location}`;

  userPage.href = theUser.html_url;

  profile.innerHTML = 'Profile: ' + '<a href=' + userPage.href + '>GitHub</a>';
  followers.textContent = `Followers: ${theUser.followers}`;
  following.textContent = `Following: ${theUser.following}`;
  bio.textContent = theUser.bio;
  // console.log(theUser.html_url);
  // console.log(userPage.href);
  // console.log(userPage.text);

  return card;
}
// create api call with async/await version
makeUserCard = async url => {
  try {
    let res = await axios.get(url);
    theCards.appendChild(createUserCard(res.data));
    console.log(res);
    let followersURL = res.data.followers_url;

    let res2 = await axios.get(followersURL);
    let followersOwnProfile = [];
    res2.data.forEach(user => {
      followersOwnProfile.push(user.url);
      //console.log(followersOwnProfile);
      //theCards.appendChild(createUserCard(res3.data));
      //theCards.appendChild(createUserCard(user));
    });

    followersOwnProfile.forEach(user => {
      makeFollowerUser(user);
    });
    console.log(res2);
    // f.forEach(user => {
    //   theCards.appendChild(createUserCard(user));
    // });
    console.log(followersURL);
    return res, res2;
  } catch (err) {
    console.log(err);
  }
};

makeFollowerUser = async url => {
  try {
    let res3 = await axios.get(url);
    theCards.appendChild(createUserCard(res3.data));
  } catch (err) {
    console.log(err);
  }
};

let theCards = document.querySelector('.cards');
let awaitCards = makeUserCard('https://api.github.com/users/freddiet803');

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

// followersArray.forEach(user => {
//   makeUserCard('https://api.github.com/users/' + user);
// });
