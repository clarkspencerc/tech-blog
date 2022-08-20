async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if(comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            BODY: JSON.stringify({
                post_id,
                comment_text
        }), 
        headers: {
            'Content-Type': 'application/json'
        }
    }); 

        if(response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);

// async function deleteComment(event) {
//     event.preventDefault();

//     const comment_id = event.target.getAttribute('data-id');
//     const post_id = window.location.toString().split('/')[
//         window.location.toString().split('/').length - 1
//     ];

//     const response = await fetch(`/api/comment/${comment_id}`, {
//         method: 'delete',
//         headers: {'Content-Type': 'application/json'}
//     });

//     if (response.ok) {
//         window.location.replace(`/post/${post_id}`);
//     } else {
//         alert(response.statusText);
//     }
// }

// document.querySelector('.comment-list').addEventListener('click', deleteComment);

// async function deletePost(event) {
//     event.preventDefault();

//     const post_id = window.location.toString().split('/')[
//         window.location.toString().split('/').length - 1
//     ];

//     const response = await fetch(`/api/post/${post_id}`, {
//         method: 'delete',
//         headers: {'Content-Type': 'application/json'}
//     });

//     if (response.ok) {
//         window.location.replace('/');
//     } else {
//         alert(response.statusText);
//     }
// }

// document.querySelector('.delete-post').addEventListener('click', deletePost);

// async function editPost(event) {
//     event.preventDefault();

//     const post_id = window.location.toString().split('/')[
//         window.location.toString().split('/').length - 1
//     ];

//     const response = await fetch(`/api/post/${post_id}`, {
//         method: 'put',
//         headers: {'Content-Type': 'application/json'}
//     });

//     if (response.ok) {
//         window.location.replace('/'); 
//     } else {
//         alert(response.statusText);
//     }
// }

// document.querySelector('.edit-post').addEventListener('click', editPost);