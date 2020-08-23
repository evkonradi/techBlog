async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value;
    const post_content = document.querySelector('#post-content').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }

  async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const post_content = document.querySelector('#post-content').value;

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title, post_content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
  
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);