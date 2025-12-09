# Admin Interface Test Guide

## Testing the Blog Admin Interface

### 1. Authentication Test
1. Navigate to `http://localhost:3000/admin`
2. Should redirect to `/admin/login`
3. Try logging in with:
   - Username: `admin`
   - Password: `admin123`
4. Should redirect to admin dashboard

### 2. Dashboard Test
1. After login, verify dashboard shows:
   - System stats (total posts, published, drafts)
   - Quick action buttons
   - Recent posts list

### 3. Create New Post Test
1. Click "New Post" or navigate to `/admin/posts/new`
2. Fill in the form:
   - Title: "Test Blog Post"
   - Slug: Should auto-generate as "test-blog-post"
   - Excerpt: "This is a test blog post"
   - HTML Content: Paste the following HTML:
   ```html
   <h2>Welcome to My Test Post</h2>
   <p>This is a <strong>test blog post</strong> with some <em>formatted content</em>.</p>
   <ul>
     <li>First item</li>
     <li>Second item</li>
   </ul>
   <p>Here's a link: <a href="https://example.com">Example Link</a></p>
   <img src="https://via.placeholder.com/300x200" alt="Test Image" />
   ```
   - Category: "Test"
   - Tags: "test, demo, html"
   - Author: "Admin"
3. Save as draft first, then publish

### 4. Post Management Test
1. Navigate to `/admin/posts`
2. Verify the new post appears in the list
3. Test filtering by status (All, Published, Drafts)
4. Test search functionality
5. Edit the post and make changes
6. Delete a test post

### 5. HTML Processing Test
1. Create a post with potentially unsafe HTML:
   ```html
   <script>alert('test')</script>
   <h2>Safe Content</h2>
   <p>This should be safe</p>
   <form><input type="text"></form>
   ```
2. Verify that script tags and forms are removed
3. Check that safe HTML elements remain

### 6. Settings Page Test
1. Navigate to `/admin/settings`
2. Verify system information is displayed correctly

### 7. Logout Test
1. Click logout button in header
2. Should redirect to login page
3. Try accessing `/admin` - should redirect to login

## Expected Results

- ✅ Authentication works with environment variables
- ✅ Admin routes are protected by middleware
- ✅ HTML content is properly sanitized
- ✅ CRUD operations work for blog posts
- ✅ Auto-generation of excerpts and read time
- ✅ File-based storage system works
- ✅ UI is clean and functional

## Test Credentials

- Username: `admin`
- Password: `admin123`

These are stored in `.env.local` and can be changed by updating:
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
