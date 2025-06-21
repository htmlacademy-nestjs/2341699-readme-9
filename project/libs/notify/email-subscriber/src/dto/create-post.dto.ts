import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'The url is empty' })
  @IsUrl()
  public url: string;

  @IsNotEmpty({ message: 'The description is empty' })
  public description: string;

  @IsNotEmpty({ message: 'The publicationDate is empty' })
  public publicationDate: Date;
}
