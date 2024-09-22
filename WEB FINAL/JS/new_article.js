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
document.addEventListener('DOMContentLoaded', (event) => {
    loadDatabase();
});


document.getElementById('article-img').addEventListener('click', function() {
    document.getElementById('image-input').click();
});
document.getElementById('image-input').addEventListener('change', function(event) {
    const files = event.target.files;
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i]);
    }
    
    fetch('/Assets', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
          const filesDiv = document.getElementById('files');
          filesDiv.innerHTML = '';
          data.files.forEach(file => {
              const p = document.createElement('p');
              p.textContent = file.name;
              filesDiv.appendChild(p);
          });
      })
      .catch(error => {
          console.error('Error:', error);
      });
});
document.querySelector('.fa-save').closest('.article_button').addEventListener('click', () => {
    const article = document.getElementById('1');
    const articleName = article.querySelector('.article_name').textContent;
    const articleTag = article.querySelector('.article_tag').textContent;
    const articleBody = article.querySelector('.article_intro').innerHTML;
    const articleImageSrc = article.querySelector('.article_image img').src;

    console.log('Article Name:', articleName);
    console.log('Article Tag:', articleTag);
    console.log('Article Body:', articleBody);
    console.log('Article Image Src:', articleImageSrc);
});
document.querySelector('.fa-paper-plane').closest('.article_button').addEventListener('click', (e) => {
    e.preventDefault();
    publishArticle();
    window.location.href='./home.html';
});
async function publishArticle(){

    loadDatabase();
    database = JSON.parse(localStorage.getItem("database"));
    UserID = sessionStorage.getItem("UserID");    

    console.log(database);
    try {
      
        const newId = (database.posts.length+1).toString();
        const article = document.getElementById('1');
        const articleName = article.querySelector('.article_name').textContent.trim();
        const articleTag = article.querySelector('.article_tag').textContent.trim();
        const articleIntro = article.querySelector('.article_intro').innerHTML.trim();
        const articleBody = article.querySelector('.article_main').innerHTML.trim();
        const articleImageSrc = article.querySelector('.article_image img').src;

        const randomViews = Math.floor(Math.random() * 1000);
        const randomShare = Math.floor(Math.random() * 1000);
        const randomLikes = Math.floor(Math.random() * 1000);
        const randomAuthorId = UserID;//Math.floor(Math.random() * 1000);
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

        const usernameSES = sessionStorage.getItem("Username");

        const newPost = {
            id: newId,
            title:articleName,
            views: randomViews,
            share: randomShare,
            likes: randomLikes,
            author: {
                id: randomAuthorId,
                username: usernameSES
            },
            date: formattedDate,
            image: articleImageSrc,
            tags: articleTag,
            text_introduction: articleIntro,
            text_body: articleBody
        };
  
        const url = 'http://localhost:3000/posts'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });
  
        if (!response.ok) {
            throw new Error('Failed to save database: ' + response.statusText);
        }
        
        loadDatabase();
  
        toastr.success("Post is published!");
  
    } catch (error) {
        console.error('Failed to save database: ', error);
        toastr.error("Failed to save database:");
    }
    
    
}