document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forum-form');
    const postList = document.getElementById('post-list');
    const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];

    const saveToLocalStorage = () => {
        localStorage.setItem('forumPosts', JSON.stringify(posts));
    };

    const renderPosts = () => {
        postList.innerHTML = '';
        posts.forEach((post, index) => {
            const li = document.createElement('li');
            li.textContent = post;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => {
                posts.splice(index, 1);
                saveToLocalStorage();
                renderPosts();
            };
            li.appendChild(deleteBtn);
            postList.appendChild(li);
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const postContent = document.getElementById('post-content').value.trim();
        if (postContent) {
            posts.push(postContent);
            saveToLocalStorage();
            renderPosts();
            form.reset();
        }
    });

    renderPosts();
});
