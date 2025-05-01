# My Coding Journey Blog

A simple, modern blog for sharing coding and deep learning articles. This blog supports both HTML and Markdown files, with a clean and responsive design.

## Features

- Modern, responsive design
- Support for both HTML and Markdown posts
- Syntax highlighting for code blocks
- Tag-based categorization
- Clean and intuitive navigation
- No build process required

## Directory Structure

```
.
├── index.html          # Main blog page
├── css/
│   └── style.css      # Stylesheet
├── js/
│   └── main.js        # Blog functionality
└── posts/             # Blog posts directory
    ├── index.json     # Posts metadata
    └── *.md           # Markdown posts
```

## Adding New Posts

To add a new blog post:

1. Create a new Markdown file in the `posts` directory
2. Add front matter at the top of the file:

```markdown
---
title: Your Post Title
date: YYYY-MM-DD
tags: [Tag1, Tag2]
excerpt: A brief description of your post
---
```

3. Write your post content in Markdown format
4. Add the post metadata to `posts/index.json`

Example post structure:

```markdown
---
title: My New Post
date: 2024-03-20
tags: [JavaScript, Web Development]
excerpt: Learn about modern web development techniques
---

# My New Post

Your content here...
```

## Local Development

To run the blog locally:

1. Clone this repository
2. Serve the files using a local web server. You can use Python's built-in server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

3. Open `http://localhost:8000` in your browser

## Deployment

This blog can be deployed to GitHub Pages:

1. Push your changes to the repository
2. Enable GitHub Pages in your repository settings
3. Select the main branch as the source

## Customization

- Modify `css/style.css` to change the appearance
- Edit `index.html` to update the layout
- Update `js/main.js` to modify blog functionality

## Contributing

Feel free to submit issues and enhancement requests!
