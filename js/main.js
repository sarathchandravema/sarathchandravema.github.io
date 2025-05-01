// Configure marked for markdown parsing
marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
    },
    breaks: true
});

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to create post card
function createPostCard(post) {
    const card = document.createElement('article');
    card.className = 'post-card';
    
    const content = `
        ${post.coverImage ? `<img src="${post.coverImage}" alt="${post.title}">` : ''}
        <div class="post-content">
            <h3>${post.title}</h3>
            <div class="post-meta">
                <span>${formatDate(post.date)}</span>
                ${post.tags ? `<span> • ${post.tags.join(', ')}</span>` : ''}
            </div>
            <p class="post-excerpt">${post.excerpt}</p>
            <a href="/posts/${post.slug}" class="read-more">Read More →</a>
        </div>
    `;
    
    card.innerHTML = content;
    return card;
}

// Function to load posts
async function loadPosts() {
    try {
        const response = await fetch('/posts/index.json');
        const posts = await response.json();
        
        const container = document.getElementById('posts-container');
        if (!container) return;
        
        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Display posts
        posts.forEach(post => {
            container.appendChild(createPostCard(post));
        });
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

// Function to load a single post
async function loadPost(slug) {
    try {
        const response = await fetch(`/posts/${slug}.md`);
        const markdown = await response.text();
        
        // Parse front matter and content
        const { attributes, body } = parseFrontMatter(markdown);
        
        // Convert markdown to HTML
        const content = marked.parse(body);
        
        // Update page content
        document.title = `${attributes.title} - My Coding Journey`;
        
        const main = document.querySelector('main');
        main.innerHTML = `
            <article class="blog-post">
                <h1>${attributes.title}</h1>
                <div class="post-meta">
                    <span>${formatDate(attributes.date)}</span>
                    ${attributes.tags ? `<span> • ${attributes.tags.join(', ')}</span>` : ''}
                </div>
                <div class="post-content">
                    ${content}
                </div>
            </article>
        `;
    } catch (error) {
        console.error('Error loading post:', error);
    }
}

// Simple front matter parser
function parseFrontMatter(markdown) {
    const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) {
        return { attributes: {}, body: markdown };
    }
    
    const frontMatter = match[1];
    const body = match[2];
    
    const attributes = {};
    frontMatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
            const value = valueParts.join(':').trim();
            attributes[key.trim()] = value.startsWith('[') ? 
                JSON.parse(value) : value;
        }
    });
    
    return { attributes, body };
}

// Handle routing
function handleRoute() {
    const path = window.location.pathname;
    
    if (path === '/' || path === '/index.html') {
        loadPosts();
    } else if (path.startsWith('/posts/')) {
        const slug = path.split('/').pop().replace('.html', '');
        loadPost(slug);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', handleRoute);
window.addEventListener('popstate', handleRoute);

// Handle GitHub Pages routing
(function(l) {
    if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) { 
            return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
        );
    }
}(window.location))

// Handle navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add active class to current page in navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath) && linkPath !== '/') {
            link.classList.add('active');
        }
    });

    // Handle posts page routing
    if (currentPath.includes('/posts')) {
        // If we're at /posts/ without index.html, redirect to /posts/index.html
        if (currentPath.endsWith('/posts/')) {
            window.location.href = '/posts/index.html';
        }
    }
}); 