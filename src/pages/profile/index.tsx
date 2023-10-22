import { useSession } from 'next-auth/react';

const ProfilPage = () => {
  const data: any = useSession();
  console.log(data.data?.user?.fullName);

  return (
    <div>
      <div>
        <h1>Profil</h1>
        {data.data?.user && <h2>{data.data?.user?.fullName}</h2>}
      </div>
    </div>
  );
};

export default ProfilPage;
