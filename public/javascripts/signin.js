function loginWithKakao() {

  // 로그인 창을 띄웁니다.
  Kakao.Auth.loginForm({
    success: function(authObj) {
      // 로그인 성공시, API를 호출합니다.
      Kakao.API.request({
        url: '/v1/user/me',
        success: function(res) {
          console.log(res);
          customAjax($SITE_URL+'auth/sns_login', { type: 'kakao' , user: JSON.stringify(res) }, function(result){
            if(result === 'success'){
              location.reload();
            }
            else{
              toaster('로그인 실패', 'warning');
            }
          });
        },
        fail: function(error) {
          console.log(error);
          toaster('로그인 실패', 'warning');
        }
      });
    },
    fail: function(err) {
      alert(JSON.stringify(err));
    }
  });
}

function loginWithFacebook() {

  FB.login(function(response) {
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      FB.api('/me?fields=id,name,email,picture.width(100).height(100).as(picture_small)', function(res) {
        console.log(res);
        customAjax($SITE_URL+'auth/sns_login', { type: 'facebook' , user: JSON.stringify(res) }, function(result){
          if(result === 'success'){
            location.reload();
          }
          else{
            toaster('로그인 실패', 'warning');
          }
        });
      });
    } else {
      // The person is not logged into this app or we are unable to tell.
      console.log('not logged in');
    }
  });
}

function loginWithGoogle(googleUser){

  var profile = googleUser.getBasicProfile();

  var user = {};
  user['id'] = profile.getId();
  user['nickname'] = profile.getName();
  user['profile_image'] = profile.getImageUrl();
  user['email'] = profile.getEmail();

  console.log(user);
  customAjax($SITE_URL+'auth/sns_login', { type: 'google' , user: JSON.stringify(user) }, function(result){
    if(result === 'success'){
      location.reload();
    }
    else{
      toaster('로그인 실패', 'warning');
    }
  });
}
