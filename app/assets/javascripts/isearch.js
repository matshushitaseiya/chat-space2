$(function() {
  $(document).on("click", ".user-search-add", function () {
      var user_id = $(this).data("data-user-id");
      var user_name = $(this).data("data-user-name");
      selectUserName(user_id, user_name);
    })
    $(document).on("click", ".user-search-remove", function () {
      $(this).parent().remove();
    })

var search_list = $("#user-search-result");
var select_list = $("#chat-group-users");

function appendUserName(user) {
   var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }"  data-user-name="${ user.name }">追加</a>
               </div>`
    search_list.append(html);
  }

function selectUserName(user_id, user_name) {
   var remove_html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-22'>
                        <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                        <p class='chat-group-user__name'>${ user_name }</p>
                        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                      </div>`
    select_list.append(remove_html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUserName(user);
        });
      }
      else{
        appendUserName("一致するメンバーがいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});