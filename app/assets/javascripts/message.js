$(document).on('turbolinks:load', function(){
  $(function(){

    function buildHTML(message) {
      var image = message.image ? `<img src= ${ message.image }>` : "";
      var html = `<div class='message'>
                    <div class='upper-message' data_id="">
                      <div class='upper-message__user-name'>
                        ${message.name}
                      </div>
                      <div class='upper-message__date'>
                        ${message.created_at}
                      </div>
                      <div class='lower-message'>
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                        ${image}
                      </div>
                    </div>
                  </div>`
    return html;
    }

    function buildMessage(message) {
      var image = message.image ? `<img src= ${ message.image }>` : "";
      var html = `<div class='message' data-message-id="${message.id}">
                    <div class='upper-message' data_id="">
                      <div class='upper-message__user-name'>
                        ${message.name}
                      </div>
                      <div class='upper-message__date'>
                        ${message.created_at}
                      </div>
                      <div class='lower-message'>
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                        ${image}
                      </div>
                    </div>
                  </div>`
    return html;
    }
    function scroll(){
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    }
    var interval = setInterval(function(){
      var message_id = $('.message:last').data('messageId');
      if(window.location.href.match(/\/groups\/\d+\/messages/)){
        $.ajax({
          url: location.href,
          type: 'GET',
          data: {message: {id: message_id}},
          dataType: 'json'
        })
        .done(function(json){
          var insertHTML = '';
          json.new_message.forEach(function(message){
              insertHTML += buildMessage(message);
          });
          $('.messages').append(insertHTML);
        })
        .fail(function(json){
          alert('自動更新に失敗しました');
        });
      }
      else{
        clearInterval(interval);
      }
    }, 5000);

    function scroll() {
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    }

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var message = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: 'POST',
        data: message,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html)
        $("form")[0].reset();
        $('#message_image').val('')
        scroll()
      })
      .fail(function(){
        alert('エラーが発生したためメッセージは送信できませんでした。');
      })
      .always(function(){
        $('.form__submit').removeAttr("disabled");
      })
    })
  });
})
