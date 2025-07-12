// Example: app/components/user-table.tsx
import { getAllUsers } from '@/app/actions/actions';
import { UserEditDialog } from './user-edit-dialog'
import DeleteButton from './delete-button'
//<Button variant="outline" size="icon"></Button>
//<Edit className="h-4 w-4" />
              //</Button>

//<Button variant="outline" size="icon">
//<Delete className="h-4 w-4" />
              //</Button>

export default async function UserTable() {
  const users = await getAllUsers();

  return (
    <table className="w-full border">
      <thead>
        <tr>
            <th className="border px-2 py-1">ID</th>
          <th className="border px-2 py-1">Name</th>
          <th className="border px-2 py-1">Email</th>
          <th className="border px-2 py-1">Phone Number</th>
            <th className="border px-2 py-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td className="border px-2 py-1">{user.id}</td>
            <td className="border px-2 py-1">{user.name}</td>
            <td className="border px-2 py-1">{user.email}</td>
            <td className="border px-2 py-1">{user.phoneNumber}</td>
            <td className="border px-2 py-1">
            <DeleteButton userId={user.id} />  
            <UserEditDialog user={{ id: user.id, name: user.name, email: user.email, phoneNumber: user.phoneNumber }} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}