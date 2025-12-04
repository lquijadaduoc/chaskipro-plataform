import DashboardLayout from '../components/DashboardLayout';
import AdminProfessionalsTable from '../components/AdminProfessionalsTable';

/**
 * Página de gestión de usuarios para administradores
 */
const AdminUsers = () => {
  return (
    <DashboardLayout>
      <AdminProfessionalsTable />
    </DashboardLayout>
  );
};

export default AdminUsers;
