import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import Markdown from 'react-markdown/with-html';
import { TitleSubText } from '@molecules';
import { ProfileImg } from '@atoms';
import { TweetType } from '@types';
import { RetweetBox, BodyContainer, HeaderContainer } from './styled';

interface Props {
  tweet: TweetType;
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
