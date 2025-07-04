import { Container, Typography } from '@mui/material';
import { BillsTable } from './components/billsTable';

function App() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Oireachtas Bills
      </Typography>
      <BillsTable />
    </Container>
  );
}

export default App;
