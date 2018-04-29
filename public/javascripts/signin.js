// IN order to use this function need these following cdn

<!--
  DAUM KAKAO
  <script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=a85645def53cba1df9f4bc7ada5bd6dd&libraries=clusterer,services,drawing"></script>

   NAVER
  <script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?clientId=DX5aYb4n7jxGROt0PIPR&submodules=panorama"></script>
  <script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charset="utf-8"></script>

  GOOGLE
  <script async defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBw5vj4ZnOZUe-EH2A9_Nk9tP0a9-f9PBk">
  </script>
  <script src="https://apis.google.com/js/platform.js?onload=loginWithGoogle" async defer></script>
  -->


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
