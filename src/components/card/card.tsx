import React, { FC } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../common/const';
import styled from '@emotion/styled';

interface ICardProps {
  id: string;
  name: string;
}

const LinkInner = styled.div`
  padding: 8px;
  border: 1px solid;
  border-radius: 4px;
  text-align: center;
  color: #000;
  text-decoration: none;
  &:hover {
    color: #a2a2a2;
  }
`;

export const Card: FC<ICardProps> = (props) => {
  const { id, name } = props;

  return (
    <Link to={generatePath(AppRoute.PERSON, { id })}>
      <LinkInner>{name}</LinkInner>
    </Link>
  );
};
