import React, { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { Box, Grid, Stack, Pagination } from '@mui/material';
import { getPersons } from '../../common/api';
import { IPerson, ISearchParams } from '../../common/interfaces';
import { getIdFromUrl } from '../../common/utils';
import { StoreContext } from '../../common/store';
import { Search } from '../search/search';
import { Card } from '../card/card';
import { Spinner } from '../spinner/spinner';



export const MainPage = observer(() => {
  const store = useContext(StoreContext);
  const [data, setData] = useState<IPerson[]>([]);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useMemo(() => searchParams.get('page') || '1', [searchParams]);
  const currentSearchQuery = useMemo(() => searchParams.get('search') || '', [searchParams]);


  const getData = useCallback(async (page: string | null = '1', search?: string) => {
    setIsLoading(true);
    try {
      const res = await getPersons(page, search);
      const { count, results } = res;
      setData(results);
      setItemsCount(count);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChangePage = useCallback( (e: ChangeEvent<unknown>, page: number) => {
    const params: ISearchParams = { page: String(page) };
    const search = searchParams.get('search');
    if (search) {
      params.search = search;
    }
    setSearchParams(params as URLSearchParamsInit);
    store?.setPage(String(page));
  }, [store, searchParams]);

  const handleSearch = useCallback(async (search: string) => {
    setSearchParams({ search, page: '1' });
    store?.setPage('1');
    store?.setSearch(search);
  }, [searchParams, store]);

  useEffect(() => {
    getData(currentPage, currentSearchQuery);
  }, [currentPage, currentSearchQuery]);

  return (
    <Box sx={{ p: 4, height: '100%', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
      {isLoading && <Spinner/>}
      <Stack direction="column" alignItems="center" justifyContent="space-between" spacing={2} sx={{ height: '100%' }}>
        <Stack direction="column" sx={{ width: '100%' }}>
          <Search onSearch={handleSearch}/>
          <Grid container spacing={2}>
            {data.map(item => (
              <Grid xs={6} item key={item.name}>
                <Card id={getIdFromUrl(item.url)} name={item.name}/>
              </Grid>
            ))}
          </Grid>
        </Stack>
        {itemsCount > 0 && (
          <Pagination
            count={Math.ceil(itemsCount / 10)}
            onChange={handleChangePage}
            sx={{ marginTop: 'auto' }}
            page={Number(currentPage)}/>
        )}
      </Stack>
    </Box>
  );
});
