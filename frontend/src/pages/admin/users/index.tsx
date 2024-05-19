import { GET_USERS } from "@/admin/requetes/queries/users.queries";
import { useQuery } from "@apollo/client";
import Page from "@/admin/components/Page";
import Link from "next/link";
import { PencilIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/solid'

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

const UsersAdminPage = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  console.log(data)
  return(
    <Page>
      <div>
        <h1>Show Users</h1>
        { loading && (<p>chargement</p>)}
        { !loading && data && (
          <>
          <div className="flex font-semibold bg-gray-500 text-white rounded-t-md py-2 px-2">
            <p className="flex flex-1">First Name</p>
            <p className="flex flex-1">Last Name</p>
            <p className="flex flex-1">Email</p>
            <p className="flex flex-1">Actions</p>
          </div>
          {data?.users?.map((u: User) => (
            <div key={`user_${u.id}`} className="flex flex-1 justify-start gap-2 bg-white odd:bg-gray-100 w-full py-2 px-2">
              <p className="flex flex-1">{u.firstName}</p>
              <p className="flex flex-1">{u.lastName}</p>
              <p className="flex flex-1">{u.email}</p>
              <div className="flex flex-1">
                <Link href={`/admin/users/${u.id}`}>
                  <PencilIcon className="size-6 text-gray-700"/>
                </Link>
                <EyeIcon className="size-6 text-gray-700"/>
                <TrashIcon className="size-6 text-gray-700"/>
              </div>
            </div>
          ))}
          </>
        )}
      </div>
   
    </Page>
  )
}

export default UsersAdminPage;