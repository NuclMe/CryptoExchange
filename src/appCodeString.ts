export const appCodeString: string = `import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Flex, Select, Table } from 'antd';
import styled from 'styled-components';

interface ICrypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
}
interface ColumnType {
  title: string;
  dataIndex: string;
  key?: string;
  render?: (value: any, record: ICrypto) => JSX.Element;
}
const StyledImage = styled.img\`
  width: 32px;

  @media (max-width: 767px) {
    width: 24px;
  }
\`;
const StyledText = styled(Typography.Text)\`
  font-size: 14px;

  @media (max-width: 767px) {
    font-size: 12px;
  }
\`;
const App: React.FC = () => {
  const [cryptos, setCryptos] = useState<ICrypto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currency, setCurrency] = useState<string>('usd');
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [columns, setColumns] = useState<ColumnType[]>([
    {
      title: 'Name',
      dataIndex: 'image',
      render: (theImageURL: string, data: ICrypto) => (
        <Flex gap="middle" align="center">
          <StyledImage src={theImageURL} alt={data.name} />
          <StyledText>{data.name}</StyledText>
        </Flex>
      ),
    },
    {
      title: 'Current Price',
      dataIndex: 'current_price',
      key: 'current_price',
      render: (price: number) => (
        <StyledText>
          {price} {currency}
        </StyledText>
      ),
    },
    {
      title: 'Circulating Supply',
      dataIndex: 'circulating_supply',
      key: 'circulating_supply',
      render: (circulating_supply: string) => (
        <StyledText>{circulating_supply}</StyledText>
      ),
    },
  ]);

  const fetchCryptos = useCallback(
    async (
      page: number,
      pageSize: number,
      currency: string,
      sortOrder: string
    ) => {
      setIsLoading(true);
      try {
        const response = await fetch(
         \`https://api.coingecko.com/api/v3/coins/markets?vs_currency=\${currency}&order=market_cap_\${sortOrder}&per_page=\${pageSize}&page=\${page}&sparkline=false\`
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          const dataWithKeys = data.map((item: ICrypto) => ({
            ...item,
            key: item.id,
          }));
          setCryptos(dataWithKeys);
        } else {
          console.error('Expected an array but got:', data);
          setIsError('Unexpected response format');
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        setIsError(errorMessage);
        console.error('Error fetching data:', errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [isError]
  );

  useEffect(() => {
    fetchCryptos(page, pageSize, currency, sortOrder);
  }, [page, pageSize, currency, sortOrder]);

  useEffect(() => {
    setColumns((prevColumns) => [
      prevColumns[0],
      {
        ...prevColumns[1],
        render: (price: number) => (
          <StyledText>
            {price} {currency}
          </StyledText>
        ),
      },
      prevColumns[2],
    ]);
  }, [currency]);

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    setPage(1);
    fetchCryptos(1, pageSize, value, sortOrder);
  };

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
    setPage(1);
    fetchCryptos(page, pageSize, currency, value);
  };

  return (
    <Flex gap="large" vertical>
      <Typography.Title style={{ fontSize: '24px', fontWeight: '400' }}>
        Coins & Markets
      </Typography.Title>
      <Flex gap="large">
        <Select
          defaultValue="usd"
          style={{ width: 200 }}
          onChange={handleCurrencyChange}
          options={[
            { value: 'usd', label: 'USD' },
            { value: 'eur', label: 'EUR' },
          ]}
        />
        <Select
          defaultValue="desc"
          style={{ width: 200 }}
          onChange={handleSortOrderChange}
          options={[
            { value: 'desc', label: 'Market cap descending' },
            { value: 'asc', label: 'Market cap ascending' },
          ]}
        />
      </Flex>
      <Table
        loading={isLoading}
        dataSource={cryptos}
        columns={columns}
        pagination={{
          showSizeChanger: true,
          pageSize: pageSize,
          total: 10000,
          onChange: (page, pageSize) => {
            setPageSize(pageSize);
            setPage(page);
            fetchCryptos(page, pageSize, currency, sortOrder);
          },
          onShowSizeChange: (page, pageSize) => {
            setPageSize(pageSize);
            setPage(page);
            fetchCryptos(page, pageSize, currency, sortOrder);
          },
          pageSizeOptions: ['5', '10', '20', '50', '100'],
        }}
      />
    </Flex>
  );
};

export default App;
`;
