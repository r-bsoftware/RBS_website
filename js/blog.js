<script>
  function handleResponse(response) {
    var contentDiv = document.getElementById("content");

    var blogItemWrapper = document.createElement("div");
    blogItemWrapper.classList.add("col-md-4", "blog-item-wrapper");

    var blogItem = document.createElement("div");
    blogItem.classList.add("blog-item");

    var blogImg = document.createElement("div");
    blogImg.classList.add("blog-img");

    var blogImgLink = document.createElement("a");
    blogImgLink.href = response.url;

    var blogImgElement = document.createElement("img");
    blogImgElement.src = response.images[0].url;
    blogImgElement.alt = response.title;

    blogImgLink.appendChild(blogImgElement);
    blogImg.appendChild(blogImgLink);

    var blogText = document.createElement("div");
    blogText.classList.add("blog-text");

    var blogTag = document.createElement("div");
    blogTag.classList.add("blog-tag");

    var blogTagLink = document.createElement("a");
    blogTagLink.href = "#";

    var blogTagH6 = document.createElement("h6");
    blogTagH6.classList.add("small");
    blogTagH6.textContent = response.labels[0];

    blogTagLink.appendChild(blogTagH6);
    blogTag.appendChild(blogTagLink);

    var blogTitle = document.createElement("div");
    blogTitle.classList.add("blog-title");

    var blogTitleLink = document.createElement("a");
    blogTitleLink.href = response.url;

    var blogTitleH4 = document.createElement("h4");
    blogTitleH4.textContent = response.title;

    blogTitleLink.appendChild(blogTitleH4);
    blogTitle.appendChild(blogTitleLink);

    var blogMeta = document.createElement("div");
    blogMeta.classList.add("blog-meta");

    var blogDate = document.createElement("p");
    blogDate.classList.add("blog-date");
    blogDate.textContent = new Date(response.published).toLocaleDateString();

    var blogComment = document.createElement("p");
    blogComment.classList.add("blog-comment");

    var blogCommentLink = document.createElement("a");
    blogCommentLink.href = response.url + "#comments";
    blogCommentLink.textContent = response.replies.totalItems + " Comments";

    blogComment.appendChild(blogCommentLink);

    blogMeta.appendChild(blogDate);
    blogMeta.appendChild(document.createTextNode(" / "));
    blogMeta.appendChild(blogComment);

    var blogDesc = document.createElement("div");
    blogDesc.classList.add("blog-desc");

    var blogDescP = document.createElement("p");
    blogDescP.textContent = response.content;

    blogDesc.appendChild(blogDescP);

    var blogAuthor = document.createElement("div");
    blogAuthor.classList.add("blog-author");

    var blogAuthorP = document.createElement("p");
    blogAuthorP.textContent = "by " + response.author.displayName;

    blogAuthor.appendChild(blogAuthorP);

    var blogShareWrapper = document.createElement("div");
    blogShareWrapper.classList.add("blog-share-wrapper");

    var blogShareFacebook = document.createElement("a");
    blogShareFacebook.classList.add("blog-share");
    blogShareFacebook.href = "https://www.facebook.com/sharer.php?u=" + response.url;

    var blogShareFacebookIcon = document.createElement("i");
    blogShareFacebookIcon.classList.add("fab", "fa-facebook-square");

    blogShareFacebook.appendChild(blogShareFacebookIcon);
  
    var blogShareTwitter = document.createElement("a");
    blogShareTwitter.classList.add("blog-share");
    var blogShareTwitterLink = "https://twitter.com/share?url=" + response.url + "&text=" + encodeURIComponent(response.title);
    blogShareTwitter.href = blogShareTwitterLink;

    var blogShareTwitterIcon = document.createElement("i");
    blogShareTwitterIcon.classList.add("fab", "fa-twitter-square");

    blogShareTwitter.appendChild(blogShareTwitterIcon);

    var blogSharePinterest = document.createElement("a");
    blogSharePinterest.classList.add("blog-share");
    blogSharePinterest.href = "https://pinterest.com/pin/create/button/?url=" + response.url + "&media=" + response.images[0].url + "&description=" + encodeURIComponent(response.title);

    var blogSharePinterestIcon = document.createElement("i");
    blogSharePinterestIcon.classList.add("fab", "fa-pinterest-square");

    blogSharePinterest.appendChild(blogSharePinterestIcon);

    blogShareWrapper.appendChild(blogShareFacebook);
    blogShareWrapper.appendChild(blogShareTwitter);
    blogShareWrapper.appendChild(blogSharePinterest);

    blogItem.appendChild(blogImg);
    blogItem.appendChild(blogText);
    blogText.appendChild(blogTag);
    blogTag.appendChild(blogTagLink);
    blogText.appendChild(blogTitle);
    blogTitle.appendChild(blogTitleLink);
    blogText.appendChild(blogMeta);
    blogMeta.appendChild(blogDate);
    blogMeta.appendChild(document.createTextNode(" / "));
    blogMeta.appendChild(blogComment);
    blogText.appendChild(blogDesc);
    blogText.appendChild(blogAuthor);
    blogAuthor.appendChild(blogAuthorP);
    blogText.appendChild(blogShareWrapper);

    blogItemWrapper.appendChild(blogItem);
    contentDiv.appendChild(blogItemWrapper);
  }



</script>

