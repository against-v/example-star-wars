import React, { FC, useCallback, SyntheticEvent, useState, ChangeEvent, useEffect } from 'react';
import { InputBase, Button } from '@mui/material';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';

interface ISearchProps {
  onSearch: (query: string) => void;
}

const Form = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
  border: 1px solid #a2a2a2;
  border-radius: 4px;
  padding: 2px;
`;

export const Search: FC<ISearchProps> = (props) => {
  const { onSearch } = props;
  const [query, setQuery] = useState<string>('');
  const [searchParams] = useSearchParams();

  const handleInputChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleButtonClick = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    onSearch(query);
  }, [query]);

  useEffect(() => {
    const value = (searchParams.get('search'));
    if (value) {
      setQuery(value);
    }
  }, [searchParams]);

  return (
    <Form>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
      />
      <Button variant="contained" type="submit" onClick={handleButtonClick}>Search</Button>
    </Form>
  );
};
