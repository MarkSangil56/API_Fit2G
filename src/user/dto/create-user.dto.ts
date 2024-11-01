export class CreateUserDto {
    readonly id: string;
    readonly uid: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly email: string;
    readonly password: string;
    createdTime: Date;
  }
  