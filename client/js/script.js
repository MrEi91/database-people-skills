$(document).ready(function () {
  getData()
  complete()
})

function getData () {
  $.ajax({
    url: 'http://localhost:3000/api/todos',
    type: 'GET',
    success: function (data) {
      data.forEach(function (data) {
        if (data.complete === false) {
          $('#uncomplete').prepend(`
            <div id="uncomplete-${data._id}" class="col s6">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title">${data.title}</span>
                  <p>${data.content}</p>
                </div>
                <div class="card-action">
                  <a href="#" onclick="complete('${data._id}')">Complete</a>
                  <a href="#" onclick="remove('${data._id}')">Delete</a>
                </div>
              </div>
            </div>
          `)
        } else {
          $('#complete').prepend(`
            <div id='complete-${data._id}' class="col s6">
              <div class="card blue-grey lighten-2">
                <div class="card-content white-text">
                  <span class="card-title">${data.title}</span>
                  <p>${data.content}</p>
                </div>
                <div class="card-action">
                  <a href="#" onclick="uncomplete('${data._id}')">Uncomplete</a>
                  <a href="#" onclick="remove('${data._id}')">Delete</a>
                </div>
              </div>
            </div>
          `)
        }
      })
    }
  })
}

function addTodo () {
  $.ajax({
    url: 'http://localhost:3000/api/todo',
    type: 'POST',
    data: {
      title: $('#title').val(),
      content: $('#content').val()
    },
    success: function (data) {
      $('#title').val('')
      $('#content').val('')
      $('#uncomplete').prepend(`
        <div id="uncomplete-${data._id}" class="col s6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">${data.title}</span>
              <p>${data.content}</p>
            </div>
            <div class="card-action">
              <a href="#" onclick="complete('${data._id}')">Complete</a>
              <a href="#" onclick="remove('${data._id}')">Delete</a>
            </div>
          </div>
        </div>
      `)
    }
  })
}

function complete (id) {
  $.ajax({
    url: `http://localhost:3000/api/todo/${id}/complete`,
    type: 'PUT',
    success: function (data) {
      $(`#uncomplete-${id}`).remove()
      $('#complete').append(`
        <div id='complete-${data._id}' class="col s6">
          <div class="card blue-grey lighten-2">
            <div class="card-content white-text">
              <span class="card-title">${data.title}</span>
              <p>${data.content}</p>
            </div>
            <div class="card-action">
              <a href="#" onclick="uncomplete('${data._id}')">Uncomplete</a>
              <a href="#" onclick="remove('${data._id}')">Delete</a>
            </div>
          </div>
        </div>
      `)
    }
  })
}

function uncomplete (id) {
  $.ajax({
    url: `http://localhost:3000/api/todo/${id}/uncomplete`,
    type: 'PUT',
    success: function (data) {
      $(`#complete-${id}`).remove()
      $('#uncomplete').prepend(`
        <div id='uncomplete-${data._id}' class="col s6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">${data.title}</span>
              <p>${data.content}</p>
            </div>
            <div class="card-action">
              <a href="#" onclick="complete('${data._id}')">complete</a>
              <a href="#" onclick="remove('${data._id}')">Delete</a>
            </div>
          </div>
        </div>
      `)
    }
  })
}

// DELETE_TODO
function remove (id) {
  $.ajax({
    url: `http://localhost:3000/api/todo/${id}`,
    type: 'DELETE',
    success: function (data) {
      $(`#complete-${id}`).remove()
      $(`#uncomplete-${id}`).remove()
    }
  })
}
