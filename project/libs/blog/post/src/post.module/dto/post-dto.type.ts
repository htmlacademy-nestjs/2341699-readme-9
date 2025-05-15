import { PostLinkDto } from './post-link.dto';
import { PostPhotoDto } from './post-photo.dto';
import { PostQuoteDto } from './post-quote.dto';
import { PostTextDto } from './post-text.dto';
import { PostVideoDto } from './post-video.dto';

export type PostDto = PostVideoDto | PostTextDto | PostQuoteDto | PostPhotoDto | PostLinkDto;
