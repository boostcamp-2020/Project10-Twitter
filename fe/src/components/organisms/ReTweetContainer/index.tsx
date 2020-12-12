import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import Markdown from 'react-markdown/with-html';
import { TitleSubText } from '@molecules';
import { ProfileImg } from '@atoms';
import { RetweetBox, BodyContainer, HeaderContainer } from './styled';

interface Props {
  tweet: Tweet;
}

interface Tweet {
  _id: string;
  content: string;
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
  author: Author;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const RetweetContainer: FunctionComponent<Props> = ({ tweet }) => (
  <RetweetBox>
    <Link href={`/status/${tweet._id}`}>
      <a>
        <HeaderContainer>
          <ProfileImg img={tweet.author.profile_img_url} size={30} />
          <TitleSubText title={tweet.author.name} sub={tweet.author.user_id} />
        </HeaderContainer>
        <BodyContainer>
          <Markdown allowDangerousHtml>{tweet.content}</Markdown>
        </BodyContainer>
      </a>
    </Link>
  </RetweetBox>
);

export default RetweetContainer;
