const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = 'http://localhost:8000/api/v1/reviews/';

const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;

returnReviews(APILINK);

function returnReviews(url){
    fetch(url + "movie/" + movieId).then(res => res.json())
    .then(function(data){
        console.log(data);

        data.forEach(review => {
            const div_card = document.createElement('div');
            div_card.innerHTML = `
                <div class="row">
                    <div class="column">
                        <div class="card" id="${review._id}">
                            <p><strong>Review: </strong>${review.review}</p>
                            <p><strong>User: </strong>${review.user}</p>
                            <p><a href = "#" onclick="editReview('${review._id}','${review.review}, '${review.user}')">&#128221;</a>
                            <a href = "#" onclick="deleteReview('${review._id}')">&#128465;&#65039;</a></p>
                        </div>
                    </div>
                </div>
            `

            main.appendChild(div_card);
        });
    });
}

function editReview(id, review, user) {
    const element = document.getElementById(id);
    const reviewInputId = "review" + id;
    const userInputId = "user" + id;

    //update the existing review
    element.innerHTML = `
        <p><strong>Review: </strong>
            <input type="text" id="${reviewInputId}" value="${review}">
        </p>
        <p><strong>User: </strong>
            <input type="text" id="${userInputId}" value="${user}">
        </p>
        <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">&#128190;</a>
        </p> 
    `
}


