$(document).on('turbolinks:load', function(){
  $(function(){

    function buildHTML(message) {
      var content = message.content ? `${ message.content }` : "";
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
                          ${content}
                        </p>
                        ${image}
                      </div>
                    </div>

                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p>
                      ${content}
                    </p>
                      ${img}
                  </div>
                </div>`
  return html;
  }
  var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      //data-idが反映されるようにしている
      var html = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<p class="lower-message__content">' +
            message.content +
          '</p>' +
          '<img src="' + message.image.url + '" class="lower-message__image" >' +
        '</div>' +
      '</div>'
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<p class="lower-message__content">' +
            message.content +
          '</p>' +
        '</div>' +
      '</div>'
    } else if (message.image.url) {
      //同様に、data-idが反映されるようにしている
      var html = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<img src="' + message.image.url + '" class="lower-message__image" >' +
        '</div>' +
      '</div>'
    };
    return html;
  };

  // メッセージ自動更新の挙動
  $(function(){
    var reloadMessages = function() {
      var last_message_id = $('.massege:last').data('id');
      $.ajax({
        url: last_message_id,
        type: 'GET',
        data: { id: {id: last_message_id}},
        dataType: 'json',
      })
      .always(function(data){
        $.each(data, function(i, data){
          buildMESSAGE(data);
        });
      })
      .fail(function() {
        console.log('error');
      });
    };
    setInterval(reloadMessages, 5000);
  });



  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href); // $(this).attr('action')でも可能です
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
      $('.messages').append(html);
      $('#message_content').val(''); //input内のメッセージを消しています。
      scrollBottom();
      function scrollBottom(){
        var target = $('.message').last();
        var position = target.offset().top + $('.messages').scrollTop();
        $('.messages').animate({ scrollTop: position }, 300, 'swing');

                  </div>`
    return html;
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
              insertHTML += buildHTML(message);
          });
          $('.messages').append(insertHTML);
          scroll()
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
      var formData = new FormData(this);
      var url = (widow.location.href);
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $("form")[0].reset();
        $('#message_content').val('');
      })
      .fail(function(){
        alert('エラーが発生したためメッセージは送信できませんでした。');
      })
      .always(function(){
        $('.form__submit').prop('disabled', false);
      })
    })

    .fail(function(data){
      var html = buildHTML(data);
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      var html = buildHTML(data);
      $('.form__submit').prop('disabled', false);
    });
  });
});

  });
})

