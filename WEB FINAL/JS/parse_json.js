let data;
const fetchData = async () => {
    try {
        const response = await fetch ("http://127.0.0.1:3000/posts");
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

function formatNumber(number) {
    if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + 'B';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    } else {
        return number;
    }
}

const createArticleElements = (postsData) => {
    const postsContainer = document.getElementById('posts-container');
    if (Array.isArray(postsData)) {
        postsData.forEach(post => {
            const articleDiv = document.createElement('div');
            articleDiv.id = post.id;
            articleDiv.className = 'article';

            const nameDiv = document.createElement('div');
            nameDiv.className = 'article_name';
            nameDiv.textContent = post.title;
            
            nameDiv.addEventListener('click', () => {
                window.location.href = `./article.html?article_id=${post.id}`;
            });

            const tagDiv = document.createElement('div');
            tagDiv.className = 'article_tag';
            tagDiv.textContent = post.tags;

            const imageDiv = document.createElement('div');
            imageDiv.className = 'article_image';
            const image = document.createElement('img');
            image.src = post.image;
            imageDiv.appendChild(image);

            const bodyDiv = document.createElement('div');
            bodyDiv.className = 'article_body';
            //bodyDiv.innerHTML = `<strong>Introduction:</strong> ${post.text_introduction}<br><br><strong>\tArticle:</strong> ${post.text_body}`;
            bodyDiv.innerHTML = `<strong>Introduction:</strong> ${post.text_introduction}<br><br>`;

            const footerDiv = document.createElement('div');
            footerDiv.className = 'article_footer';

            const leftSectionDiv = document.createElement('div');
            leftSectionDiv.className = 'left-section';

            const likeButtonDiv = document.createElement('div');
            likeButtonDiv.className = 'article_button';
            likeButtonDiv.innerHTML = `<i class="fas fa-heart"></i> ${formatNumber(post.likes)}`;

            const shareButtonDiv = document.createElement('div');
            shareButtonDiv.className = 'article_button';
            shareButtonDiv.innerHTML = `<i class="fas fa-share"></i> ${formatNumber(post.share)}`;

            leftSectionDiv.appendChild(likeButtonDiv);
            leftSectionDiv.appendChild(shareButtonDiv);

            const rightSectionDiv = document.createElement('div');
            rightSectionDiv.className = 'right-section';

            const authorNameDiv = document.createElement('div');
            authorNameDiv.className = 'author_name';
            authorNameDiv.textContent = post.author.username;

            const viewsDiv = document.createElement('div');
            viewsDiv.className = 'article_views';
            viewsDiv.innerHTML = `${formatNumber(post.views)} <i class="fas fa-eye"></i>`;

            const dateSpan = document.createElement('span');
            dateSpan.textContent = post.date;

            rightSectionDiv.appendChild(authorNameDiv);
            rightSectionDiv.appendChild(viewsDiv);
            rightSectionDiv.appendChild(dateSpan);

            footerDiv.appendChild(leftSectionDiv);
            footerDiv.appendChild(rightSectionDiv);

            articleDiv.appendChild(nameDiv);
            articleDiv.appendChild(tagDiv);
            articleDiv.appendChild(imageDiv);
            articleDiv.appendChild(bodyDiv);
            articleDiv.appendChild(footerDiv);

            postsContainer.appendChild(articleDiv);
        });
    } else {
        console.error('Invalid data format');
    }
}


async function loadDatabase() {

    // Fetch the updated database
    const updatedDatabaseResponse = await fetch('http://localhost:3000/posts');
    if (!updatedDatabaseResponse.ok) {
        throw new Error('Failed to fetch updated database: ' + updatedDatabaseResponse.statusText);
    }
    const updatedDatabase = await updatedDatabaseResponse.json();

    // Update localStorage with the updated database
    localStorage.setItem("database", JSON.stringify({ posts: updatedDatabase }));

}

if (window.location.pathname.endsWith('/Pages/home.html')){
    document.addEventListener('DOMContentLoaded', function() {
        fetchData().then(data => {
            if (data) {
                createArticleElements(data);
            }
        });
        //loadDatabase();
    });
}