$(function() {
  function buildHTML(message) {
    var html = $('<li class="message">').append(message.content);
    return html;
  }

  $('.js-form').on('submit', function(e) {
    e.preventDefault();
    var textField = $('.js-form__text-field');
    var message = textField.val();
    $.ajax({
      type: 'POST',
      url: '/messages.json',
      data: {
        todo: {
          content: message
        }
      },
      dataType: 'json'
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      textField.val('');
    })
    .fail(function() {
      alert('error');
    });
  });
});
