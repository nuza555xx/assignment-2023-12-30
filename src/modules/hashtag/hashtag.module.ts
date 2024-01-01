import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagResolver } from './hashtag.resolver';

@Module({
  providers: [HashtagResolver, HashtagService],
})
export class HashtagModule {}
