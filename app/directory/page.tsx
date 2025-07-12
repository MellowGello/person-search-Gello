import UserTable from '../components/user-table';


export default async function Directory() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Directory Table</h1>

      <UserTable />
      {/* Replace the following with a valid User object */}
      
    </div>
  );
}