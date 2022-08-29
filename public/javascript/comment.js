 const commentFormHandler = async function(event) {
    event.preventDefault();
    
     const post_id = document.querySelector('input[name="post-id"]').value;
    
    const comment_text = document.querySelector('textarea[name="comment-body"]').value;
  
    if(comment_text) {
         await fetch('/api/comments', {
            method: 'POST',
            BODY: JSON.stringify({
                post_id,
                comment_text
        }), 
        headers: {
            'Content-Type': 'application/json'
        }
    }); 

        //if(response.ok) {
           // document.location.reload();
        // } else {
        //     alert(response.statusText);
        // }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);

