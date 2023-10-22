import Navbar from '../Navbar';

interface AppShell {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShell) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AppShell;
