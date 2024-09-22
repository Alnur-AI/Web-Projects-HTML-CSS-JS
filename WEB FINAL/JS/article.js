
const getQueryParams = () => {
    const params = {};
    const queryString = window.location.search.slice(1);
    queryString.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = decodeURIComponent(value || '');
    });
    return params;
}


const createArticleElementID = (post) => {

    UserID = sessionStorage.getItem("UserID");



    const articleContainer = document.getElementById('posts-container');
    if (!post) {
        console.error('Invalid post data');
        return;
    }

    const articleDiv = document.createElement('div');
    articleDiv.id = post.id;
    articleDiv.className = 'article';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'article_name';
    if(post.author.id === UserID)
        nameDiv.contentEditable = 'true';
    nameDiv.textContent = post.title;

    const tagDiv = document.createElement('div');
    tagDiv.className = 'article_tag';
    if(post.author.id === UserID)
        tagDiv.contentEditable = 'true';
    tagDiv.textContent = post.tags;

    const imageDiv = document.createElement('div');
    imageDiv.className = 'article_image';
    const image = document.createElement('img');
    image.src = post.image;
    imageDiv.appendChild(image);


    
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'article_body';

    const introDiv = document.createElement('div');
    introDiv.className = 'article_intro';
    if(post.author.id === UserID)
        introDiv.contentEditable = 'true';
    introDiv.innerText = post.text_introduction;

    const mainDiv = document.createElement('div');
    mainDiv.className = 'article_main';
    if(post.author.id === UserID)
        mainDiv.contentEditable = 'true';
    mainDiv.innerText = post.text_body;

    bodyDiv.innerHTML = `
        <p contenteditable="false"><strong>Introduction:&nbsp;</strong></p>
    `;
    bodyDiv.appendChild(introDiv);

    bodyDiv.innerHTML += `
        <p contenteditable="false"><strong>Article:&nbsp;</strong></p>
    `;
    bodyDiv.appendChild(mainDiv);



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


    
    if(post.author.id === UserID){
        const editButtonDiv = document.createElement('div');
        editButtonDiv.className = 'article_button';
        editButtonDiv.innerHTML = `<i class="fas fa-save"></i> `;
        rightSectionDiv.appendChild(editButtonDiv);
        editButtonDiv.addEventListener('click', () => {
            handleEditButtonClick(post.id);
        });

        const deleteButtonDiv = document.createElement('div');
        deleteButtonDiv.className = 'article_button';
        deleteButtonDiv.innerHTML = `<i class="fas fa-eraser"></i> `;
        rightSectionDiv.appendChild(deleteButtonDiv);
        deleteButtonDiv.addEventListener('click', () => {
            handleDeleteButtonClick(post.id);
        });
    }

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

    articleContainer.appendChild(articleDiv);
}
async function handleEditButtonClick(postId) {
    
    try {

        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('article_id');
        if (!postId) {
            console.error('Post ID not found in URL');
            return;
        }
        const article = document.getElementById(postId);
        const articleName = article.querySelector('.article_name').textContent.trim();
        const articleTag = article.querySelector('.article_tag').textContent.trim();
        const articleIntro = article.querySelector('.article_intro').innerHTML.trim();
        const articleBody = article.querySelector('.article_main').innerHTML.trim();
        const articleImageSrc = article.querySelector('.article_image img').src;


        const responseGet = await fetch(`http://localhost:3000/posts/${postId}`);
        if (!responseGet.ok) {
            console.error('Failed to fetch the post from server:', responseGet.statusText);
            return;
        }
        
        const post = await responseGet.json();

        const updatedPost  = {
            ...post,
            title: articleName,
            image: articleImageSrc,
            tags: articleTag,
            text_introduction: articleIntro,
            text_body: articleBody
        };
        
        const url = `http://localhost:3000/posts/${postId}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPost)
        });
  
        if (!response.ok) {
            throw new Error('Failed to save database: ' + response.statusText);
        }
        
        loadDatabase();
  
        toastr.success("Post is published!");
  
        window.location.href = 'home.html';
    } catch (error) {
        console.error('Failed to save database: ', error);
        toastr.error("Failed to save database:");
    }



}
async function handleDeleteButtonClick(postId) {
    try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete post: ' + response.statusText);
        }

        window.location.href = 'home.html';
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

const displayArticleById = async () => {
    const queryParams = getQueryParams();
    const articleId = queryParams.article_id;

    if (articleId) {
        const data = await fetchData();
        const post = data.find(post => post.id === articleId);
        createArticleElementID(post);
    } else {
        console.error('No article_id found in URL');
    }
}


document.addEventListener('DOMContentLoaded', displayArticleById);
