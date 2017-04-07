export class AuthInfo {

  constructor(
  public $authResponce: AuthInfoResponce,
  ) {
  }
  isLoggedIn() {
    return !!this.$authResponce.$userId;
  }

}

export class AuthInfoResponce
{
   constructor(
    public $customer: string,
    public $customerId: number,
    public $lxDrivePath: string,
    public $name: string,
    public $password: string,
    public $userId: number,
    public $userName: string,
    public $imageUrl: string,
   ){}
}




