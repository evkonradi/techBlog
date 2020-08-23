function newPost (){
    console.log ('inside newPost');
    document.location.replace('/dashboard/post-add');
}

document.querySelector('#btnNewPost').addEventListener('click', newPost);