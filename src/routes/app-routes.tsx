import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageContainer } from '@components/layout/page-container';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageContainer />}>
          <Route index element={<div>Dashboard de Exemplo</div>} />
          <Route path="users" element={<div>Lista de Usuários</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
