export class AuthInfo {

  constructor(
    public $userEmail:string,
    
  ) {

  }
  isLoggedIn() {
    return !!this.$userEmail;
  }

}


