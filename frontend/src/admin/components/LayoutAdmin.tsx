import Sidebar from "./Sidebar";

function LayoutAdmin ({ children }: { children: JSX.Element }) {
  return (
      <div className="flex w-full">
          <div className="bg-indigo-500 px-4 py-4 h-screen">
            <div>Admin</div>
            <Sidebar />
            <button>Disconnect</button>
          </div>
          <main className="bg-gray-100 w-full px-4 py-4">
            {children}
          </main>
      </div>
  )
}

export default LayoutAdmin;