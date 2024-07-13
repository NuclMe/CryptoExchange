import './App.css';
import { Typography } from 'antd';
const { Title } = Typography;
import { CoinsTable } from './CoinsTable';
const App: React.FC = () => {
  return (
    <>
      <Title style={{ fontSize: '24px' }}>Coins & Markets</Title>
      <CoinsTable />
    </>
  );
};

export default App;
