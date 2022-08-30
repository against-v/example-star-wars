import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Stack, TextField, Button } from '@mui/material';
import { getPerson } from '../../common/api';
import { IPerson } from '../../common/interfaces';
import { Spinner } from '../spinner/spinner';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../common/store';

export const PersonPage = observer(() => {
  const store = useContext(StoreContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IPerson | null>(null);

  const getData = useCallback(async () => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await getPerson(id);
      setData(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const handleButtonClick = useCallback(() => {
    navigate(`/?search=${store?.search}&page=${store?.page}` );
  }, [navigate, store?.page, store?.search]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Box sx={{ p: 4, height: '100%', maxWidth: '800px', margin: '0 auto' }}>
      {isLoading && <Spinner/>}
      {data && (
        <Stack direction="column" alignItems="center" justifyContent="space-between" spacing={2} sx={{ height: '100%' }}>
          <Stack direction="column" alignItems="center" spacing={2}>
            <TextField
              disabled
              label="Name"
              defaultValue={data.name}
            />
            <TextField
              disabled
              label="Birth year"
              defaultValue={data.birth_year}
            />
            <TextField
              disabled
              label="Gender"
              defaultValue={data.gender}
            />
            <TextField
              disabled
              label="Height"
              defaultValue={data.height}
            />
            <TextField
              disabled
              label="Mass"
              defaultValue={data.mass}
            />
            <TextField
              disabled
              label="Hair color"
              defaultValue={data.hair_color}
            />
            <TextField
              disabled
              label="Eye color"
              defaultValue={data.eye_color}
            />
          </Stack>
          <Button onClick={handleButtonClick}>Back to list</Button>
        </Stack>

      )}
    </Box>
  );
});
