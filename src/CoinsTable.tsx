import React, { useState, useEffect } from 'react';
import { Table, Image, Flex, Typography } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'image',
    render: (theImageURL, data) => (
      <Flex gap="middle" align="center">
        <Image src={theImageURL} width={32} />
        <Typography.Text>{data.name}</Typography.Text>
      </Flex>
    ),
  },
  {
    title: 'Current Price',
    dataIndex: 'current_price',
    key: 'current_price',
  },
  {
    title: 'Circulating Supply',
    dataIndex: 'circulating_supply',
    key: 'circulating_supply',
  },
];
export const CoinsTable: React.FC = () => {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchCryptos = async (page, pageSize) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${pageSize}&page=${page}&sparkline=false`
      );
      const data = await response.json();
      setCryptos(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos(1, 10);
  }, [page, pageSize]);

  return (
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
          fetchCryptos(page, pageSize);
        },
        onShowSizeChange: (page, pageSize) => {
          setPageSize(pageSize);
          setPage(page);
          fetchCryptos(page, pageSize);
        },
        pageSizeOptions: ['5', '10', '20', '50', '100'],
      }}
    />
  );
};
