export default function UserComponent(props) {
  return (
    <>
      <div className="h-screen flex items-center">
        <main className="rounded-lg shadow-[0_3px_10px_#111827] w-[85%] mx-auto px-6 py-6">
          <div className=" pt-2 px-3 pb-6 border-b">
            <h1 className="pb-6 text-2xl">Personal infomation</h1>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-12"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <div className="ml-6">
                <h2 className="text-xl font-semibold">
                  Mr. {props.name} {props.lastname}
                </h2>
                <p>Email: {props.email}</p>
                <p>Phone: {props.phone}</p>
              </div>
            </div>
          </div>
          <div className=" pt-2 px-3 pb-6 border-b">
            <h1 className="pb-6 text-2xl">Address</h1>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-12"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <div className="ml-6">
                <h2 className="text-xl font-semibold">
                  Direction: {props.city}, {props.country}
                </h2>
                <p>Street: {props.street}</p>
                <p>Zip Code: {props.zip}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
