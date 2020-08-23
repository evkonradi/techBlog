  async function editHandler(event) {
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

  async function deleteHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
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

  document.querySelector('#btnEditSubmit').addEventListener('click', editHandler);
  document.querySelector('#btnDelete').addEventListener('click', deleteHandler);