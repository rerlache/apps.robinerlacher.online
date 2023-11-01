import useAuth from "../hooks/useAuth";

export default function UserApps() {
  const { auth } = useAuth();

  return (
    <section>
      {auth.user.apps.length ? (
        <ul>
          {auth.user.apps.map((app) => {
            return (
              <li key={app.id}>
                <a href={app.url} target="_blank">
                  {app.name}
                </a>
                <br />
                {app.description}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No apps assigned yet</p>
      )}
    </section>
  );
}
