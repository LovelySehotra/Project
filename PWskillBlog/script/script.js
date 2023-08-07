// Blog posts data (for demonstration purposes)
let blogs = [];

// Function to display blogs on the home page
function displayBlogs() {
    const blogList = document.getElementById('blogList');
    blogList.innerHTML = '';

    blogs.forEach((blog, index) => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');
        blogCard.innerHTML = `
        <div class="blog">
    <div class="blog-img">
    <img src="./assest/blog3.jpg" alt="" />
  </div>
    <div class="blog-desc">
    <h3 class="title">${blog.title}</h3>
    <p class="des" >${blog.description}</p>
    <button class="read-more" data-index="${index}">Read</button>
    </div>
    </div>
    `;
        blogList.appendChild(blogCard);
    });

    // Add event listeners to "Read More" buttons
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            const selectedBlog = blogs[index];
            localStorage.setItem('selectedBlog', JSON.stringify(selectedBlog));
            window.location.href = 'addpost.html';
        });
    });
}

// Function to show the add blog modal
function showAddBlogModal() {
    const modal = document.getElementById('addBlogModal');
    modal.style.display = 'block';
}

// Function to close the add blog modal
function closeAddBlogModal() {
    const modal = document.getElementById('addBlogModal');
    modal.style.display = 'none';
}

// Function to handle form submission for adding a new blog
function addBlog(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
    const content = document.getElementById('content').value;

    const newBlog = {
        title: title,
        author: author,
        description: description,
        content: content,
    };

    // Add the new blog to the array
    blogs.push(newBlog);

    // Save blogs data to LocalStorage
    localStorage.setItem('blogs', JSON.stringify(blogs));

    // Close the modal and display the updated blog list
    closeAddBlogModal();
    displayBlogs();
}

// Event listeners
document.getElementById('addBlogButton').addEventListener('click', showAddBlogModal);
document.getElementById('addBlogForm').addEventListener('submit', addBlog);
document.querySelector('.close').addEventListener('click', closeAddBlogModal);

// Load blogs data from LocalStorage on page load
window.onload = function () {
    const savedBlogs = localStorage.getItem('blogs');
    if (savedBlogs) {
        blogs = JSON.parse(savedBlogs);
    }
    displayBlogs();
};
